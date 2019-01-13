import { Injectable } from '@angular/core';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppAlertController {
  constructor(private alertCtrl: AlertController) {}

  show(options: AlertOptions) {
    this.alertCtrl.create(options).then((alert) => {
      return alert.present();
    });
  }
}
