import { WebClient } from "@slack/client";
import moment from 'moment';

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

//Service to handle senting messages to the users in slack;
const sendSlackMessage = (channel_id: string, message_text: string) => {
    return web.chat.postMessage({
        channel: channel_id,
        text: message_text
    });
};

const sendSlackMessageByObject = (channel_id: string, messageObject: any) => {
    messageObject.channel = channel_id;
    return web.chat.postMessage(messageObject);
};

const mentionSlackUser = (user_id: string) => {
    return `<@${user_id}>`;
};

//TODO - move this away to a firebase importer helper, to properly type it.
const printRelativeTime = (timestamp: any) => {
  return moment( timestamp.toDate()).fromNow();
};

//Exports a 'service'-like object
export default {
    sendMessage: sendSlackMessage,
    printRelativeTime: printRelativeTime,
    sendSlackMessageByObject: sendSlackMessageByObject,
    mentionSlackUser: mentionSlackUser
};
