const admin = require('firebase-admin');
const firestore = admin.firestore();
firestore.settings({timestampsInSnapshots: true});

//Service that deals with the CRUD of the system: Adding items to the collection, removing them and querying them.

const addToQueue = (channel_id, user_id) => {
    firestore.collection('queues').add({
        channel_id: channel_id,
        user_id: user_id,
        queue_timestamp: new Date()
    });
};

const getQueueByChannelId = (channel_id) => {
    return firestore.collection('queues')
        .where('channel_id', '==', channel_id)
        .orderBy('queue_timestamp', 'asc')
        .get();
};

const deleteQueue = (doc) => {
    firestore.collection('queues')
        .doc(doc.ref)
        .delete();
};

//Exports a 'service'-like object.
module.exports = {
    queueService: {
        addToQueue: addToQueue,
        deleteQueue: deleteQueue,
        getQueueByChannelId: getQueueByChannelId
    }
};