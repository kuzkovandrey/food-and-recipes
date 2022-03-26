import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { StorageKeys } from '@core/values/storage-keys.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '@core/models/user-info.model';

@Injectable()
export class UserStorageService {
  constructor(private storageService: StorageService) {}

  setUser(userInfo: UserInfo): Observable<UserInfo>  {
    return this.storageService.set(StorageKeys.USER, JSON.stringify(userInfo));
  }

  getCurrentUserInfo(): Observable<UserInfo> {
    return this.storageService
      .get(StorageKeys.USER)
      .pipe(map((userInfo) => (userInfo ? JSON.parse(userInfo) : null)));
  }

  removeUser() {
    this.storageService.remove(StorageKeys.USER);
  }
}
