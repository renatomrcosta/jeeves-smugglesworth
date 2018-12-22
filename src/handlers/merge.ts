import sendSlackMessage from '../services/messages.service';

let mergeFunction = (payload) => {
    console.log('Im merging yo');
    sendSlackMessage(payload.event.channel, "User <@" + payload.event.user  + "> is ready to merge!")
};
export default mergeFunction;