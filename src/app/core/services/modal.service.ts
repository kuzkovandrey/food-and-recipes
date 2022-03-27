import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipeComponent } from '@shared/pages/recipe/recipe.component';

@Injectable()
export class ModalService {
  constructor(private modalController: ModalController) {}

  async openRecipeModal(id: number) {
    const modal = await this.modalController.create({
      component: RecipeComponent,
      componentProps: { id },
      swipeToClose: true,
    });

    return await modal.present();
  }
}
