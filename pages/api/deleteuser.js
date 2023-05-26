import { auth } from "@/firebase/server";

const handler = async (req, res) => {
  try {
    const deleteUsersResult = await auth.deleteUsers(req.body.users);
    console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
    res.status(200).json({ deleteUsersResult })
  } catch (error) {
    console.log('Error deleting user:', error);
    res.status(500).json({ error });
  }
}

export default handler;