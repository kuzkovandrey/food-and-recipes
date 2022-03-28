import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PredefinedColors } from '@ionic/core';

@Injectable()
export class ToastService {
  constructor(private toastController: ToastController) {}

  async show(message: string, color: PredefinedColors = 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
