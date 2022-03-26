import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class QuotaService {
  private readonly count = new BehaviorSubject(0);

  setCount(count: number) {
    this.count.next(count);
  }

  getCurrentCount(): number {
    return this.count.value;
  }
}
