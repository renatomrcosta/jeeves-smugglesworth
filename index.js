var RTMClient = require('@slack/client').RTMClient;
var serviceAccountKey = require('./serviceAccountKey.json');
var firebase = require('firebase');
var slackConf = require(';/slack.json');
var rtm = new RTMClient(slackConf.api_token);
var firebaseApp = firebase.initializeApp(serviceAccountKey);
var db = firebaseApp.firestore();
rtm.start();
rtm.on("message", function (message) {
    if (message.text.toLowerCase().includes("merge")) {
        db.collection("merge").add({
            text: message.text,
            msg: message
        });
        rtm.sendMessage("Olha o merge aí negada, <@" + message.user + "> has something important to say!", message.channel);
    }
});
