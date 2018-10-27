import * as functions from 'firebase-functions';
import * as bodyparser from 'body-parser'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


export const merge = functions.https.onRequest((request, response) => {

    response.send({
        "response_type": "in_channel",
        "text": "It's too early <@" + request.body.user_id + "> ... come back here later"
        // "attachments": [
        // {
        //     "text":"Partly cloudy today and tomorrow"
        // }
    // ]
    })

});
