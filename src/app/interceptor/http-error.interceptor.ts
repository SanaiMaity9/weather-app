import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';
import { AdditionalService } from '../services/additional/additional.service';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private additionalService:AdditionalService, private loaderService:LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request)
    .pipe(finalize(()=>this.loaderService.hide()),
      retry (1),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.additionalService.openErrorDialog(error.error.message);
        return throwError(errorMessage);
      })
    )
  }
}
