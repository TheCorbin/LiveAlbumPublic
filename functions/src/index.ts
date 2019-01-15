import * as functions from 'firebase-functions';
import * as roomFunctions from './rooms';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const settings = { timestampsInSnapshots: true };
const firestore = admin.firestore();
firestore.settings(settings);
export const firestoreInstance = firestore;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/**
* [document description]
* @param  '/users/{userId}' [description]
* @return                   [description]
*/
export const updateUser = functions.firestore
  .document('/users/{userId}/myRooms/{roomName}')
  .onDelete(async (event, context) => {
    await roomFunctions.deleteRoom(context);
  })