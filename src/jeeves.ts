const express = require("express");
const path = require("path");
const log = require('debug')('app:log');

const jeevesConfiguration = require('./config/jeeves.config.ts');
jeevesConfiguration.config();

const slackEventHandler = require('./handlers/slack_event.ts');
const landingPageHandler = require('./handlers/landing_page.ts');
const keepAliveHandler = require('./handlers/keep_alive.ts');

const port = process.env.PORT || 4521;
const host = process.env.HOST || '0.0.0.0';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname,'..','landing-page/public')));

app.route('/').get((req, res) => {
    landingPageHandler.handle(res);
});

app.route('/keep-alive').get((req, res) => {
    keepAliveHandler.handle(res);
});

app.route('/jeeves')
    .post((req, res) => {
        const payload = req.body;
        const challenge = payload.challenge;

        //We must reply 200 in under 3s to Slack, and in case a random "challenge" is sent, it has to be delivered back
        //Event API thingie
        res.status(200).send({
            challenge: challenge
        });

        //Handle the event in its own component.
        slackEventHandler
            .handle(payload)
            .then((eventType) => {
            log("Event Complete: ", eventType);
        });
    });

app.listen(port, host, () => log(`Jeeves app Live on host ${host} on port ${port}!`));
