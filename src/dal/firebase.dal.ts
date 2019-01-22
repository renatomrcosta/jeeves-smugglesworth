import admin from 'firebase-admin';
const firestore: admin.firestore.Firestore = admin.firestore();
firestore.settings({timestampsInSnapshots: true});

const add = (channel_id: string, user_id: string) => {
    return firestore.collection('queues').add({
        channel_id: channel_id,
        user_id: user_id,
        queue_timestamp: new Date()
    });
};

const getById = (channel_id: string) => {
    return firestore.collection('queues')
        .where('channel_id', '==', channel_id)
        .orderBy('queue_timestamp', 'asc')
        .get();
};

const update = (doc: admin.firestore.DocumentSnapshot) => {
    return doc.ref.update({
        merged: true,
        dequeue_timestamp: new Date()
    });
};

const remove = (doc: admin.firestore.DocumentSnapshot) => {
    return doc.ref.delete();
};

module.exports = {
    add: add,
    remove: remove,
    update: update,
    getById: getById
};
