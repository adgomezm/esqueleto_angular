import Dexie, { IndexableType, Table } from 'dexie';
import moment from 'moment';
import { SyncData, SyncDataSchema } from '../models/sync';
import { NodeSchema } from '../models/node';


export class AppDB extends Dexie {

  public readonly sync!: Table<SyncData, string>
  public readonly nodes!: Table<Node, number>

  public readonly dbSchema = {
    sync: SyncDataSchema,
    nodes: NodeSchema

  }

  public async CLEAN() {
    for(const table of Object.keys(this.dbSchema))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await (this[table] as Table<unknown, string>).clear()
    
  }

  constructor() {
    super('IRMAnalytics.Mercurio');
    this.version(Object.keys(this.dbSchema).length).stores(this.dbSchema)
  }

}

export class Persistable<T> {

  constructor(table: keyof AppDB) {
    this.bd = new AppDB()
    this.instance = this.bd[table] as Table<T, IndexableType>
    this.sync = this.bd.sync as Table<SyncData, IndexableType>
  }

  private readonly bd: AppDB
  protected readonly instance: Table<T, IndexableType>
  protected readonly sync: Table<SyncData, IndexableType>

  public async Add(item: T): Promise<IndexableType> { if(!this.bd.isOpen()) await this.bd.open(); return this.Put(item) }
  public async AddRange(items: T[]): Promise<IndexableType> { if(!this.bd.isOpen()) await this.bd.open(); return this.PutRange(items) }
  public async Delete(id: IndexableType): Promise<void> { if(!this.bd.isOpen()) await this.bd.open(); return this.instance.delete(id) }
  public async Put(item: T): Promise<IndexableType> { if(!this.bd.isOpen()) await this.bd.open(); return this.instance.put(item) }
  public async PutRange(items: T[]): Promise<IndexableType> { if(!this.bd.isOpen()) await this.bd.open(); return this.instance.bulkPut(items) }
  public async Get(): Promise<T[]> { if(!this.bd.isOpen()) await this.bd.open(); return this.instance.toArray() }
  public async GetById(id: IndexableType): Promise<T | undefined> { if(!this.bd.isOpen()) await this.bd.open(); return this.instance.get(id) }

  public async ForceAll(): Promise<void> {
    for(const key of Object.keys(this.bd._dbSchema))
      this.sync.delete(key)
  }
  public CleanAllDatabases() {
    return this.bd.CLEAN()
    
  }
  
}
export interface Remote<T> {
  GetRemote(): Promise<T[]>
  AddRemote(item: T): Promise<T>
  UpdateRemote(item: T): Promise<T>
  DeleteRemote(key: keyof T | IndexableType): Promise<void>
}

export class RemotePersistable<T> extends Persistable<T> implements Remote<T>{
  constructor(table: keyof AppDB) {
    super(table)
    this.table = table
  }
  private table: keyof AppDB

  private readonly Sync = async (date?: Date): Promise<SyncData> => {
    let synced = await this.sync.get(this.table)
    if (synced) {
      synced.syncDate = date ?? new Date()
      this.sync.put(synced)
    } else {
      synced = { entity: this.table, syncDate: date ?? new Date() }
      this.sync.add(synced)
    }
    return synced
  }

  public async GetRemote(): Promise<T[]> { throw new Error('Not Implemented') }
  public async AddRemote(_: T): Promise<T> { throw new Error('Not Implemented'); _ }
  public async UpdateRemote(_: T): Promise<T> { throw new Error('Not Implemented'); _ }
  public async DeleteRemote(_: IndexableType | keyof T): Promise<void> { throw new Error('Not Implemented'); _ }
  protected LocalDataValidation = (sync: SyncData | undefined) => !sync || sync.syncDate <= moment().add(-5, 'hours').toDate()

  private readonly GetFromRemoteAndSync = async (): Promise<T[]> => {
    const remotes = await this.GetRemote() as T[]
    this.instance.clear()
    this.PutRange(remotes)
    this.Sync()
    return remotes
  }

  public async Force(): Promise<T[]> {
    return this.GetFromRemoteAndSync()
  }

  protected readonly IsRemoteNeeded = async (): Promise<boolean> => {
    const sync = await this.sync.get(this.table)
    return this.LocalDataValidation(sync)
  }

  override async Add(item: T): Promise<IndexableType> {
    const remote = await this.AddRemote(item)
    return await super.Add(remote)
  }

  override async Put(item: T): Promise<IndexableType> {
    const remote = await this.UpdateRemote(item)
    return await super.Put(remote)
  }

  override async Delete(id: IndexableType): Promise<void> {
    await this.DeleteRemote(id)
    await super.Delete(id)
  }

  override async Get(): Promise<T[]> {
    const isRemoteNeeded = await this.IsRemoteNeeded()
    if (isRemoteNeeded) {
      const result = await this.GetFromRemoteAndSync()
      console.debug(`Recuperando ${result.length} ${this.table} del origen remoto.`)
      return result
    }
    const result = await super.Get() as T[]
    console.debug(`Recuperando ${result.length} ${this.table} del almacenamiento interno.`)
    return result
  }

  override async GetById(id: IndexableType): Promise<T | undefined> {
    const item: T | undefined = await super.GetById(id)
    if (!item && await this.IsRemoteNeeded()) {
      await this.GetFromRemoteAndSync()
      return await super.GetById(id)
    }
    return item
  }

}