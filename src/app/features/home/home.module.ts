import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FoodCardModule } from '@shared/components/food-card/food-card.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    FoodCardModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
