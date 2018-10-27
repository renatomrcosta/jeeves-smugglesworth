import * as functions from 'firebase-functions';

import {parseSlashCommandPostContent, PostContent, InChannelResponse} from "./slash-command.common";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


export const merge = functions.https.onRequest((request, response) => {
    const inChannelResponse = new InChannelResponse();

    let postContent: PostContent = parseSlashCommandPostContent(request.body);

    inChannelResponse.text = "Ok <@" + postContent.user_id + "> I know you asked for a merge";

    response.send(inChannelResponse)
});
