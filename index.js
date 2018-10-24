var RTMClient = require('@slack/client').RTMClient;
var rtm = new RTMClient('');
rtm.start();
rtm.on("message", function (message) {
    if (message.text.toLowerCase().includes("merge")) {
        rtm.sendMessage("Olha o merge aí negada, <@" + message.user + "> has something important to say!", message.channel);
    }
});
