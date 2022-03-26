import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/values/app-routes.enum';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  private isError(error: HttpErrorResponse) {
    return (
      error.status >= HttpStatusCode.InternalServerError ||
      error.status === HttpStatusCode.PaymentRequired
    );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.isError(error)) {
          this.router.navigate([AppRoutes.ERROR, error.status]);
          return;
        }

        return throwError(error);
      }),
    );
  }
}
