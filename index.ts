const { RTMClient } = require('@slack/client');

const rtm = new RTMClient('');

rtm.start();

rtm.on("message", function(message) {
    if(message.text.toLowerCase().includes("merge")){
        rtm.sendMessage("Olha o merge aí negada, <@" + message.user + "> has something important to say!", message.channel);
    }
});