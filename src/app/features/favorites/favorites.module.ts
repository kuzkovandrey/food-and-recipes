import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FoodCardModule } from '@shared/components/food-card/food-card.module';

@NgModule({
  imports: [CommonModule, FavoritesRoutingModule, IonicModule, FoodCardModule],
  declarations: [FavoritesComponent],
})
export class FavoritesModule {}
