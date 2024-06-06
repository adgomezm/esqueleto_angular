export { }
declare global {
  interface Date {
    AddDays(days: number): Date
    AddWeeks(weeks: number): Date
    GetMonday(): Date
    SubtractDays(days: number): Date
    SubtractWeeks(weeks: number): Date
    FormatDate(): string
    FormatDateTime(): string
    GetMonthName(): string
    ToDate(): Date
  }

  interface String {
    CapitaliseFirst(): string
    JSON(): unknown
    Deaccent(): string
    Base64ToBlob(contentType: string): Promise<Blob>
  }

  interface Array<T> {
    SortBy(
      key: string,
      order: 'asc' | 'desc',
      display?: (v: T[keyof T]) => string
    ): Array<T>
    Equal(withArray: unknown[]): boolean
    Contains(search: string): boolean
    Clone(): Array<T>
    DeepClone(): Array<T>
    Distinct(field: string): Array<T[keyof T]>
    Select(field: string): Array<T[keyof T]>
  }
  interface Blob {
    ToBase64: () => Promise<string>
  }
}

// #region Blob

Blob.prototype.ToBase64 = function (): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(this)
    reader.onload = function () {
      resolve(reader.result as string)
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })
}

// #endregion

// #region Date (Declare interface in main.ts)
Date.prototype.AddDays = function (days: number): Date {
  const result = new Date(this)
  result.setDate(result.getDate() + days)
  return result
}

Date.prototype.SubtractDays = function (days: number): Date {
  const result = new Date(this)
  result.setDate(result.getDate() - days)
  return result
}

Date.prototype.AddWeeks = function (weeks: number): Date {
  const result = new Date(this)
  result.setDate(result.getDate() + weeks * 7)
  return result
}

Date.prototype.SubtractWeeks = function (weeks: number): Date {
  const result = new Date(this)
  result.setDate(result.getDate() - weeks * 7)
  return result
}

Date.prototype.GetMonday = function (): Date {
  return new Date(
    Object.assign(this).setDate(
      this.getDate() - this.getDay() + (this.getDay() === 0 ? -6 : 1)
    )
  )
}

Date.prototype.FormatDate = function (): string {
  return (
    `${this.getFullYear()}-${(this.getMonth() + 1).toString().padStart(2, '0')}-${this.getDate().toString().padStart(2, '0')}`
  )
}

Date.prototype.FormatDateTime = function (): string {
  return (
    `${this.FormatDate()} ${this.getHours().toString().padStart(2, '0')}:${this.getMinutes().toString().padStart(2, '0')}`
  )
}

Date.prototype.GetMonthName = function (): string {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  return months[this.getMonth()]
}

Date.prototype.ToDate = function (): Date {
  const date: Date = new Date(this)
  date.setHours(0, 0, 0, 0)
  return date
}

// #endregion

// #region String
String.prototype.CapitaliseFirst = function (): string {
  return this[0].toUpperCase() + this.substring(1)
}

String.prototype.JSON = function (): unknown {
  return JSON.parse(this as string)
}

String.prototype.Deaccent = function (): string {
  return this.replaceAll('á', 'a').replaceAll('Á', 'A')
    .replaceAll('é', 'e').replaceAll('É', 'E')
    .replaceAll('í', 'i').replaceAll('Í', 'I')
    .replaceAll('ó', 'o').replaceAll('Ó', 'O')
    .replaceAll('ú', 'u').replaceAll('Ú', 'U')
    .replaceAll('à', 'a').replaceAll('À', 'A')
    .replaceAll('è', 'e').replaceAll('È', 'E')
    .replaceAll('ì', 'i').replaceAll('Ì', 'I')
    .replaceAll('ò', 'o').replaceAll('Ò', 'O')
    .replaceAll('ù', 'u').replaceAll('Ù', 'U')
    .replaceAll('ä', 'a').replaceAll('Ä', 'A')
    .replaceAll('ë', 'e').replaceAll('Ë', 'E')
    .replaceAll('ï', 'i').replaceAll('Ï', 'I')
    .replaceAll('ö', 'o').replaceAll('Ö', 'O')
    .replaceAll('ü', 'u').replaceAll('Ü', 'U')
    .replaceAll('â', 'a').replaceAll('Â', 'A')
    .replaceAll('ê', 'e').replaceAll('Ê', 'E')
    .replaceAll('î', 'i').replaceAll('Î', 'I')
    .replaceAll('ô', 'o').replaceAll('Ô', 'O')
    .replaceAll('û', 'u').replaceAll('Û', 'U')
}

String.prototype.toLocaleLowerCase = function (): string {
  return this.Deaccent().toLowerCase()
}

String.prototype.Base64ToBlob = async function (contentType: string = 'application/pdf'): Promise<Blob> {
  const sliceSize: number = 512
  const byteCharacters = atob(this as string)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}
// #endregion

// #region Array

Array.prototype.SortBy = function intersperse<T>(
  key: keyof T,
  order: 'asc' | 'desc' = 'asc',
  display?: (v: T[keyof T]) => string
): T[] {
  if (display)
    return this.sort((anyA: T, anyB: T) =>
      display(anyA[key]) > display(anyB[key])
        ? order === 'asc'
          ? 1
          : -1
        : display(anyA[key]) < display(anyB[key])
          ? order === 'asc'
            ? -1
            : 1
          : 0
    )
  else
    return this.sort((anyA: T, anyB: T) =>
      anyA[key] > anyB[key]
        ? order === 'asc'
          ? 1
          : -1
        : anyA[key] < anyB[key]
          ? order === 'asc'
            ? -1
            : 1
          : 0
    )
}
Array.prototype.Equal = function intersperse<T>(withArray: T[]) {
  return (
    Object.keys(this).length === Object.keys(withArray).length &&
    Object.keys(this).every((p: number | string) => (this as T[])[p as keyof T[]] === withArray[p as keyof T[]])
  )
}

Array.prototype.Contains = function (search: string): boolean {
  let ret: boolean = false
  this.forEach((iter: string) => {
    ret ||= iter.includes(search)
  })
  return ret
}

Array.prototype.Clone = function intersperse<T>(): T[] {
  return Object.assign(this, []) as T[]
}

Array.prototype.DeepClone = function intersperse<T>(): T[] {
  return JSON.parse(JSON.stringify(this)) as T[]
}

Array.prototype.Distinct = function intersperse<T>(field: keyof T): T[keyof T][] {
  const uniques: Map<T[keyof T], boolean> = new Map<T[keyof T], boolean>()
  this.forEach(v => uniques.set(v[field], true))
  return Array.from(uniques.keys())
}
Array.prototype.Select = function intersperse<T>(field: keyof T): T[keyof T][] {
  return this.map(t => t[field])
}

// #endregion
