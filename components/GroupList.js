import { ArrowDropDown, MoreVert, PersonRemove, ModeEdit } from "@mui/icons-material";
import { Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

export default function GroupList(props) {
  const country = props.country;
  const [groups, setGroups] = useState([]);
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

  const getGroups = async () => {
    try {
      const response = await fetch('/api/listgroups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country: props.country }),
      });
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGroups();
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
            Group ID
            {/* Sort button */}
            <IconButton
              size="small"
              onClick={() => {
                const sortedUsers = [...groups].sort((a, b) => {
                  if (a.groupId < b.groupId) {
                    return -1;
                  }
                  if (a.groupId > b.groupId) {
                    return 1;
                  }
                  return 0;
                });
                setGroups(sortedUsers);
              }}
            >
              <ArrowDropDown/>
            </IconButton>
          </th>
          <th className="">Exp Mode</th>
          <th></th>
        </tr>
      </thead>
      { groups.length > 0 ? (
        <tbody>
          {groups.map((group) => {
            return (
              <tr key={group.groupId}>
                <td className="text-center">
                  <input 
                    type="checkbox"
                    onChange={(e) => {
                      const val = e.currentTarget.checked;
                      if (val) {
                        handleSelection((props) => [...props, group]);
                      } else {
                        handleSelection((props) => props.filter((item) => item.uid !== group.uid));
                      }
                    }}
                  />
                </td>
                <td className="">{group.groupId}</td>
                <td className="">{group.expMode}</td>
                <td className="">
                  <IconButton 
                    onClick={(e) => {
                      handleClick(e, group)
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
                    <MenuItem onClick={() => handleEditUser(group)}>
                      <ListItemIcon>
                        <ModeEdit fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteUser(group)}>
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
            <td className="text-center" colSpan="5">No group found</td>
          </tr>
        </tbody>
      )}
    </table>
  )
}