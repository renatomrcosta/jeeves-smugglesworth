import Promise from 'promise';

// const {mergeHandler} = require("../commands/merge.ts");
// const {doneHandler} = require("../commands/done.ts");
import statusCommand from "../commands/status";
import helpCommand from "../commands/help";

const handleEvent = (payload: Payload) => {
    //Calling the event as a promise to return asap.
    return new Promise((resolve, reject) => {
        if(payload.event && payload.event.type === 'app_mention'){
            //Check which event, in order or importance
            const request_text = payload.event.text.toUpperCase();
            if(request_text.includes('MERGE')){
                // mergeHandler(payload);
                resolve("MERGE");
            } else if(request_text.includes('DONE')){
                // doneHandler(payload, 'DONE');
                resolve("DONE");
            } else if(request_text.includes('KICK')){
                // doneHandler(payload, 'KICK');
                resolve("KICK");
            } else if(request_text.includes('STATUS')){
                statusCommand.handle(payload);
                resolve("STATUS");
            }  else if(request_text.includes('HELP')) {
                helpCommand.handle(payload);
                resolve("HELP");
            }
            reject();
        }
    });
};

export default {
    handle: handleEvent
};
