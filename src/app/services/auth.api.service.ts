import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/user';
import { env } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient)
  private readonly controller = `${env.api}auth/`

  public readonly get_token = () => localStorage.getItem('mercurio_token')
  public readonly set_token = (t: string) => localStorage.setItem('mercurio_token', t)

  public readonly renew = () =>
    firstValueFrom(this.http.post<LoginResponse>(`${this.controller}renew`, { token: this.get_token() }))
  public readonly login = (req: LoginRequest) =>
    firstValueFrom(this.http.post<LoginResponse>(`${this.controller}sign_in`, req))

}
