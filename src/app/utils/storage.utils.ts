import { BehaviorSubject } from "rxjs";
import { Usuario } from "../models/user";

export const IRMStorage = {
  
  AppLoading: new BehaviorSubject<boolean>(true),
  User: new BehaviorSubject<Usuario | undefined>(undefined),

}