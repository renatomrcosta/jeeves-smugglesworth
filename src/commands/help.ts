import messageService from '../services/messages.service';
const messageList = require('../messages.json');

const helpCommand = (payload: Payload) => {
    messageService.sendSlackMessageByObject(payload.event.channel, messageList.help);
};
export default {
    handle: helpCommand
};
