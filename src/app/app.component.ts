import { AuthService } from '@features/auth/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuRoutes, MenuRoutesType } from '@core/values/menu-routes.const';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  menuRoutes: MenuRoutesType[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.authService.isAuthorized$.subscribe((isAuth) => {
        this.menuRoutes = [...MenuRoutes].filter((route) => {
          return route.isAuth === undefined || route.isAuth === isAuth;
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
