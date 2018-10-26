import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const done = functions.https.onRequest((request, response) => {
 response.send("done");
});
