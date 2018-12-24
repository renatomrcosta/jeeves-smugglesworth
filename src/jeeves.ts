if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require('promise');

require('./firebase.init');

const {mergeHandler} = require("./handlers/merge");
const {doneHandler} = require("./handlers/done");
const {statusHandler} = require("./handlers/status");
const {helpHandler} = require("./handlers/help");

const app = express();
app.use(bodyParser.json()); // for parsing application/json

//Registers a global route that will be exposed in Cloud Functions
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
            console.log("Event Complete: ", eventType);
        });
    });

//This is where the export to Cloud functions happens. Also packages the app variable to be started by jeeves.local.ts
const api = functions.https.onRequest(app);

module.exports = {
  app: app,
  jeeves: api
};