import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Recipe } from '@core/models/recipe.model';

@Component({
  selector: 'food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodCardComponent {
  @Input() recipe: Recipe;

  @Output() readMoreClicked = new EventEmitter<number>();

  onClickReadMore() {
    this.readMoreClicked.emit(this.recipe.id);
  }
}
