const {messageService} = require("../services/messages.service");
const {queueService} = require('../services/queue.service');
const messageList = require('../messages.json');

const kickHandler = (payload) => {
    const channel_id = payload.event.channel;
    const user_id = payload.event.user;

    queueService.getQueueByChannelId(channel_id).then((channelSnapshot) => {
        if(channelSnapshot.empty){
            messageService.sendMessage(payload.event.channel, messageList.queueIsEmpty);
        } else {
            const doc = channelSnapshot.docs[0];
            messageService.sendMessage(channel_id,
                messageList.kickedFromQueue.replace('%s', messageService.mentionSlackUser(user_id)));
            queueService.deleteQueue(doc);
        }
    });
};
module.exports = {
    kickHandler: kickHandler
};