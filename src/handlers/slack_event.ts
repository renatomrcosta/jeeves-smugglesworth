import Promise from 'promise';

import mergeCommand from "../commands/merge";
import doneCommand from "../commands/done";
import statusCommand from "../commands/status";
import helpCommand from "../commands/help";

const handleEvent = (payload: Payload) => {
    //Calling the event as a promise to return asap.
    return new Promise((resolve, reject) => {
        if(payload.event && payload.event.type === 'app_mention'){
            //Check which event, in order or importance
            const request_text = payload.event.text.toUpperCase();
            if(request_text.includes('MERGE')){
                mergeCommand.handle(payload);
                resolve("MERGE");
            } else if(request_text.includes('DONE')){
                doneCommand.handle(payload, 'DONE');
                resolve("DONE");
            } else if(request_text.includes('KICK')){
                doneCommand.handle(payload, 'KICK');
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
