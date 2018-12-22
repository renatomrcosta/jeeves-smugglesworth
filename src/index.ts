const mergeFunction = require('./handlers/merge');

const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4521;

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => res.send('Hello sir / madam!'));

app.route('/jeeves')
    .post((req, res) => {
        const payload = req.body;
        const challenge = payload.challenge;

        console.log(payload);

        if(payload.event.type === 'app_mention'){

            const request_text = payload.event.text.toUpperCase();
            switch (request_text) {
                case 'MERGE':
                    mergeFunction(payload);
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