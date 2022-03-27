import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { StorageKeys } from '@core/values/storage-keys.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserInfo } from '@core/models/user-info.model';

@Injectable()
export class UserStorageService {
  constructor(private storageService: StorageService) {}

  private parseUserInfo = (userInfo: string): UserInfo =>
    userInfo ? JSON.parse(userInfo) : null;

  setUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.storageService
      .set<string>(StorageKeys.USER, JSON.stringify(userInfo))
      .pipe(
        map(this.parseUserInfo),
      );
  }

  getCurrentUserInfo(): Observable<UserInfo> {
    return this.storageService
      .get<string>(StorageKeys.USER)
      .pipe(map(this.parseUserInfo));
  }

  removeUser() {
    this.storageService.remove(StorageKeys.USER);
  }
}
