const {WebClient} = require("@slack/client");
const moment = require('moment');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

//Service to handle senting messages to the users in slack;
const sendSlackMessage = (channel_id, message_text) => {
    return web.chat.postMessage({
        channel: channel_id,
        text: message_text
    });
};

const sendSlackMessageByObject = (channel_id, messageObject) => {
    messageObject.channel = channel_id;
    return web.chat.postMessage(messageObject);
};

const mentionSlackUser = (user_id) => {
    return `<@${user_id}>`;
};

const printRelativeTime = (timestamp) => {
  return moment( timestamp.toDate()).fromNow();
};

//Exports a 'service'-like object
module.exports = {
    messageService: {
        sendMessage: sendSlackMessage,
        printRelativeTime: printRelativeTime,
        sendSlackMessageByObject: sendSlackMessageByObject,
        mentionSlackUser: mentionSlackUser
    }
};