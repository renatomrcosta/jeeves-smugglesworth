const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jeeves-smugglesworth.firebaseio.com",
    timestampsInSnapshots: true
});