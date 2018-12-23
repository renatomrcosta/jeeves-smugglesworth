const admin = require('firebase-admin');
const firestore = admin.firestore();
firestore.settings({timestampsInSnapshots: true});

const addToQueue = (channel_id, user_id) => {

    console.log("adding to collection!");
    firestore.collection('queues').add({
        channel_id: channel_id,
        user_id: user_id,
        datetime: new Date()
    });
};

module.exports = {
    queueService: {
        addToQueue: addToQueue
    }
};