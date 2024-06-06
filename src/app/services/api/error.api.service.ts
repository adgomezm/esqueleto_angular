import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { env } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ErrorApiService {

  private readonly http       = inject(HttpClient)
  private readonly controller = 'error'

  public readonly upload_err = (error: Error) =>
    lastValueFrom(this.http.post(`${env.api}${this.controller}`, error))
  
}
