import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { GooglePlus } from '@ionic-native/google-plus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../../validators/email';
import { AppAlertController, AppLoadingController } from './../../shared/controllers';


@Component({
  selector: 'app-login-options',
  templateUrl: './login-options.page.html',
  styleUrls: ['./login-options.page.scss'],
})
export class LoginOptionsPage implements OnInit {

  loginForm: FormGroup;
  // public loading: HTMLIonLoadingElement;

  constructor(public router: Router,
              public authService: AuthService,
              // public loadingCtrl: AppLoadingController,
              public alertCtrl: AppAlertController,
              formBuilder: FormBuilder  )  {
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
    console.log('ionViewDidLoad LoginPage');
  }

  goToLogin() {
    this.router.navigateByUrl('/normal-login');
  }

  goToCreateAccount() {
    this.router.navigateByUrl('/create-account');
  }

  goToAnnonymousAccount() {
    this.router.navigateByUrl('/anon-login');
  }

  // goToGoogleLogin() {
  //   this.googlePlus.login({})
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));
  // }

  // dismissModal() {
  //   this.router.navigateByUrl('/admin');
  // }

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
        });
    }
  }

  async facebookLogin() {
    console.log('Can I get to here');
    this.authService.facebookAuth().then(
      () => {
        // loading.dismiss().then(() => {
          console.log('before router');
          this.router.navigateByUrl('/room-list');
          console.log('before router');

        // });
      },
      error => {
        this.alert(error.message);
      }
    );
  }

  async googleLogin() {
    // this.loading = await this.loadingCtrl.show();
    this.authService.googleAuth().then(
      () => {
        // loading.dismiss().then(() => {
          console.log('before router');
          this.router.navigateByUrl('/room-list');
          console.log('before router');

        // });
      },
      error => {
        this.alert(error.message);
      }
    );
  }

  async loginSuccess() {
    // await this.loading.dismiss();
    console.log('Getting to login Success');
    this.router.navigateByUrl('/room-list');
  }

  async loginFailure(error) {
    // await this.loading.dismiss();
    await this.alertCtrl.show({
      message: error.message,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
  }


  async alert(errorMessage) {
    await this.alertCtrl.show({
      message: errorMessage,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
  }
}
