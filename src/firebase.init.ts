const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const firebaseInit = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://jeeves-smugglesworth.firebaseio.com"
    });
    console.log('Firebase initialized successfully');
};

module.exports = firebaseInit;