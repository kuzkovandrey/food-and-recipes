import { HttpErrorMessages } from '@core/values/http-error-messages.enum';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteParams } from '@core/values/route-params.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  private readonly errorMessages = {
    [HttpStatusCode.PaymentRequired]: HttpErrorMessages.QUOTA_IS_USED_UP,
    default: HttpErrorMessages.DEFAULT,
  };

  statusCode: number;

  errorMessage: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.statusCode = this.activateRoute.snapshot.params[RouteParams.STATUS];
    this.errorMessage = this.errorMessages[this.statusCode] || this.errorMessages.default
  }

  navigateToPreviosPage() {
    this.location.back();
  }
}
