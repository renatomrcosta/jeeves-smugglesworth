import express from "express";

import jeevesConfiguration from './config/jeeves.config';
jeevesConfiguration.config();

// import slackEventHandler from './handlers/slack_event.ts';
import landingPageHandler from './handlers/landing_page';
import keepAliveHandler from './handlers/keep_alive';

const port = Number(process.env.PORT) || 4521;
const host = process.env.HOST || '0.0.0.0';

const app = express();

app.use(express.json()); // for parsing application/json


app.route('/').get((req: express.Request, res: express.Response) => {
    landingPageHandler.handle(res, app);
});

app.route('/keep-alive').get((req: express.Request, res: express.Response) => {
    keepAliveHandler.handle(res);
});

app.route('/jeeves')
    .post((req: express.Request, res: express.Response) => {
        const payload: Payload = req.body;
        const challenge = payload.challenge;

        console.log(payload);

        //We must reply 200 in under 3s to Slack, and in case a random "challenge" is sent, it has to be delivered back
        //Event API thingie
        res.status(200).send({
            challenge: challenge
        });

        // //Handle the event in its own component.
        // slackEventHandler
        //     .handle(payload)
        //     .then((eventType) => {
        //         log("Event Complete: ", eventType);
        // }, (error) => {console.log(error)});
    });

app.listen(port, host, () => console.log(`Jeeves app Live on host ${host} on port ${port}!`));
