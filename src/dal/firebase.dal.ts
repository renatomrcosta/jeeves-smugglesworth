const admin = require('firebase-admin');
const firestore = admin.firestore();
firestore.settings({timestampsInSnapshots: true});

const add = (channel_id, user_id) => {
    return firestore.collection('queues').add({
        channel_id: channel_id,
        user_id: user_id,
        queue_timestamp: new Date()
    });
};

const getById = (channel_id) => {
    return firestore.collection('queues')
        .where('channel_id', '==', channel_id)
        .orderBy('queue_timestamp', 'asc')
        .get();
};

const update = (doc) => {
    return doc.ref.update({
        merged: true,
        dequeue_timestamp: new Date()
    });
};

const remove = (doc) => {
    return doc.ref.delete();
};

//Exports a 'service'-like object.
module.exports = {
    add: add,
    remove: remove,
    update: update,
    getById: getById
};
