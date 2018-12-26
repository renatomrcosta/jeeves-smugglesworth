const {messageService} = require("../services/messages.service.ts");
const messageList = require('../messages.json');

const helpHandler = (payload) => {
    messageService.sendSlackMessageByObject(payload.event.channel, messageList.help);
};
module.exports = {
    helpHandler: helpHandler
};