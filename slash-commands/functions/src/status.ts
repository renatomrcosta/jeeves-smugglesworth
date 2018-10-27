import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const status = functions.https.onRequest((request, response) => {
 response.send("status");
});
