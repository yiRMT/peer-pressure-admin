import { auth, db } from "@/firebase/server";

const listAllGroups = async () => {
  try {
    const groupCollectionRef = db.collection('groups');
    const snapshot = await groupCollectionRef.get();
    const groups = [];
    snapshot.forEach((doc) => {
      const docId = doc.id;
      groups.push({
        ...doc.data(),
        groupId: docId,
      });
    });
    return groups;
  } catch (error) {
    console.log('Error listing groups:', error);
  }
}

const handler = async (req, res) => {
  try {
    const country = req.body.country;
    const groups = await listAllGroups();
    res.status(200).json({
      groups: groups.filter(group => group.country === country),
    });
  } catch (error) {
    console.log('Error listing users:', error);
    res.status(500).json({ error });
  }
}

export default handler;