import { db } from "@/firebase/server";

const handler = async (req, res) => {
  try {
    const expMode = req.body.expMode;
    console.log(expMode);

    const groupRef = db.collection('groups')
  } catch (error) {
    console.log('Error adding document: ', error);
    res.status(500).json({ error });
  }
}