import { auth } from "@/firebase/server";

const listAllUsers = async (nextPageToken) => {
  try {
    // List batch of users, 1000 at a time.
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    /*listUsersResult.users.forEach((userRecord) => {
      console.log('user', userRecord.toJSON());
    });*/
    if (listUsersResult.pageToken) {
      // List next batch of users.
      listAllUsers(listUsersResult.pageToken)
    }
    return listUsersResult;
  } catch (error) {
    console.log('Error listing users:', error);
  }
}

const handler = async (req, res) => {
  try {
    const listUsersResult = await listAllUsers();
    res.status(200).json({ listUsersResult });
  } catch (error) {
    console.log('Error listing users:', error);
    res.status(500).json({ error });
  }
}

export default handler;