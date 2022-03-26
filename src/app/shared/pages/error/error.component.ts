import { HttpErrorMessages } from '@core/values/http-error-messages.enum';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteParams } from '@core/values/route-params.enum';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  statusCode: number;

  errorMessage: string;

  private readonly errorMessages = {
    [HttpStatusCode.PaymentRequired]: HttpErrorMessages.QUOTA_IS_USED_UP,
    default: HttpErrorMessages.DEFAULT,
  };

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.statusCode = this.activateRoute.snapshot.params[RouteParams.STATUS];

    this.errorMessage = this.errorMessages[this.statusCode]
      ? this.errorMessages[this.statusCode]
      : this.errorMessages.default;
  }
}
