import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as messages from '../resources/messages'

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
            return firestore.collection(`channels`).doc(channelId).collection("queue").get().then((snapshot) => {
            // return firestore.collection(`channels`).doc(channelId).collection("queue").where("user_id","==",postContent.user_id).get().then((userInQueue)=>{
                const inChannelResponse = new InChannelResponse();
                //counting size for small collections
                if (snapshot.size == 0) {
                    return firestore.collection(`channels`).doc(channelId).collection("queue").add({user_id:postContent.user_id}).then((data)=>{
                        inChannelResponse.text = messages.firstInLine.replace('%s', postContent.user_id);
                        return inChannelResponse
                    });
                }
                inChannelResponse.text = messages.waitForABit.replace('%s', postContent.user_id);
                return inChannelResponse;
            });
        }).then((userInQueue)=>{
            return response.send(userInQueue);
        });
});
