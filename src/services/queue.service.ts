let dal: any;
if (process.env.FIREBASE) {
    dal = require("../dal/firebase.dal");
} else {
    // If data access layer is not truthy, then maybe load up something in memory later. For now, throw a console error.
    console.error("There's no Storage / DB configured");
}
// Service that deals with the CRUD of the system: Adding items to the collection, removing them and querying them.

const addToQueue = (channelId: string, userId: string) => {
    return dal.add(channelId, userId);
};

const getQueuesByChannelId = (channelId: string) => {
    return dal.getById(channelId);
};

// TODO - change this to use something more agnostic.
const updateQueue = (doc: any) => {
    return dal.update(doc);
};

const deleteQueue = (doc: any) => {
    return dal.remove(doc);
};

export default {
    add: addToQueue,
    getById: getQueuesByChannelId,
    remove: deleteQueue,
    update: updateQueue,
};
