const {messageService} = require("../services/messages.service");
const {queueService} = require('../services/queue.service');

const merge = (payload) => {
    const channel = payload.event.channel;
    const user = payload.event.user;

    queueService.addToQueue(channel, user);
    messageService.sendMessage(channel, "User <@" + user  + "> is ready to merge!")
};
module.exports = {
    mergeHandler: merge
};