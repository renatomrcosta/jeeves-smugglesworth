import {WebClient} from "@slack/client";

import {slackProps} from "../slack.json";

const token = process.env.SLACK_TOKEN || slackProps.api_token;
const web = new WebClient(token);

let sendSlackMessage = (channel_id, message_text) => {
    console.log('hey, im in the message thingie', channel_id, message_text);

    web.chat.postMessage({
        channel: channel_id,
        text: message_text
    });
};

export default sendSlackMessage;