import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'short-food-card',
  templateUrl: './short-food-card.component.html',
  styleUrls: ['./short-food-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortFoodCardComponent {
  @Input() image: string;

  @Input() title: string;
}

