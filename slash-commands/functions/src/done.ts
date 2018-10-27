import * as functions from 'firebase-functions';
import {parseSlashCommandPostContent, PostContent, InChannelResponse} from "./slash-command.common";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const done = functions.https.onRequest((request, response) => {
    const inChannelResponse = new InChannelResponse();

    let postContent: PostContent = parseSlashCommandPostContent(request.body);

    inChannelResponse.text = "Ok <@" + postContent.user_id + ">, why do you take so long to finish?";

    response.send(inChannelResponse)
});
