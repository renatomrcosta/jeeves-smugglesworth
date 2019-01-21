const {messageService} = require("../services/messages.service.ts");
const {queueService} = require('../services/queue.service.ts');
const messageList = require('../messages.json');

const doneHandler = (payload, event_type) => {
    const channel_id = payload.event.channel;
    const user_id = payload.event.user;

    queueService.getById(channel_id).then((channelSnapshot) => {
       if(channelSnapshot.empty){
           messageService.sendMessage(payload.event.channel, messageList.noMergeInProcess);
       } else {
           const doc = channelSnapshot.docs[0];
           const snapshotUserId = doc.get('user_id');
           if(event_type === 'DONE' && snapshotUserId !== user_id){
               messageService.sendMessage(payload.event.channel,
                   messageList.waitYourTurn.replace('%s', messageService.mentionSlackUser(snapshotUserId)));
           } else {
               const doc = channelSnapshot.docs.shift();
               const message = (event_type === 'DONE' ? messageList.mergedSuccessfully : messageList.kickedFromQueue);
               const mentionedUser = (event_type === 'DONE' ? user_id : doc.get('user_id'));

               queueService.remove(doc).then(() => {
                   messageService.sendMessage(channel_id, message.replace('%s', messageService.mentionSlackUser(mentionedUser))).then(() => {
                       callNextUserInQueue(channel_id, channelSnapshot.docs);
                   });
               }).catch((errormsg) => console.error(errormsg));
           }
       }
    });

    const callNextUserInQueue = (channel_id, documents) => {
        if(documents.length > 0){
            messageService.sendMessage(channel_id,
                messageList.nextTurn.replace('%s', messageService.mentionSlackUser(documents[0].get('user_id'))));
        }
    };
};
module.exports = {
    doneHandler: doneHandler
};
