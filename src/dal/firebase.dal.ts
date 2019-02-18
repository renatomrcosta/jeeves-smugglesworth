import admin from "firebase-admin";
const firestore: admin.firestore.Firestore = admin.firestore();
firestore.settings({timestampsInSnapshots: true});

const add = (channelId: string, userId: string) => {
    return firestore.collection("queues").add({
        channel_id: channelId,
        queue_timestamp: new Date(),
        user_id: userId,
    });
};

const getById = (channelId: string) => {
    return firestore.collection("queues")
        .where("channel_id", "==", channelId)
        .orderBy("queue_timestamp", "asc")
        .get();
};

const getAll = () => {
    return firestore.collection("queues")
        .orderBy("channel_id", "asc")
        .orderBy("queue_timestamp", "asc")
        .get();
};

const update = (doc: admin.firestore.DocumentSnapshot) => {
    return doc.ref.update({
        dequeue_timestamp: new Date(),
        merged: true,
    });
};

const remove = (doc: admin.firestore.DocumentSnapshot) => {
    return doc.ref.delete();
};

module.exports = {
    add,
    getAll,
    getById,
    remove,
    update,
};
