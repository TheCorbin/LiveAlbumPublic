import * as admin from 'firebase-admin';
import { firestoreInstance } from '../index';
// import * as functions from 'firebase-functions';

/**
 * [deleteRoom description]
 * @param  event [description]
 * @return deletion confirmation [description]
 * 
 */

 export async function deleteRoom(context) {
    const roomName = context.params.roomName;

    await firestoreInstance.collection(`rooms/${roomName}/photos`).get().then(result => {
      const docArray = result.docs;
      docArray.forEach(async(element) => {
        const storage = admin.storage().bucket();
        const file = storage.file(`picture/${element.data().photoId}.jpg`);
        await file.delete();
      })
    });

    await firestoreInstance.collection(`/rooms/${roomName}/photos`).get().then(photos => {
      photos.forEach(async docSnapshot => {
        console.log("this is the doc snapshot", docSnapshot.data());
        console.log("this is the doc snapshot ID", docSnapshot.data().photoId);
        await firestoreInstance.doc(`/rooms/${roomName}/photos/${docSnapshot.data().photoId}`).delete();
      });
    })
    .catch(error => {
      console.log(error);
    });

    await firestoreInstance.doc(`/rooms/${roomName}`).delete();
 }

