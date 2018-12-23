const {messageService} = require("../services/messages.service");

const kickHandler = (payload) => {
    messageService.sendMessage(payload.event.channel, "User <@" + payload.event.user  + "> says Kick!")
};
module.exports = {
    kickHandler: kickHandler
};