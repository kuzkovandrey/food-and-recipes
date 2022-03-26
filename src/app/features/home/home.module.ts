import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, IonicModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
