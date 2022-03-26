import { QueryParams } from '@core/values/query-params.enum';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      url: environment.api + req.url,
      setParams: {
        [QueryParams.API_KEY]: environment.apiKey,
      },
    });

    return next.handle(request);
  }
}
