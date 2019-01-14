import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppAlertController } from '../../shared/controllers';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.page.html',
  styleUrls: ['./room-list.page.scss'],
})

export class RoomListPage implements OnInit {
  roomList: Observable<any>;
  user: any;
  anonymous: boolean;
  visitForm: FormGroup;

  constructor(
              public auth: AuthService,
              public router: Router,
              public alertCtrl: AppAlertController,
              formBuilder: FormBuilder,
              ) {
    this.user = this.auth.getUser();
    this.anonymous = this.user.email == null ? true : false;
    // this.roomList = this.auth.getRoomIds().valueChanges();
    // console.log('this is the room list', this.roomList);

    this.visitForm = formBuilder.group({
      roomId: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {
    console.log('Starting room list construction');
    this.roomList = this.auth.getRoomIds().valueChanges();
  }

  ionViewWillEnter() {
    this.user = this.auth.getUser();
    this.anonymous = this.user.email == null ? true : false;
  }

  ionViewDidEnter() {
  }

  createRoom() {
    this.auth.createRoom();
  }

  deleteRoom(roomSlideItem, room) {
    roomSlideItem.close();
    this.auth.deleteRoom(room);
  }

  async visitRoom() {
    const roomId: string = this.visitForm.value.roomId;
    console.log('This is the Room ID', roomId);
    this.navigateToRoom(roomId);
  }

  async navigateToRoom(roomId) {
    this.auth.checkRoom(roomId).then(async(check) => {
      console.log('This is the room check', check);

      if (check) {
        console.log('Im going to', roomId);
        this.router.navigate(['/photo-room/' + roomId]);
      } else {
        console.log('why no Error?');
        const errorMessage = 'Room: ' + roomId + ' does not exist.';
        console.log(errorMessage);
        // this.alert('Room: ' + roomId + ' does not exist.');
        this.alertCtrl.show({
          message: errorMessage,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
      }
    });
  }

  async alert(errorMessage) {
    await this.alertCtrl.show({
      message: errorMessage,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
  }

  logout() {
    this.router.navigateByUrl('/login-options');
    this.auth.logoutUser();
  }

  upgradeAccount() {
    this.router.navigateByUrl('/upgrade-anon');
  }
}

