import { WebClient } from "@slack/client";
import moment from "moment";

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

// Service to handle senting messages to the users in slack;
const sendMessage = (channelId: string, messageText: string) => {
    return web.chat.postMessage({
        channel: channelId,
        text: messageText,
    });
};

const sendSlackMessageByObject = (channelId: string, messageObject: any) => {
    messageObject.channel = channelId;
    return web.chat.postMessage(messageObject);
};

const mentionSlackUser = (userId: string) => {
    return `<@${userId}>`;
};

// TODO - move this away to a firebase importer helper, to properly type it.
const printRelativeTime = (timestamp: any) => {
  return moment( timestamp.toDate()).fromNow();
};

// Exports a 'service'-like object
export default {
    mentionSlackUser,
    printRelativeTime,
    sendMessage,
    sendSlackMessageByObject,
};
