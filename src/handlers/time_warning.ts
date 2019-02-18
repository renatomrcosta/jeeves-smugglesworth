import messageList from "../messages.json";
import messageService from "../services/messages.service";
import queueService from "../services/queue.service";

import {interval} from "rxjs";

// Three hour warning threshold, initially.
const WARNING_HOUR_THRESHOLD = 3;
/***
 * The time warning event, requested in issue #30; Once every hour, it will query the top of the queues and send a
 * warning to whoever is in the queue more than 3h.
 * */
const handleEvent = () => {
    console.log("Configured the time warning with the following Hour Threshold", WARNING_HOUR_THRESHOLD);

    const warningInterval = interval(15 * 1000);
    warningInterval.subscribe(() => {
        queueService
            .getQueuesByHour(WARNING_HOUR_THRESHOLD)
            .then( (channelSnapshot: any) => {
                if(!channelSnapshot.empty) {
                    channelSnapshot.docs
                        .map( (documentSnapshot: any) => {
                            return {
                                channel_id: documentSnapshot.get("channel_id"),
                                user_id: documentSnapshot.get("user_id"),
                            };
                        })
                        .forEach( (queue: IQueue) => {
                            messageService.sendMessage(queue.channel_id,
                                messageList.timeoutWarning
                                    .replace("%s", messageService.mentionSlackUser(queue.user_id)));
                    });
                }
            });
    });
};

export default {
    handle: handleEvent,
};
