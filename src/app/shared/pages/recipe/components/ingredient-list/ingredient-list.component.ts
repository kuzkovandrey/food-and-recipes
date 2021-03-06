import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExtendedIngredient } from '@core/models/extended-ingredient.model';

@Component({
  selector: 'ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientListComponent {
  @Input() extendedIngredients: ExtendedIngredient[];
}
