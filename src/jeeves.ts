const config = require('./config/jeeves.config.ts')();
const path = require("path");

const log = require('debug')('app:log');

const express = require("express");
const Promise = require('promise');


const {mergeHandler} = require("./commands/merge.ts");
const {doneHandler} = require("./commands/done.ts");
const {statusHandler} = require("./commands/status.ts");
const {helpHandler} = require("./commands/help.ts");

const port = process.env.PORT || 4521;
const host = process.env.HOST || '0.0.0.0';

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname,'..','landing-page/public')));

app.route('/').get((req, res) => {
    log('hello');
    log(path.join(__dirname,'..','landing-page/index.html'));
    res.status(200).sendFile(path.join(__dirname,'..','landing-page/index.html'))
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

        //Calling the event as a promise to return asap.
        new Promise((resolve, reject) => {
            if(payload.event && payload.event.type === 'app_mention'){
                //Check which event, in order or importance
                const request_text = payload.event.text.toUpperCase();
                if(request_text.includes('MERGE')){
                    mergeHandler(payload);
                    resolve("MERGE");
                } else if(request_text.includes('DONE')){
                    doneHandler(payload, 'DONE');
                    resolve("DONE");
                } else if(request_text.includes('KICK')){
                    doneHandler(payload, 'KICK');
                    resolve("KICK");
                } else if(request_text.includes('STATUS')){
                    statusHandler(payload);
                    resolve("STATUS");
                }  else if(request_text.includes('HELP')) {
                    helpHandler(payload);
                    resolve("HELP");
                }
                reject();
            }
        }).then((eventType) => {
            log("Event Complete: ", eventType);
        });
    });

app.listen(port, host, () => log(`Jeeves app Live on host ${host} on port ${port}!`));
