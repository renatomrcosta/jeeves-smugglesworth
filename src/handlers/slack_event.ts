const Promise = require('promise');

const {mergeHandler} = require("../commands/merge.ts");
const {doneHandler} = require(".,/commands/done.ts");
const {statusHandler} = require(",./commands/status.ts");
const {helpHandler} = require("../commands/help.ts");

const handleEvent = (payload) => {
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
    });
};

module.exports = {
    handle: handleEvent
};
