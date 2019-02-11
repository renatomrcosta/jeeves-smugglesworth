import admin from "firebase-admin";

const initFirebase = () => {
    const serviceAccount = {
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : "",
        projectId: process.env.FIREBASE_PROJECT_ID,
    };

    // On startup, initializes the firebase config for the app
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://jeeves-smugglesworth.firebaseio.com",
    });
};

module.exports = {
    config: initFirebase,
};
