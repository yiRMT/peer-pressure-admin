import { auth, db, storage } from "@/firebase/server";

const handler = async (req, res) => {
  try {
    // Create user
    var userInfo = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      uid: req.body.uid,
    }

    // remove values if they are empty strings
    Object.keys(userInfo).forEach((key) => (userInfo[key] == "") && delete userInfo[key]);

    const country = req.body.country;
    const userRecord = await auth.createUser(userInfo);
    console.log('Successfully created new user:', userRecord.uid);

    // Create user document
    const docRef = await db.collection('users').doc(userRecord.uid).set({
      userinfo: {
        displayName: userRecord.displayName,
        email: userRecord.email,
        uid: userRecord.uid,
      },
      groupId: "",
      country: country,
      isProfileComplete: false,
    });
    console.log('Document written with ID: ', docRef.id);
    res.status(200).json({ userRecord })
  } catch (error) {
    console.log('Error creating new user:', error);
    res.status(500).json({ error });
  }
}

export default handler;