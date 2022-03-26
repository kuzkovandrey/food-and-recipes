import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountRoutingModule],
  declarations: [AccountComponent],
  exports: [AccountComponent],
})
export class AccountModule {}
