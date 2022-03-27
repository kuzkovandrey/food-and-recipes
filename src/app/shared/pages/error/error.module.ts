import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [ErrorComponent],
  declarations: [ErrorComponent],
})
export class ErrorModule { }
