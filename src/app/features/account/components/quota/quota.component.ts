import { Component, OnInit } from '@angular/core';
import { QuotaService } from '@core/services/quota.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'quota',
  templateUrl: './quota.component.html',
  styleUrls: ['./quota.component.scss'],
})
export class QuotaComponent implements OnInit {
  quotaCount$: Observable<number>;

  constructor(private quotaService: QuotaService) { }

  ngOnInit() {
    this.quotaCount$ = this.quotaService.getCurrentCount$();
  }
}
