var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4521;
var token = process.env.SLACK_TOKEN || require('./slack.json').api_token;
var WebClient = require('@slack/client').WebClient;
var web = new WebClient(token);
app.use(bodyParser.json()); // for parsing application/json
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.route('/jeeves')
    .post(function (req, res) {
    var payload = req.body;
    var challenge = payload.challenge;
    console.log(payload);
    if (payload.event.type === 'app_mention') {
        if (payload.event.text.includes('merge')) {
            web.chat.postMessage({
                channel: payload.event.channel,
                text: 'Auei! User <@' + payload.event.user + '> has queued up!'
            });
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
