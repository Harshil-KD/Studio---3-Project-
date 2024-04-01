const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.checkUserExists = functions.https.onRequest(async (req, res) => {
  try {
    const email = req.query.email; // or get UID from request parameters

    // List all users
    const userList = await admin.auth().listUsers();

    // Check if the desired user exists
    const userExists = userList.users.some(user => user.email === email);

    // Return result to client
    res.status(200).json({ exists: userExists });
  } catch (error) {
    console.error('Error checking user existence:', error.message);
    res.status(500).json({ error: 'An error occurred while checking user existence' });
  }
});
