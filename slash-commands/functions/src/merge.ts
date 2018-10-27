import * as functions from 'firebase-functions';
import * as bodyparser from 'body-parser'
import {InChannelResponse} from "./response.slash.command";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


export const merge = functions.https.onRequest((request, response) => {
    const inChannelResponse = new InChannelResponse();
    inChannelResponse.text = "It's too early <@" + request.body.user_id + "> ... come back here later";
    response.send(inChannelResponse)

});
