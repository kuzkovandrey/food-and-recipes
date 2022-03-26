import { Component, Input, ViewChild } from '@angular/core';
import { MenuRoutesType } from '@core/values/menu-routes.const';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  {
  @Input() routes: MenuRoutesType[];

  @ViewChild(IonMenu) private menu: IonMenu;

  toggleMenu() {
    this.menu.toggle(true);
  }
}
