const { RTMClient } = require('@slack/client');
const serviceAccountKey = require('./serviceAccountKey.json');
const firebase = require('firebase');
const slackConf = require(';/slack.json');


const rtm = new RTMClient(slackConf.api_token);
const firebaseApp = firebase.initializeApp(serviceAccountKey);
const db = firebaseApp.firestore();

rtm.start();

rtm.on("message", function(message) {
    if(message.text.toLowerCase().includes("merge")){
        db.collection(`merge`).add({
            text: message.text,
            msg: message
        });
        rtm.sendMessage("Olha o merge aí negada, <@" + message.user + "> has something important to say!", message.channel);
    }
});