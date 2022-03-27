import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from '@shared/pages/recipe/recipe.component';
import { NgModule } from '@angular/core';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { StepListComponent } from './components/step-list/step-list.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { ImageUrlPipeModule } from '@shared/pipes/image-url-pipe.module';
import { IngredientCardComponent } from './components/ingredient-card/ingredient-card.component';

@NgModule({
  imports: [CommonModule, IonicModule, ImageUrlPipeModule],
  exports: [RecipeComponent],
  declarations: [
    RecipeComponent,
    ChipListComponent,
    StepListComponent,
    IngredientListComponent,
    IngredientCardComponent,
  ],
})
export class RecipeModule {}
