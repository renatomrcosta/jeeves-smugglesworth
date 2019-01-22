import messageList from "../messages.json";
import messageService from "../services/messages.service";

const helpCommand = (payload: IPayload) => {
    messageService.sendSlackMessageByObject(payload.event.channel, messageList.help);
};
export default {
    handle: helpCommand,
};
