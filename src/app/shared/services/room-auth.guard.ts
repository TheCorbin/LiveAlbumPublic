import { AuthPopoverComponent } from './../components/auth-popover/auth-popover.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, PopoverController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RoomAuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private alertController: AlertController,
              private popOverController: PopoverController) {}

   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise(resolve => {
        this.afAuth.user.subscribe(async(user) => {
          if (user) {
            resolve(true);
          } else {

            // const loginPopover = await this.popOverController.create({
            //   component: AuthPopoverComponent
            // });
            // await loginPopover.present();


            // const loginChoice = await this.alertController.create({
            //   header: 'Login to contribute!',
            //   buttons: [
            //     {
            //       text: 'Login with Facebook',
            //       cssClass: 'facebookButton',
            //       handler: () => {
            //         this.loginWithFacebook();
            //       }
            //     },
            //       text: 'Login with google',
            //       cssClass: 'googleButton',
            //       handler: () => {
            //         this.loginWithGoogle();
            //       }
            //     },
            //     {
            //       text: 'Login with Email',
            //       cssClass: 'emailLoginButton',
            //       handler: () => {
            //         this.loginWithEmail();
            //       }
            //     },
            //     {
            //       text: 'Anonymous Guest',
            //       cssClass: 'anonymousButton',
            //       handler: () => {
            //         this.stayAnonymous();
            //       }
            //     }
            //   ]
            // });
            // await loginChoice.present();
            console.log('no user here');
            resolve(true);
          }
        });
      });
  }

  loginWithFacebook() {

  }

  loginWithGoogle() {

  }

  loginWithEmail() {

  }

  stayAnonymous() {

  }
}
