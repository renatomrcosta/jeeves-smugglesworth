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

const isUserInQueue = (channel_id, user_id) => {
  return firestore.collection('queues')
      .where('channel_id', '==', channel_id)
      .where('user_id', '==', user_id)
      .get().then((docSnapshot) => {
          console.log(docSnapshot);
          return docSnapshot.exists;
      });
};

const getQueueByChannelId = (channel_id) => {
    return firestore.collection('queues')
        .where('channel_id', '==', channel_id)
        .orderBy('queue_timestamp', 'asc')
        .get();
};

module.exports = {
    queueService: {
        addToQueue: addToQueue,
        isUserInQueue: isUserInQueue,
        getQueueByChannelId: getQueueByChannelId
    }
};