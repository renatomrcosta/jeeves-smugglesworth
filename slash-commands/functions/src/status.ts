import * as functions from 'firebase-functions';
import {parseSlashCommandPostContent, PostContent, InChannelResponse} from "./slash-command.common";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const status = functions.https.onRequest((request, response) => {
    const inChannelResponse = new InChannelResponse();

    let postContent: PostContent = parseSlashCommandPostContent(request.body);

    inChannelResponse.text = "Any idea <@" + postContent.user_id + "> ";

    response.send(inChannelResponse)
});
