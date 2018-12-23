const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

//On startup, initializes the firebase config for the app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jeeves-smugglesworth.firebaseio.com",
    timestampsInSnapshots: true
});