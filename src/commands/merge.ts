import messageList from "../messages.json";
import messageService from "../services/messages.service";
import queueService from "../services/queue.service";

const merge = (payload: IPayload) => {
    const channelId = payload.event.channel;
    const userId = payload.event.user;

    queueService.getById(channelId).then((channelSnapshot: any) => {
        if (channelSnapshot.empty) {
            messageService
                .sendMessage(channelId, messageList.firstInLine.replace("%s", messageService.mentionSlackUser(userId)));
        } else {
            messageService
                .sendMessage(channelId, messageList.waitForABit.replace("%s", messageService.mentionSlackUser(userId)));
        }
        queueService.add(channelId, userId);
    });
};

export default {
    handle: merge,
};
