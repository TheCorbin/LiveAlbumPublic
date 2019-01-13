import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise(resolve => {
        this.afAuth.user.subscribe(user => {
          if (user) {
            console.log('this is the user', user);
            resolve(true);
          } else {
            console.log('User is not logged in');
            this.router.navigate(['/']);
            resolve(false);
          }
        });
      });
  }
}
