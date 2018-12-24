const admin = require("firebase-admin");

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
};

console.log(serviceAccount);

//On startup, initializes the firebase config for the app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jeeves-smugglesworth.firebaseio.com",
    timestampsInSnapshots: true
});