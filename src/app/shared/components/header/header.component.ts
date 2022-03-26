import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  headerName = 'Home';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.subscriptions.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((navigationEnd: NavigationEnd) => {
          this.headerName = this.getHeaderName(navigationEnd);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getHeaderName(navigationEnd: NavigationEnd) {
    const currentRoute = navigationEnd.urlAfterRedirects.split('/').pop();

    return currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
  }
}
