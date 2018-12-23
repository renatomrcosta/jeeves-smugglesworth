const {WebClient} = require("@slack/client");

const token = process.env.SLACK_TOKEN || require('../slack.json').api_token;
const web = new WebClient(token);

//Service to handle senting messages to the users in slack;
const sendSlackMessage = (channel_id, message_text) => {
    web.chat.postMessage({
        channel: channel_id,
        text: message_text
    });
};

const sendSlackMessageByObject = (channel_id, messageObject) => {
    messageObject.channel = channel_id;
    web.chat.postMessage(messageObject);
};

const mentionSlackUser = (user_id) => {
    return '<@' + user_id + '>';
};

//Exports a 'service'-like object
module.exports = {
    messageService: {
        sendMessage: sendSlackMessage,
        sendSlackMessageByObject: sendSlackMessageByObject,
        mentionSlackUser: mentionSlackUser
    }
};