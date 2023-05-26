import { auth, db } from "@/firebase/server";

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

const listCountryAndGroupId = async (uid) => {
  try {
    const userRef = await db.collection('users').doc(uid).get();
    if (!userRef.exists) {
      console.log('No such document!');
      return;
    }
    const user = userRef.data();
    return {
      groupId: user.groupId,
      country: user.country,
    };
  } catch (error) {
    console.log('Error listing users:', error);
  }
}

const handler = async (req, res) => {
  try {
    const country = req.body.country;
    const listUsersResult = await listAllUsers();
    const users = listUsersResult.users;
    var usersWithGroupId = await Promise.all(users.map(async (user) => {
      const storedCountryAndGroupId = await listCountryAndGroupId(user.uid);
      
      if (storedCountryAndGroupId.country !== country) {
        return;
      }

      if (storedCountryAndGroupId.groupId === undefined) {
        return {
          ...user,
          groupId: "",
        };
      }
      
      return {
        ...user,
        groupId: storedCountryAndGroupId.groupId,
      }
    }));
    // remove undefined values
    usersWithGroupId = usersWithGroupId.filter((user) => user !== undefined);
    
    console.log(usersWithGroupId);
    res.status(200).json({
      users: usersWithGroupId,
    });
  } catch (error) {
    console.log('Error listing users:', error);
    res.status(500).json({ error });
  }
}

export default handler;