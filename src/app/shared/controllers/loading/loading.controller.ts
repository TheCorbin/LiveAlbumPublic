import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AppLoadingController {
  loader: HTMLIonLoadingElement;
  constructor(private loadingCtrl: LoadingController) {}

  async show(): Promise<HTMLIonLoadingElement> {
    this.loader = await this.loadingCtrl.create();
    this.loader.present();
    return this.loader;
  }

  dismiss() {
    return this.loader.dismiss();
  }
}
