import { debounceTime, first, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from, Observable, timer } from 'rxjs';

@Injectable()
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  private createLoader(): Observable<HTMLIonLoadingElement> {
    return from(
      this.loadingController.create({
        message: 'Please wait...',
      }),
    );
  }

  // TODO: Refactor show and hide logic
  show() {
    this.createLoader()
      .pipe(
        switchMap((element) => element.present()),
        first(),
      )
      .subscribe();
  }

  hide() {
    timer(300)
      .pipe(debounceTime(1), first())
      .subscribe(() => {
        this.loadingController.dismiss();
      });
  }
}
