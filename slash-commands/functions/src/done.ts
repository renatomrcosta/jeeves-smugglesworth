import * as functions from 'firebase-functions';
import {parseSlashCommandPostContent, PostContent, InChannelResponse} from "./slash-command.common";
import * as admin from "firebase-admin";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const done = functions.https.onRequest((request, response) => {
    const firestore = admin.firestore();

    const postContent: PostContent = parseSlashCommandPostContent(request.body);

    return firestore.collection("channels").where("channel_id","==",postContent.channel_id).get()
        .then((channels) => {
            if (channels.empty) {
                return firestore.collection("channels").add({channel_id:postContent.channel_id,channel_name:postContent.channel_name}).then((data)=>{return data.id});
            }
            return channels.docs[0].id;
        }).then((channelId)=>{

            return firestore.collection(`channels`).doc(channelId).collection("queue").get().then((userInQueue)=>{
                const inChannelResponse = new InChannelResponse();
                if (userInQueue.empty){
                    inChannelResponse.text = `There is nobody in the line .... Come on <@${postContent.user_id}> what are you doing!?!?!?`;
                    return inChannelResponse;
                }

                if (userInQueue.docs[0].data().user_id == postContent.user_id){
                     return firestore.collection(`channels`).doc(channelId).collection("queue").doc(userInQueue.docs[0].id).delete().then(
                         (data)=>{

                             inChannelResponse.text = userInQueue.docs.length > 1 ?
                                 `Hey <@${userInQueue.docs[1].data().user_id}> you can start the merge !!!!` :
                                 `The queue is empty, I'll get some rest`
                             ;
                             return inChannelResponse;
                         }
                     )
                }
                return firestore.collection(`channels`).doc(channelId).collection("queue").doc(postContent.user_id).get().then((user)=>{
                   if (!user){
                       inChannelResponse.text = `Hey <@${postContent.user_id}> you are not even in line !!!! Come on ...`;
                       return inChannelResponse
                   }
                   inChannelResponse.text = `Hey <@${postContent.user_id}> wait for your turn!!!`;
                   return inChannelResponse
                })
            });
        }).then((inChannelResponse)=>{
            return response.send(inChannelResponse);
        });
});
