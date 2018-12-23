const {messageService} = require("../services/messages.service");
const {queueService} = require('../services/queue.service');
const messageList = require('../messages.json');

const merge = (payload) => {
    const channel_id = payload.event.channel;
    const user_id = payload.event.user;

    queueService.getQueueByChannelId(channel_id).then((channelSnapshot) => {
        if(channelSnapshot.empty){
            messageService.sendMessage(channel_id, messageList.firstInLine.replace("%s", messageService.mentionSlackUser(user_id)));
        } else {
            messageService.sendMessage(channel_id, messageList.waitForABit.replace("%s",messageService.mentionSlackUser(user_id)));
        }
        queueService.addToQueue(channel_id, user_id);
    });
};



module.exports = {
    mergeHandler: merge
};