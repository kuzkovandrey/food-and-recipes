import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { ParamsListComponent } from './components/params-list/params-list.component';
import { SearchParamsService } from './services/search-params.service';
import { ShortFoodCardComponent } from './components/short-food-card/short-food-card.component';

@NgModule({
  imports: [CommonModule, SearchRoutingModule, IonicModule],
  declarations: [SearchComponent, ParamsListComponent, ShortFoodCardComponent],
  providers: [SearchParamsService],
})
export class SearchModule {}
