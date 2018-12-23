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
            console.log("Evebt Complete: ", eventType);
        });
    });

const api = functions.https.onRequest(app);

module.exports = {
  app: app,
  jeeves: api
};