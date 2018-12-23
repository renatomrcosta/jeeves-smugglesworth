const admin = require('firebase-admin');

const addToQueue = (channel_id, message_text) => {
    const firestore = admin.firestore();

    console.log("adding to collection!");
    firestore.collection('channeltst').add({
        channel: channel_id,
        messageText: message_text
    });
};

module.exports = {
    queueService: {
        addToQueue: addToQueue
    }
};