import { AuthService } from '@features/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AppRoutes } from '@core/values/app-routes.enum';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthorized$.pipe(
      tap((isAuth) => {
        if (!isAuth) this.router.navigate([AppRoutes.AUTH]);
      }),
    );
  }
}
