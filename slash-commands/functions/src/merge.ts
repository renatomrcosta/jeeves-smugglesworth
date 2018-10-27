import * as functions from 'firebase-functions';
import * as bodyparser from 'body-parser'
import {ResponseSlashCommand} from "./response.slash.command";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


export const merge = functions.https.onRequest((request, response) => {
    const responseSlashCommand = new ResponseSlashCommand("in_channel");
    responseSlashCommand.text = "It's too early <@" + request.body.user_id + "> ... come back here later";
    response.send(responseSlashCommand)

});
