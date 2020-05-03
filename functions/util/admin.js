const admin = require("firebase-admin");
var serviceAccount = require("/Users/Yves/organizexpense-firebase-adminsdk-8fzba-3713d90401.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://organizexpense.firebaseio.com",
});
const db = admin.firestore();

module.exports = { admin, db };
