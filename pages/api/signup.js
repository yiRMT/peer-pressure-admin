import { auth } from "@/firebase/server";

const handler = async (req, res) => {
  try {
    const userRecord = await auth.createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.name,
    });
    console.log('Successfully created new user:', userRecord.uid);
    res.status(200).json({ userRecord })
  } catch (error) {
    console.log('Error creating new user:', error);
    res.status(500).json({ error });
  }
}

export default handler;