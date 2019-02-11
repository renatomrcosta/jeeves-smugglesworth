import messageList from "../messages.json";
import messageService from "../services/messages.service";
import queueService from "../services/queue.service";

const doneHandler = (payload: IPayload, eventType: string) => {
    const channelId = payload.event.channel;
    const userId = payload.event.user;

    queueService.getById(channelId).then((channelSnapshot: any) => {
       if (channelSnapshot.empty) {
           messageService.sendMessage(payload.event.channel, messageList.noMergeInProcess);
       } else {
           const doc = channelSnapshot.docs[0];
           const snapshotUserId = doc.get("user_id");
           if (eventType === "DONE" && snapshotUserId !== userId) {
               messageService.sendMessage(payload.event.channel,
                   messageList.waitYourTurn.replace("%s", messageService.mentionSlackUser(snapshotUserId)));
           } else {
               const document = channelSnapshot.docs.shift();
               const message = (eventType === "DONE" ? messageList.mergedSuccessfully : messageList.kickedFromQueue);
               const mentionedUser = (eventType === "DONE" ? userId : document.get("user_id"));

               queueService.remove(document).then(() => {
                   messageService
                       .sendMessage(channelId, message.replace("%s", messageService.mentionSlackUser(mentionedUser)))
                       .then(() => {
                            callNextUserInQueue(channelId, channelSnapshot.docs);
                       });
               }).catch((errormsg: any) => console.error(errormsg));
           }
       }
    });

    const callNextUserInQueue = (channelId: string, documents: any) => {
        if (documents.length > 0) {
            messageService.sendMessage(channelId,
                messageList.nextTurn.replace("%s", messageService.mentionSlackUser(documents[0].get("user_id"))));
        }
    };
};
export default {
    handle: doneHandler,
};
