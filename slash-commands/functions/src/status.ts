import * as functions from 'firebase-functions';
import {parseSlashCommandPostContent, PostContent, InChannelResponse} from "./slash-command.common";
import * as admin from "firebase-admin";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const status = functions.https.onRequest((request, response) => {
    const firestore = admin.firestore();

    const postContent: PostContent = parseSlashCommandPostContent(request.body);

    return firestore.collection("channels").where("channel_id","==",postContent.channel_id).get()
        .then((channels) => {
            if (channels.empty) {
                return firestore.collection("channels").add({channel_id:postContent.channel_id,channel_name:postContent.channel_name}).then((data)=>{return data.id});
            }
            return channels.docs[0].id;
        }).then((channelId)=>{

            return firestore.collection(`channels`).doc(channelId).collection("queue").get().then((queue)=>{
                const inChannelResponse = new InChannelResponse();
                inChannelResponse.text = "Look who is in the line !!!";
                queue.docs.forEach(val => {
                    inChannelResponse.text += `<@${val.data().user_id}>\n`;
                })
                return inChannelResponse
            });
        }).then((userInQueue)=>{
            return response.send(userInQueue);
        });
});
