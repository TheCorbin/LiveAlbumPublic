import { Router } from '@angular/router';
import { EmailValidator } from '../../../validators/email';
import { LoadingController, AlertController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/services/auth.service';
import { Plugins } from '@capacitor/core';
import { AppAlertController } from './../../shared/controllers';
const { Modals } = Plugins;

@Component({
  selector: 'app-normal-login',
  templateUrl: './normal-login.page.html',
  styleUrls: ['./normal-login.page.scss'],
})
export class NormalLoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public router: Router,
    public alertCtrl: AppAlertController,
    formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginPage');
  }

  goToSignup(): void {
    this.router.navigateByUrl('/create-account');
  }

  goToPasswordReset(): void {
    this.router.navigateByUrl('/password-reset');
  }

  async loginUser(): Promise<any> {
    if (!this.loginForm.valid) {
      console.log('Form not ready');
    } else {
      // const loading = await this.loadingCtrl.create({
      //   content: 'Loading',
      // });

      // loading.present();

      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;

      this.authService.loginEmailAuth(email, password).then(
        () => {
          // loading.dismiss().then(() => {
            this.router.navigateByUrl('/room-list');
          // });
        },
        error => {
          this.alert(error.message);
          // // loading.dismiss().then( async () => {
          //   const alert = this.alertCtrl.create({
          //     message: error.message,
          //     buttons: [{ text: 'Ok', role: 'cancel' }],
          //   });
          //   alert.present();
          // });
        // });
        });
    }
  }

  async alert(errorMessage) {
    await this.alertCtrl.show({
      message: errorMessage,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
  }
 
}
