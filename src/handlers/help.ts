const {messageService} = require("../services/messages.service");

const helpHandler = (payload) => {
    messageService.sendMessage(payload.event.channel, "User <@" + payload.event.user  + "> says Help!")
};
module.exports = {
    helpHandler: helpHandler
};