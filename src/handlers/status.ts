const {messageService} = require("../services/messages.service");

const statusHandler = (payload) => {
    messageService.sendMessage(payload.event.channel, "User <@" + payload.event.user  + "> says status!")
};
module.exports = {
    statusHandler: statusHandler
};