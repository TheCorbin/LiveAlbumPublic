import { AppAlertController } from './../../shared/controllers/alert/alert.controller';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { EmailValidator } from '../../../validators/email';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
const { Modals } = Plugins;


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  public signupForm: FormGroup;
  public loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public router: Router,
    public alertCtrl: AppAlertController,
    formBuilder: FormBuilder) {

    this.signupForm = formBuilder.group({
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
    console.log('ionViewDidLoad SignupPage');
  }

  // async signupUser(): Promise<any> {
  //   if (!this.signupForm.valid ) {
  //     console.log('Form not ready');
  //   } else {
  //     const email: string = this.signupForm.value.email;
  //     const password: string = this.signupForm.value.password;

  //     this.authService.createEmailAuth(email, password).then(
  //       () => {
  //         loading.dismiss().then(() => {
  //           this.router.navigateByUrl('/room-list');
  //         });
  //       },
  //       error => {
  //         this.loading.dismiss().then(async () => {
  //           const alert = await this.alertCtrl.create({
  //             message: error.message,
  //             buttons: [{ text: 'Ok', role: 'cancel' }],
  //           });
  //           await alert.present();
  //         });
  //       }
  //     };
  //   }
  // }

  async signupUser(signupForm: FormGroup): Promise<void> {
    console.log('can we signup?');
    if (!signupForm.valid) {
      console.log('Need to complete the form, current value: ', signupForm.value);
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      this.authService.createEmailAuth(email, password).then(
        () => {
          this.router.navigateByUrl('/room-list');
        },
        error => {
          this.loginFailure(error);
        }
      );
    }
  }

  async loginFailure(error) {
    // await this.loading.dismiss();
    await this.alertCtrl.show({
      message: error.message,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
  }
}
