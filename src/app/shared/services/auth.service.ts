import { UserRoles } from './../models/user';
import { Injectable, NgModule } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { User } from '../models/user';
import { RoomProfile } from '../models/roomProfile';
import { DocumentReference } from '@firebase/firestore-types';
import Haikunator from 'haikunator';
import { NgModelGroup } from '@angular/forms';
import { AppAlertController } from '../controllers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string;
  email: string;
  nameMaker = new Haikunator();

  constructor(public afAuth: AngularFireAuth,
              public fireStore: AngularFirestore,
              private alertController: AppAlertController,
              ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.email = user.email;
      }
    });
  }

  getUserId() {
    return this.userId;
  }

  getUserEmail() {
    console.log('Getting that email!', this.email);
    return this.email;
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  loginAnon(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInAnonymously();
  }

  upgradeAccount() {

  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  createEmailAuth(
    email: string,
    password: string,
  ): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUserCredential => {
        this.checkAndCreate(newUserCredential.user);
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  loginEmailAuth(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        this.checkAndCreate(result.user);
      })
      .catch((err: any) => {
        this.alert(err.message);
        console.log(err);
      });
  }


  facebookAuth(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        console.log('logging in the facebook way!');
        this.checkAndCreate(result.user);
      })
      .catch((err: any) => {
        this.alert(err.message);
      });
  }

  async checkAndCreate(user) {
    console.log('In check and create!');
    const email = user.email;
    const UID = user.uid;

    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(UID);

    userRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        userRef.onSnapshot(async doc => {
          const role = doc.get('role');
          if (role === 'player') {
            await this.alertController.show({
              message: 'Welcome Player',
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
          }
          return userRef;
        });
      } else {
        console.log('Making a new Doc!');
        const newUser: User = {
          id: UID,
          email: email,
          roles: [UserRoles.Guest]
        };

        const newUserRef = firebase
          .firestore()
          .collection('users')
          .doc(UID)
          .set(newUser)
          .then(docRef => {
          })
          .catch(function(error) {
            console.error('Error adding document: ', error);
          });
        return newUserRef;
      }
    });
  }

  async alert(errorMessage) {
    await this.alertController.show({
      message: errorMessage,
      buttons: [{ text: 'Ok', role: 'cancel' }]
    });
  }

  // async upgradeAnonUser(email: string, password: string): Promise<firebase.User> {
  //   try {
  //     const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  //     let user: any;

  //     await firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function(usercred) {
  //     user = usercred.user;
  //       console.log('Anonymous account successfully upgraded', user);
  //     }, function(error) {
  //       console.log('Error upgrading anonymous account', error);
  //       if (error.message === 'The email address is already in use by another account') {
  //         alert('That email is already in use.  Try again.');
  //       }
  //     });

  //     const userProfileDocument: AngularFirestoreDocument<User> = this.fireStore.doc(`user/${ user.uid }`);

  //     await userProfileDocument.set({
  //       id: user.id,
  //       email: email
  //     });

  //     return user;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  createRoom(): Promise<void> {
    console.log('I\'m in Create Room');
    // const roomId: string = this.fireStore.createId();
    const name = this.nameMaker.haikunate({tokenLength: 2, delimiter: ' '});
    console.log('room Name', name);

    this.fireStore.doc<RoomProfile>(`rooms/${name}`).set({
      id: name,
      roomAdmin: this.userId,
    });

    const roomRef: DocumentReference = this.fireStore.doc(`rooms/${name}`).ref;

    return this.fireStore
      .doc(`users/${this.userId}/myRooms/${name}`)
      .set({
        roomReference: roomRef,
      });
  }

  async deleteRoom(room) {
    console.log('this is the room', room);

    this.fireStore
    .doc(`users/${this.userId}/myRooms/${room}`)
    .delete();

    this.fireStore
    .doc(`rooms/${room}`)
    .delete();

    

  }

  getRoomIds(): AngularFirestoreCollection<any> {
    return this.fireStore.collection(
      `users/${this.userId}/myRooms`,
      ref => ref
    );
  }

  async checkRoom(roomId) {
    const roomRef: DocumentReference = this.fireStore.doc(`rooms/${roomId}`).ref;
    let check = false;
    await roomRef.get().then((docSnapshot) => {
      // console.log("Made it into Check Room", docSnapshot);
      if (docSnapshot.exists) {
        // console.log("It's a real room!");
        check = true;
      } else {
        check = false;
      }
    });
    console.log('This is the check', check);
    return check;
  }
}
