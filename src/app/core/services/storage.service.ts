import { Injectable } from '@angular/core';
import { StorageKeys } from '@core/values/storage-keys.enum';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { UidService } from './uid.service';

@Injectable()
export class StorageService {
  private storage: Storage | null = null;

  private get uid(): string {
    return this.uidService.getUid();
  }

  constructor(
    private storageService: Storage,
    private uidService: UidService,
  ) {
    this.init();
  }

  private async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  set<T>(key: StorageKeys, value: T): Observable<T> {
    return from(this.storage.set(key + this.uid, value));
  }

  get<T>(key: StorageKeys): Observable<T> {
    return from(this.storage.get(key + this.uid));
  }

  remove(key: StorageKeys) {
    this.storage.remove(key + this.uid);
  }
}
