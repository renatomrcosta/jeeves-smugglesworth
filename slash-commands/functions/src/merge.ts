import * as functions from 'firebase-functions';
import {InChannelResponse} from "./response.slash.command";
import {parseSlashCommandPostContent, PostContent} from "./slash-command.common";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


export const merge = functions.https.onRequest((request, response) => {
    const inChannelResponse = new InChannelResponse();

    let postContent: PostContent = parseSlashCommandPostContent(request.body);

    inChannelResponse.text = "Ok <@" + postContent.user_id + "> I know you asked for a merge";

    response.send(inChannelResponse)
});
