import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@features/auth/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnChanges, OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  @Input() isSignIn = true;

  @Output() sendFormValue = new EventEmitter<User>();

  userForm: FormGroup;

  ngOnChanges() {
    if (this.userForm) this.userForm.reset();
  }

  ngOnInit() {
    this.initUserForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initUserForm() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  sendForm() {
    this.sendFormValue.emit(this.userForm.value);
  }
}
