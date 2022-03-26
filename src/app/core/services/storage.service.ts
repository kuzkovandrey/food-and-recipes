import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';

@Injectable()
export class StorageService {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  private async init() {
    if (this.storage) return this.storage;

    const storage = await this.storageService.create();
    this.storage = storage;

    return this.storage;
  }

  set(key: string, value: any): Observable<any> {
    return from(this.storage.set(key, value));
  }

  get(key: string): Observable<any> {
    return from(this.storage.get(key));
  }

  remove(key: string) {
    this.storage.remove(key);
  }
}
