import { interval } from "rxjs";

import messageList from "../messages.json";
import messageService from "../services/messages.service";
import queueService from "../services/queue.service";

const warningInterval = interval(60000);

/***
 * The time warning event, requested in issue #30; Once every hour, it will query the top of the queues and send a
 * warning to whoever is in the queue more than 3h.
 * */
const handleEvent = () => {
    warningInterval.subscribe(() => {
        // Query the TOP of open queues
        queueService.
        // Send a warning per top queue that is more than 3h old.
    });
};

export default {
    handle: handleEvent,
};
