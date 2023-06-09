import { ArrowDropDown, MoreVert, PersonRemove, ModeEdit } from "@mui/icons-material";
import { Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

export default function UserList(props) {
  const country = props.country;
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    if (event.currentTarget) {
      handleSelection((props) => [...props, user]);
    } else {
      handleSelection((props) => props.filter((item) => item.uid !== user.uid));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleSelection([]);
  };

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

  const handleEditUser = (user) => {
    props.handleEditUser(user);
  }

  return (
    <table className="table-auto border border-slate-400">
      <thead className="bg-gray-200 h-8 ">
        <tr>
          <th className="">
            Select
          </th>
          <th className="">
            Display Name
            {/* Sort button */}
            <IconButton
              size="small"
              onClick={() => {
                const sortedUsers = [...users].sort((a, b) => {
                  if (a.displayName < b.displayName) {
                    return -1;
                  }
                  if (a.displayName > b.displayName) {
                    return 1;
                  }
                  return 0;
                });
                setUsers(sortedUsers);
              }}
            >
              <ArrowDropDown/>
            </IconButton>
          </th>
          <th className="">UID</th>
          <th className="">Email</th>
          <th className="">
            Group
            {/* Sort button */}
            <IconButton
              size="small"
              onClick={() => {
                const sortedUsers = [...users].sort((a, b) => {
                  if (a.groupId < b.groupId) {
                    return -1;
                  }
                  if (a.groupId > b.groupId) {
                    return 1;
                  }
                  return 0;
                });
                setUsers(sortedUsers);
              }}
            >
              <ArrowDropDown/>
            </IconButton>
          </th>
          <th></th>
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
                <td className="">{user.displayName}</td>
                <td className="">{user.uid}</td>
                <td className="">{user.email}</td>
                <td className="">{user.groupId}</td>
                <td className="">
                  <IconButton 
                    onClick={(e) => {
                      handleClick(e, user)
                    }}
                  >
                    <MoreVert/>
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => handleEditUser(user)}>
                      <ListItemIcon>
                        <ModeEdit fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteUser(user)}>
                      <ListItemIcon>
                        <PersonRemove fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                  </Menu>
                </td>
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
  )
}