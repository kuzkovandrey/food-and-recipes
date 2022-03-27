import { switchMap } from 'rxjs/operators';
import { AuthService } from '@features/auth/services/auth.service';
import { UserStorageService } from '@core/services/user-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserInfo } from '@core/models/user-info.model';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/values/app-routes.enum';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private logout$ = new Subject<void>();

  userInfo: UserInfo;

  constructor(
    private userStorageService: UserStorageService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.userStorageService.getCurrentUserInfo().subscribe((userInfo) => {
        this.userInfo = userInfo;
        console.log(userInfo)
      }),
    );

    this.subscriptions.add(
      this.logout$
        .pipe(switchMap(() => this.authService.logout()))
        .subscribe(this.navigateToHomePage),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private navigateToHomePage = () => {
    this.router.navigate([AppRoutes.HOME], {
      replaceUrl: true,
    });
  };

  private async showLogoutPopup() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you want logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.logout$.next();
          },
        },
      ],
    });

    await alert.present();
  }

  showPopup() {
    this.showLogoutPopup();
  }
}
