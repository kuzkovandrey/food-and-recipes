import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountRoutingModule],
  declarations: [AccountComponent, UserAvatarComponent],
  exports: [AccountComponent],
})
export class AccountModule {}
