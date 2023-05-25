import { useEffect, useState } from "react";

export default function UserList(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('/api/listusers');
        const data = await response.json();
        setUsers(data.listUsersResult.users);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  const handleSelection = (newArray) => {
    props.handleSelection(newArray);
  }

  return (
    <>
      <div>
        <table className="table-auto border-collapse border border-slate-400">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="">Select</th>
              <th className="">UID</th>
              <th className="">Email</th>
              <th className="">Display Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>
                  <input 
                    type="checkbox"
                    onChange={(e) => {
                      const val = e.currentTarget.checked;
                      if (val) {
                        handleSelection((props) => [...props, user]);
                      } else {
                        handleSelection((props) => props.filter((item) => item.uid !== user.uid));
                      }
                    }}
                  />
                </td>
                <td className="px-5">{user.uid}</td>
                <td className="px-5">{user.email}</td>
                <td className="px-5">{user.displayName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}