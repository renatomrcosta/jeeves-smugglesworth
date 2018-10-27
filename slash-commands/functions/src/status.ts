import * as functions from 'firebase-functions';
import {InChannelResponse} from "./response.slash.command";
import {parseSlashCommandPostContent, PostContent} from "./slash-command.common";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const status = functions.https.onRequest((request, response) => {
    const inChannelResponse = new InChannelResponse();

    let postContent: PostContent = parseSlashCommandPostContent(request.body);

    inChannelResponse.text = "Any idea <@" + postContent.user_id + "> ";

    response.send(inChannelResponse)
});
