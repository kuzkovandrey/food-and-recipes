import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable()
export class ModalService {
  constructor(private modalController: ModalController) {}

  async open(component: any, props = {}) {
    const modal = await this.modalController.create({
      component,
      componentProps: props,
      swipeToClose: true,
    });

    return await modal.present();
  }
}
