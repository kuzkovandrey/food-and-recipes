import { Recipe } from '@core/models/recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent {
  @Input() recipe: Recipe;

}
