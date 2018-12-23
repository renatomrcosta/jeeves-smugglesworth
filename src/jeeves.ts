import express from "express";
import bodyParser from "body-parser";

import mergeFunction from "./handlers/merge";

const app = express();
const port = process.env.PORT || 4521;

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => res.send('Hello sir / madam!'));

app.route('/jeeves')
    .post((req, res) => {
        const payload = req.body;
        const challenge = payload.challenge;
        if(payload.event.type === 'app_mention'){
            const request_text = payload.event.text.toUpperCase();
            if(request_text.includes('MERGE')){
                mergeFunction(payload);
            } else if(request_text.includes('STATUS')){
                console.log('Status');
            } else if(request_text.includes('DONE')){
                console.log('Done');
            } else if(request_text.includes('HELP')){
                console.log('Help');
            }
        }

        res.status(200).send({
            challenge: challenge
        });
    });

app.listen(port, () => console.log(`Jeeves app Live on port ${port}!`));

// const { RTMClient } = require('@slack/client');
// const {chat} = require('@slack/client');
// const serviceAccountKey = require('./serviceAccountKey.json');
// const firebase = require('firebase');
// const slackConf = require(';/slack.json');
//
//
// const rtm = new RTMClient(slackConf.api_token);
// const firebaseApp = firebase.initializeApp(serviceAccountKey);
// const db = firebaseApp.firestore();
//
// rtm.start();
//
// rtm.on("message", function(message) {
//     if(message.text.toLowerCase().includes("merge")){
//         db.collection(`merge`).add({
//             text: message.text,
//             msg: message
//         });
//         rtm.sendMessage("Olha o merge aí negada, <@" + message.user + "> has something important to say!", message.channel);
//     }
// });