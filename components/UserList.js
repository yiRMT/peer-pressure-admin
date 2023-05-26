import { useEffect, useState } from "react";

export default function UserList(props) {
  const country = props.country;
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch('/api/listusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country: props.country }),
      });
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [country]);

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
              <th className="">Group</th>
            </tr>
          </thead>
          { users.length > 0 ? (
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.uid}>
                    <td className="text-center">
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
                    <td className="px-5">{user.groupId}</td>
                  </tr>
              )})}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="text-center" colSpan="5">No users found</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  )
}