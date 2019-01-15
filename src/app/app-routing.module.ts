import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-options',
    pathMatch: 'full' },
  // {
  //   path: 'anon-login',
  //   loadChildren: './pages/anon-login/anon-login.module#AnonLoginPageModule',
  // },
  {
    path: 'barcode-share/:roomId',
    loadChildren: './pages/barcode-share/barcode-share.module#BarcodeSharePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'create-account',
    loadChildren: './pages/create-account/create-account.module#CreateAccountPageModule',
  },
  {
    path: 'login-options',
    loadChildren: './pages/login-options/login-options.module#LoginOptionsPageModule',
  },
  // {
  //   path: 'normal-login',
  //   loadChildren: './pages/normal-login/normal-login.module#NormalLoginPageModule',
  // },
  {
    path: 'password-reset',
    loadChildren: './pages/password-reset/password-reset.module#PasswordResetPageModule',
  },
  {
    path: 'photo-room/:roomId',
    loadChildren: './pages/photo-room/photo-room.module#PhotoRoomPageModule',
    data: {
      backRoute: '/room-list'
    }
  },
  {
    path: 'room-list',
    loadChildren: './pages/room-list/room-list.module#RoomListPageModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'upgrade-anon',
  //   loadChildren: './pages/upgrade-anon/upgrade-anon.module#UpgradeAnonPageModule',
  // },
  // { path: 'start', loadChildren: './start/start.module#StartPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
