import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  statusCode: number;

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.statusCode = this.activateRoute.snapshot.params['status']
  }

}
