import messageService from '../services/messages.service';
import messageList from '../messages.json';
import queueService from '../services/queue.service';

const merge = (payload: IPayload) => {
    const channel_id = payload.event.channel;
    const user_id = payload.event.user;

    queueService.getById(channel_id).then((channelSnapshot: any) => {
        if(channelSnapshot.empty){
            messageService.sendMessage(channel_id, messageList.firstInLine.replace("%s", messageService.mentionSlackUser(user_id)));
        } else {
            messageService.sendMessage(channel_id, messageList.waitForABit.replace("%s",messageService.mentionSlackUser(user_id)));
        }
        queueService.add(channel_id, user_id);
    });
};

export default {
    handle: merge
};
