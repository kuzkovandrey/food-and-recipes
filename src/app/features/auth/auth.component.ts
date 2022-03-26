import { AppRoutes } from '@core/values/app-routes.enum';
import { AuthService } from '@features/auth/services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { User } from '@features/auth/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { UserInfo } from '@core/models/user-info.model';
import { ToastController } from '@ionic/angular';
import { ErrorResponse } from './models/error-response.model';
import { ErrorMessages } from './values/error-messages.const';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();

  isSignIn = true;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
  ) {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private authorize(user: User): Observable<UserInfo> {
    return this.isSignIn
      ? this.authService.login(user)
      : this.authService.register(user);
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'warning',
    });
    toast.present();
  }

  private handleError = (error: ErrorResponse) => {
    console.log(error)

    const message = !!ErrorMessages[error.code]
      ? ErrorMessages[error.code]
      : ErrorMessages.default;

    this.presentToast(message);
  };

  private handleSuccessAuth = () => {
    this.router.navigate([AppRoutes.ACCOUNT], {
      replaceUrl: true,
    });
  };

  toggleSignType() {
    this.isSignIn = !this.isSignIn;
  }

  sendForm(user: User) {
    this.subscriptions.add(
      this.authorize(user).subscribe(this.handleSuccessAuth, this.handleError),
    );
  }
}
