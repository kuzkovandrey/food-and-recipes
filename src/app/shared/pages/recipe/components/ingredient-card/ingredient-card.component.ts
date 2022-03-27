import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExtendedIngredient } from '@core/models/extended-ingredient.model';

@Component({
  selector: 'ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientCardComponent {
  @Input() ingredient: ExtendedIngredient;

  get cardText(): string {
    return `
    ${this.ingredient.name} -
    ${this.ingredient.measures.metric.amount}
    ${this.ingredient.measures.metric.unitShort}
  `;
  }
}
