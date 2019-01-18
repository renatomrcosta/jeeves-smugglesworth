const admin = require("firebase-admin");

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') // Used to avoid parsing errors
};

const initFirebase = () => {
    //On startup, initializes the firebase config for the app
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://jeeves-smugglesworth.firebaseio.com"
    });
};

module.exports = {
    config: initFirebase
};
