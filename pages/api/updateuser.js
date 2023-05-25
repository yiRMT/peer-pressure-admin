import { auth } from "@/firebase/server";

const handler = async (req, res) => {
  try {
    const userRecord = await auth.updateUser(req.body.uid, {
      email: req.body.email,
      displayName: req.body.name,
      password: req.body.password,
    });
    console.log('Successfully updated user:', userRecord.uid);
    res.status(200).json({ userRecord })
  } catch (error) {
    console.log('Error updating user:', error);
    res.status(500).json({ error });
  }
}

export default handler;