const { RTMClient } = require('@slack/client');
const environments = require('./environments.ts');

const rtm = new RTMClient(environments.environment.bot_token);

rtm.start();

rtm.on("message", function(message) {
    if(message.text.toLowerCase().includes("merge")){
        rtm.sendMessage("Olha o merge aí negada, <@" + message.user + "> has something important to say!", message.channel);
    }
});