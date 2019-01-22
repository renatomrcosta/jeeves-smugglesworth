import messageService from '../services/messages.service';
import messageList from '../messages.json';

const helpCommand = (payload: Payload) => {
    messageService.sendSlackMessageByObject(payload.event.channel, messageList.help);
};
export default {
    handle: helpCommand
};
