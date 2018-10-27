import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import {parseSlashCommandPostContent, PostContent, InChannelResponse} from "./slash-command.common";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const merge = functions.https.onRequest((request, response) => {

    const firestore = admin.firestore();

    const postContent: PostContent = parseSlashCommandPostContent(request.body);

    return firestore.collection("channels").where("channel_id","==",postContent.channel_id).get()
        .then((channels) => {
            if (channels.empty) {
                return firestore.collection("channels").add({channel_id:postContent.channel_id,channel_name:postContent.channel_name}).then((data)=>{return data.id});
            }
            return channels.docs[0].id;
        }).then((channelId)=>{

            return firestore.collection(`channels`).doc(channelId).collection("queue").where("user_id","==",postContent.user_id).get().then((userInQueue)=>{
                const inChannelResponse = new InChannelResponse();
                if (userInQueue.empty) {
                    return firestore.collection(`channels`).doc(channelId).collection("queue").add({user_id:postContent.user_id}).then((data)=>{

                        inChannelResponse.text = `Ok <@${postContent.user_id}> you can start your merge!!!`;
                        return inChannelResponse
                    });
                }

                inChannelResponse.text = `Hold on a sec <@${postContent.user_id}>  ... It seems that you are already on line for merge`;
                return inChannelResponse;
            });
        }).then((userInQueue)=>{
            return response.send(userInQueue);
        });
});
