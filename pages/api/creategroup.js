import { db } from "@/firebase/server";

const handler = async (req, res) => {
  try {
    // name = user.displayName
    /* 
      names = {
        uid: name
      }
    */
    const names = req.body.users.reduce((acc, user) => {
      console.log(acc, user)
      acc[user.uid] = user.displayName;
      return acc;
    }, {});

    const groupRef = await db.collection('groups').doc(req.body.groupName).set({
      score: {},
      names: names,
      token: {},
    });

    console.log('Document written with ID: ', groupRef.id);

    // Edit user document to add groupId
    const userPromises = req.body.users.map(async (user) => {
      const userRef = await db.collection('users').doc(user.uid).update({
        groupId: req.body.groupName,
      });
      console.log('Document written with ID: ', userRef.id);
    });

    await Promise.all(userPromises);
    
    res.status(200).json({ docRef: groupRef });
  } catch (error) {
    console.log('Error adding document: ', error);
    res.status(500).json({ error });
  }
}

export default handler;