import Promise from "promise";

import doneCommand from "../commands/done";
import helpCommand from "../commands/help";
import mergeCommand from "../commands/merge";
import statusCommand from "../commands/status";

const handleEvent = (payload: IPayload) => {
    // Calling the event as a promise to return asap.
    return new Promise((resolve, reject) => {
        if (payload.event && payload.event.type === "app_mention") {
            // Check which event, in order or importance
            const requestText = payload.event.text.toUpperCase();
            if (requestText.includes("MERGE")) {
                mergeCommand.handle(payload);
                resolve("MERGE");
            } else if (requestText.includes("DONE")) {
                doneCommand.handle(payload, "DONE");
                resolve("DONE");
            } else if (requestText.includes("KICK")) {
                doneCommand.handle(payload, "KICK");
                resolve("KICK");
            } else if (requestText.includes("STATUS")) {
                statusCommand.handle(payload);
                resolve("STATUS");
            }  else if (requestText.includes("HELP")) {
                helpCommand.handle(payload);
                resolve("HELP");
            }
            reject();
        }
    });
};

export default {
    handle: handleEvent,
};
