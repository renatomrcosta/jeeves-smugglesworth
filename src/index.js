"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var merge_1 = require("./handlers/merge");
var app = express_1.default();
var port = process.env.PORT || 4521;
app.use(body_parser_1.default.json()); // for parsing application/json
app.get('/', function (req, res) { return res.send('Hello sir / madam!'); });
app.route('/jeeves')
    .post(function (req, res) {
    var payload = req.body;
    var challenge = payload.challenge;
    console.log(payload);
    if (payload.event.type === 'app_mention') {
        var request_text = payload.event.text.toUpperCase();
        switch (request_text) {
            case 'MERGE':
                merge_1.default(payload);
                break;
            case 'STATUS':
                break;
            case 'DONE':
                break;
            case 'HELP':
                break;
        }
    }
    res.status(200).send({
        challenge: challenge
    });
});
app.listen(port, function () { return console.log("Jeeves app Live on port " + port + "!"); });
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
