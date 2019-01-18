let dal;

if(process.env.FIREBASE){
    dal = require('../dal/firebase.dal.ts');
}

//If data access layer is not truthy, then maybe load up something in memory later. For now, throw a console error.
if(!dal){
    console.error("There's no Storage / DB configured");
}
//Service that deals with the CRUD of the system: Adding items to the collection, removing them and querying them.

const addToQueue = (channel_id, user_id) => {
    return dal.add(channel_id, user_id);
};

const getQueueByChannelId = (channel_id) => {
    return dal.getById(channel_id);
};

const updateQueue = (doc) => {
    return dal.update(doc);
};

const deleteQueue = (doc) => {
    return dal.remove(doc);
};

//Exports a 'service'-like object.
module.exports = {
    queueService: {
        add: addToQueue,
        remove: deleteQueue,
        update: updateQueue,
        getById: getQueueByChannelId
    }
};
