import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  private async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  set(key: string, value: any) {
    this.storage.set(key, value);
  }

  get(key: string): Observable<any> {
    return from(this.storage.get(key));
  }

  remove(key: string) {
    this.storage.remove(key);
  }
}
