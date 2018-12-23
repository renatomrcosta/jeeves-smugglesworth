const {messageService} = require("../services/messages.service");
const messageList = require('../messages.json');

const helpHandler = (payload) => {
    messageService.sendMessage(payload.event.channel, messageList.help);
};
module.exports = {
    helpHandler: helpHandler
};