const {messageService} = require("../services/messages.service.ts");
const {queueService} = require('../services/queue.service.ts');
const messageList = require('../messages.json');

const buildStatusMessage = (docSnapshot) => {
    let statusMessage = messageList.showQueue;
    docSnapshot.forEach((document) => {
        statusMessage += messageService.mentionSlackUser(document.get('user_id')) +
            '\n' + messageService.printRelativeTime(document.get('queue_timestamp'));
    });

    return statusMessage;
};

const statusHandler = (payload) => {
    const channel_id = payload.event.channel;

    queueService.getQueueByChannelId(channel_id).then((channelSnapshot) => {
        if(channelSnapshot.empty){
            messageService.sendMessage(payload.event.channel, messageList.queueIsEmpty);
        } else {
            let statusMessage = buildStatusMessage(channelSnapshot);
            messageService.sendMessage(payload.event.channel, statusMessage);
        }
    });

};
module.exports = {
    statusHandler: statusHandler
};