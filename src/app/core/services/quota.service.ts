import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class QuotaService {
  private readonly count = new BehaviorSubject<number>(0);

  setCount(count: number) {
    this.count.next(count);
  }

  getCurrentCount(): number {
    return this.count.value;
  }

  getCurrentCount$(): Observable<number> {
    return this.count.asObservable();
  }
}
