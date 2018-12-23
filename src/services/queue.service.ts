const admin = require('firebase-admin');
const firestore = admin.firestore();
firestore.settings({timestampsInSnapshots: true});

const addToQueue = (channel_id, user_id) => {

    console.log("adding to collection!");
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

module.exports = {
    queueService: {
        addToQueue: addToQueue,
        deleteQueue: deleteQueue,
        getQueueByChannelId: getQueueByChannelId
    }
};