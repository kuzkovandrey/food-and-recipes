import { filter, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuotaService } from '@core/services/quota.service';
import { HttpHeaders } from '@core/values/http-headers.enum';

@Injectable()
export class QuotaCountInterceptor implements HttpInterceptor {
  constructor(private quotaService: QuotaService) {}

  private handleResponse = (event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      const quotaCount = event.headers.get(HttpHeaders.X_API_QUOTA_LEFT);

      this.quotaService.setCount(quotaCount ? +quotaCount : 9999)

      console.log(quotaCount);
    }
  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(this.handleResponse));
  }
}
