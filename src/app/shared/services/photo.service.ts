import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
    AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireStorageModule } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { Photo } from '../models/photo';
// import { RoomProfile } from '../shared/models/roomProfile';
import { DocumentReference, CollectionReference } from '@firebase/firestore-types';
import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private basePath = '/picture/';
  captureDevice;
  interval;
  videoBlob;
  canvas;
  image: SafeResourceUrl;

  constructor(
              private fireStore: AngularFirestore,
              private storage: AngularFireStorageModule,
              private auth: AuthService,
              private sanitizer: DomSanitizer) {
  }

  ionViewDidEnter() {
  }

  async takePicture(roomId) {
    console.log('About to take picture');
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.base64Data));
    const imageUrl = image.webPath;
    console.log('This is the image URL', imageUrl);
    this.storeImage(image, roomId);
  }

  storeImage(imageBlob, roomId: string) {
    console.log('About to store the image');
    // First store the image in Firebase Database storage

    this.uploadToFirebase(imageBlob).then((uploadSnapshot: any) => {
      // console.log('This is the downloadURL', uploadSnapshot);

      // Then save a reference to the photo
      return this.saveToDatabase(uploadSnapshot, roomId); // store reference to storage in database
    }).then((_uploadedSnapshot: any) => {
      // alert('file saved to asset catalog successfully ');
    }, (_error) => {
      alert('Error: ' + (_error.message || _error));
    });
  }

  uploadToFirebase(imgBase64: any) {
    const timestamp = Date.now();
    console.log('Reverse Timestamp!', timestamp);
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(this.basePath + timestamp + '.jpg'); // Firebase storage main path
      const metadata: firebase.storage.UploadMetadata = {
        contentType: 'image/jpeg',
      };
      console.log('THE IMAGE BASE 64:', imgBase64.base64Data);
      const uploadTask = storageRef.putString(imgBase64.base64Data, 'data_url', {contentType: 'image/jpg'});

      console.log(uploadTask);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // upload in progress
          console.log('This is the snapshot', snapshot);
          // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log("This is the progress", progress);
        },
        (error) => {
          // upload failed
          console.log(error);
          reject(error);
        },
        () => {
          // upload success
          // console.log('this is the uploadTask', uploadTask);
          // console.log('this is the uploadTask snapshot', uploadTask.snapshot.metadata.fullPath);

          // uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

          //   console.log('File available at', downloadURL);

          // });
          resolve(uploadTask.snapshot);
          // const url = uploadTask.snapshot.metadata.fullPath;
        });
    });
  }

  saveToDatabase(uploadSnapshot, roomId: string): Promise<void> {
    const global = this;
    uploadSnapshot.ref.getDownloadURL().then(function(downloadURL) {
      URL = downloadURL;

      console.log('this is the URL', URL);
      console.log('Time to make the reference', roomId);

      // tslint:disable-next-line:radix
      const timestamp = parseInt(uploadSnapshot.metadata.name.split('.').slice(0, -1));
      const location = `rooms/${roomId}/photos/${timestamp}`;
      console.log('this is the location', location);

      const email = global.auth.getUserEmail();

      return global.fireStore.doc(`rooms/${roomId}/photos/${timestamp}`).set({
        URL: URL,
        photoId: timestamp,
        email: email
      });
    });
    return null;
  }

  getPhotos(roomId): AngularFirestoreCollection<Photo> {
    // const photos:CollectionReference = .Orderby(;
    return this.fireStore.collection(`rooms/${roomId}/photos`);
  }

  getCaptureDevice() {
    return this.captureDevice;
  }
}


