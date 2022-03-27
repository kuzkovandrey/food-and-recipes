import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipListComponent {
  @Input() itemList: Array<string | number>;

  @Input() title: string;

  @Input() color: string;
}
