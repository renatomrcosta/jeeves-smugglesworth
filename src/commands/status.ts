const {messageService} = require("../services/messages.service.ts");
const {queueService} = require('../services/queue.service.ts');
const messageList = require('../messages.json');

//TODO - Change this not to use a firebase type, but something more agnostic
const buildStatusMessage = (docSnapshot: any) => {
    let statusMessage = messageList.showQueue;
    docSnapshot.forEach((document: any) => {
        const userMention = messageService.mentionSlackUser(document.get('user_id'));
        const timestamp = messageService.printRelativeTime(document.get('queue_timestamp'));

        //Status message will be something like: @Renato Costa (a few seconds ago);
        statusMessage += `${userMention } (${timestamp})\n`;
    });

    return statusMessage;
};

const statusHandler = (payload: Payload) => {
    const channel_id = payload.event.channel;

    //TODO - Change this not to use a firebase type, but something more agnostic
    queueService.getById(channel_id).then((channelSnapshot: any) => {
        if(channelSnapshot.empty){
            messageService.sendMessage(payload.event.channel, messageList.queueIsEmpty);
        } else {
            let statusMessage = buildStatusMessage(channelSnapshot);
            messageService.sendMessage(payload.event.channel, statusMessage);
        }
    });

};
export default {
    handle: statusHandler
};
