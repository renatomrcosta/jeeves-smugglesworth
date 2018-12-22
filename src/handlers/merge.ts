const sendSlackMessage = require('../services/messages.service');

let mergeFunction = (payload) => {
    console.log(payload);
    sendSlackMessage(payload.event.channel, "User <@" + payload.event.user  + "> is ready to merge!")
};
export default mergeFunction;