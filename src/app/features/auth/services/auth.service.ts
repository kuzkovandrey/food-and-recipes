import { UserStorageService } from '@core/services/user-storage.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserInfoMapper } from '@core/mappers/user-info.mapper';
import { UserInfo } from '@core/models/user-info.model';
import { UidService } from '@core/services/uid.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized = new BehaviorSubject(false);

  get isAuthorized$(): Observable<boolean> {
    return this.isAuthorized.asObservable();
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private userStorageService: UserStorageService,
    private uidService: UidService,
  ) {}

  setAuthStatus(status: boolean) {
    this.isAuthorized.next(status);
  }

  private handleSuccessAuth = (userInfo: UserInfo) => {
    this.setAuthStatus(true);
    this.uidService.setUid(userInfo.uid);
  };

  private handleLogout = () => {
    this.setAuthStatus(false);
    this.uidService.setUid(null);
  };

  login({ email, password }: User): Observable<UserInfo> {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(({ user }) => UserInfoMapper.map(user)),
      tap(this.handleSuccessAuth),
      switchMap((user) => this.userStorageService.setUser(user)),
    );
  }

  register({ email, password }: User): Observable<UserInfo> {
    return from(
      this.fireAuth.createUserWithEmailAndPassword(email, password),
    ).pipe(
      map(({ user }) => UserInfoMapper.map(user)),
      tap(this.handleSuccessAuth),
      switchMap((user) => this.userStorageService.setUser(user)),
    );
  }

  logout() {
    return from(this.fireAuth.signOut()).pipe(tap(this.handleLogout));
  }
}
