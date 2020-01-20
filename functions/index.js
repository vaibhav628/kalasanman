const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();

exports.lastUpdate = functions.database
  .ref("/kalasanman/news/{newsId}")
  .onUpdate(async (change, context) => {

    console.log("inside function lastUpdate");
    console.log("Data: ", change.after.val());
    const msg = change.after.val();
    const now = new Date().getTime();

    if (msg.lastUpdated > now - (30 * 1000)) {
      return;
    }
    // Notification content
    const payload = {
      notification: {
        title: 'New Event',
        body: msg.Headline + '\n' + msg.Synopsis,
        //icon: 'https://goo.gl/Fz9nrQ',
        //click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/newsfeed`,
      }
    }
    //console.log ("payload:" + payload);

    // Get the list of device tokens.
    const allTokens = await admin.firestore().collection('devices').get();

    const tokens = [];
    allTokens.forEach((tokenDoc) => {
      let field = tokenDoc.get('token');
      console.log("token:" + field);
      tokens.push(field);
    });
    if (tokens.length > 0) {
      // Send notifications to all tokens.
      const response = await admin.messaging().sendToDevice(tokens, payload);
      await cleanupTokens(response, tokens);
      console.log('Notifications have been sent and tokens cleaned up.');
    }
  });

// Sends a notifications to all users when a new message is posted.
exports.sendNotifications = functions.database
  .ref("/kalasanman/news/{newsId}").onCreate(
    async (snapshot, context) => {
      // Notification details.
      const msg = snapshot.val();
      const payload = {
        notification: {
          title: 'New Event',
          body: msg.Headline + '\n' + msg.Synopsis,
          //icon: 'https://goo.gl/Fz9nrQ',
          //click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/newsfeed`,
        }
      };

      // Get the list of device tokens.
      const allTokens = await admin.firestore().collection('devices').get();
      const tokens = [];
      allTokens.forEach((tokenDoc) => {
        let field = tokenDoc.get('token');
        console.log("token:" + field);
        tokens.push(field);
      });

      if (tokens.length > 0) {
        // Send notifications to all tokens.
        const response = await admin.messaging().sendToDevice(tokens, payload);
        await cleanupTokens(response, tokens);
        console.log('Notifications have been sent and tokens cleaned up.');
      }
    });

// Cleans up the tokens that are no longer valid.
function cleanupTokens(response, tokens) {
  // For each notification we check if there was an error.
  const tokensDelete = [];
  response.results.forEach((result, index) => {
    const error = result.error;
    if (error) {
      console.error('Failure sending notification to', tokens[index], error);
      // Cleanup the tokens who are not registered anymore.
      if (error.code === 'messaging/invalid-registration-token' ||
        error.code === 'messaging/registration-token-not-registered') {
        console.log('deleteting device with token:' + tokens[index]);
        const deleteTask = admin.firestore().collection('devices').doc(tokens[index]).delete();
        tokensDelete.push(deleteTask);
      }
    }
  });
  return Promise.all(tokensDelete);
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
