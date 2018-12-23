import  from '../services/messages.service';
import sendSlackMessage from "../services/messages.service";

let mergeFunction = (payload) => {
    sendSlackMessage(payload.event.channel, "User <@" + payload.event.user  + "> is ready to merge!")
};
export default mergeFunction;