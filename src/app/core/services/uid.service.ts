import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UidService {
  private readonly uid = new BehaviorSubject<string>(null);

  getUid(): string {
    return this.uid.value;
  }

  setUid(uid: string) {
    this.uid.next(uid);
    console.log(uid);
  }
}
