import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';
import { notification } from '../utils/notification.utils';
import { ErrorApiService } from '../services/api/error.api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements ErrorHandler {

  private readonly ignore: string[] = ['NG0100', 'NG02955']
  private readonly service = inject(ErrorApiService)

  handleError = async (error: Error | HttpErrorResponse) => {
    console.log(error.message)
    if(isDevMode())
      console.error(error)

    if (this.ignore.Contains(error.message))
      return

    notification.Toast.Error(error.message)

    if(error instanceof HttpErrorResponse)
      return

    this.service.upload_err(error)

  }
}