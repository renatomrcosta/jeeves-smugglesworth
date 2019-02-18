import messageList from "../messages.json";
import messageService from "../services/messages.service";
import queueService from "../services/queue.service";

import {interval} from "rxjs";

// Three hour warning threshold, initially.
const WARNING_THRESHOLD = 60 * 1000;


/***
 * The time warning event, requested in issue #30; Once every hour, it will query the top of the queues and send a
 * warning to whoever is in the queue more than 3h.
 * */
const handleEvent = () => {
    console.log("Configured the time warning with the following Threshold", WARNING_THRESHOLD);

    const warningInterval = interval(60000);
    warningInterval.subscribe(() => {
        // Query the open queues

        const dateThreshold = Date.now() - WARNING_THRESHOLD;
        // Send a warning per top queue that is more than 3h old.
        queueService
            .getQueues()
            .filter( (queue: IQueue)  => +queue.queue_timestamp < dateThreshold)
            .forEach( (queue: IQueue) => {
                messageService.sendMessage(queue.channel_id,
                    messageList.timeoutWarning.replace("%s", messageService.mentionSlackUser(queue.user_id)));
            });
    });
};

export default {
    handle: handleEvent,
};
