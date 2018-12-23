const {messageService} = require("../services/messages.service");

const doneHandler = (payload) => {
    messageService.sendMessage(payload.event.channel, "User <@" + payload.event.user  + "> says done!")
};
module.exports = {
    doneHandler: doneHandler
};