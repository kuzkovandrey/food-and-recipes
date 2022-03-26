import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private isAuthorized = new BehaviorSubject(false);

  get isAuthorized$(): Observable<boolean> {
    return this.isAuthorized.asObservable();
  }

  constructor() {}

  setAuthStatus(status: boolean) {
    this.isAuthorized.next(status);
  }
}
