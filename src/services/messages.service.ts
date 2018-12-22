const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN || require('../slack.json').api_token;
const web = new WebClient(token);

let sendSlackMessage = (channel_id: string, message_text: string) => {
    web.chat.postMessage({
        channel: channel_id,
        text: message_text
    });
};

export default sendSlackMessage;