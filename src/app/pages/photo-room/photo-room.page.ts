  import { Component, OnInit } from '@angular/core';
  import { DomSanitizer } from '@angular/platform-browser';
  import { AuthService } from './../../shared/services/auth.service';
  import { PhotoService } from './../../shared/services/photo.service';
  import { Photo } from './../../shared/models/photo';
  import { Observable } from 'rxjs';
  import { Router, ActivatedRoute } from '@angular/router';

  @Component({
    selector: 'app-photo-room',
    templateUrl: './photo-room.page.html',
    styleUrls: ['./photo-room.page.scss'],
  })
  export class PhotoRoomPage implements OnInit {
    // user: any;
    captureDevice;
    pictureBlobs: any[] = [];
    roomId: string;
    pictureList: Observable<any>;
    pictureReferences: Observable<Photo[]>;
    public backRoute: String;

  constructor( public domSanitize: DomSanitizer,
               public photoService: PhotoService,
               public auth: AuthService,
               public router: Router,
               public route: ActivatedRoute) {

    // this.roomId = this.navParams.get('roomId');
    this.route.data.subscribe(data => {
      const { backRoute } = data;
      this.backRoute = backRoute;
      console.log('this is the back route', this.backRoute);
    });

    this.roomId = this.route.snapshot.paramMap.get('roomId');
    console.log('This is the Room Id', this.roomId);

    if (!this.roomId) {
        console.log('It\'s not NULL HERE IN Constructor');
        console.log('This is the Room ID frm params', this.roomId);
        this.parseURL();
      }

      // this.user = this.auth.getUser();
      console.log('I\'m in the constructor', this.roomId);
      this.pictureList = this.photoService.getPhotos(this.roomId).valueChanges();
    }

    ngOnInit() {
    }

    ionViewDidLoad() {
      // this.user = this.auth.getUser();
      this.roomId = this.route.snapshot.paramMap.get('roomId');
      if (!this.roomId) {
        console.log('It\'s not NULL HERE IN VIEWDIDLOAD');
        this.parseURL();
        console.log('This is the room Id from the ViewDidLoad', this.roomId);
      }

      this.pictureReferences = this.photoService
          .getPhotos(this.roomId)
          .valueChanges();
      console.log('This is the picture References', this.pictureReferences);
    }

    takePhoto() {
      console.log('This is the room Id', this.roomId);
      this.photoService.takePicture(this.roomId);
    }

    sanitizeImage(imageBlob) {
      return this.domSanitize.bypassSecurityTrustUrl(imageBlob);
    }

    barcode() {
      this.router.navigateByUrl('/barcode-share/' + this.roomId);
    }

    parseURL() {
      const url_string = document.URL;
      const value = decodeURI(this.extractUrlValue('room', url_string));
      console.log('This is the value', value);
      if (value !== '') {
        console.log('In Parse URL it\'s assigning the string');
        this.roomId = value;
      }
    }

    extractUrlValue(key, url) {
      if (typeof(url) === 'undefined') {
          url = window.location.href;
      }
      const match = url.match('[?&]' + key + '=([^&]+)');
      return match ? match[1] : null;
    }
  }

