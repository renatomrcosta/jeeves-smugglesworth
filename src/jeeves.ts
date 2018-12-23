const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require('promise');

const firebaseInit = require('./firebase.init');
const {mergeHandler} = require("./handlers/merge");
const {doneHandler} = require("./handlers/done");
const {statusHandler} = require("./handlers/status");
const {helpHandler} = require("./handlers/help");
const {kickHandler} = require("./handlers/kick");

const app = express();
app.use(bodyParser.json()); // for parsing application/json

firebaseInit();

app.route('*')
    .post((req, res) => {
        const payload = req.body;
        const challenge = payload.challenge;

        res.status(200).send({
            challenge: challenge
        });

        new Promise((resolve, reject) => {
            if(payload.event && payload.event.type === 'app_mention'){
                const request_text = payload.event.text.toUpperCase();
                if(request_text.includes('MERGE')){
                    mergeHandler(payload);
                } else if(request_text.includes('KICK')){
                    kickHandler(payload);
                } else if(request_text.includes('STATUS')){
                    statusHandler(payload);
                } else if(request_text.includes('DONE')){
                    doneHandler(payload);
                } else if(request_text.includes('HELP')){
                    helpHandler(payload);
                } else {
                    reject();
                }
                resolve();
            }
        }).then(() => {
            console.log("EventType complete", payload.event.type);
        });
    });

const api = functions.https.onRequest(app);

module.exports = {
  app: app,
  jeeves: api
};

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