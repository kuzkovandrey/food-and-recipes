import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() photoUrl: string;

  @Input() email: string;

  get emailLetter(): string {
    return this.email.charAt(0).toUpperCase();
  }
}

