const {messageService} = require("../services/messages.service");

const merge = (payload) => {
    messageService.sendMessage(payload.event.channel, "User <@" + payload.event.user  + "> is ready to merge!")
};
module.exports = {
    mergeHandler: merge
};