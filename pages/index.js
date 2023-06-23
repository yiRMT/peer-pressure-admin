import CreateAccount from '@/components/CreateAccount';
import UserList from '@/components/UserList';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { Button, Modal, Box, Fab, IconButton, Alert, ToggleButtonGroup, ToggleButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditAccount from '@/components/EditAccount';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import CreateGroup from '@/components/CreateGroup';
import GroupList from '@/components/GroupList';

export default function Home() {
  const router = useRouter();

  const [openCreateAccountModal, setCreateAccountOpenModal] = useState(false);
  const [openEditAccountModal, setEditAccountOpenModal] = useState(false);
  const [openCreateGroupModal, setCreateGroupOpenModal] = useState(false);
  const [openEditGroupModal, setEditGroupOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [country, setCountry] = useState('JP');
  const [expMode, setExpMode] = useState('prePostExp');
  
  const handleChangeExpMode = async () => {
    console.log("Change Exp Mode");

    try {
      const response = await fetch('/api/changemode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expMode }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddUser = () => {
    console.log("Add User");
    setCreateAccountOpenModal(true);
  }

  const handleEditUser = () => {
    console.log("Edit User");
    if (selectedUsers.length === 0) {
      alert('Please select a user to edit');
      return;
    }
    setEditAccountOpenModal(true);
  }

  const handleDeleteUser = async () => {
    console.log("Delete User");
    if (selectedUsers.length === 0) {
      alert('Please select a user to delete');
      return;
    }

    const uids = selectedUsers.map((user) => user.uid);
    console.log(uids);

    try {
      const response = await fetch('/api/deleteuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ users: uids }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateGroup = async () => {
    console.log("Create Group");
    
    setCreateGroupOpenModal(true);
    /*
    if (selectedUsers.length === 0) {
      alert('Please select a user to create a group');
      return;
    }

    const uids = selectedUsers.map((user) => user.uid);
    console.log(uids);
    console.log(selectedUsers);

    try {
      const response = await fetch('/api/creategroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          groupName: 'groupX',
          users: selectedUsers 
        }),
      });
    } catch (error) {
      console.log(error);
    }*/
  }

  const handleEditGroup = () => {
    console.log("Edit Group");
    if (selectedGroups.length === 0) {
      alert('Please select a group to edit');
      return;
    }
    setEditGroupOpenModal(true);
  }

  const handleSelection = (value) => {
    setSelectedUsers(value);
  }

  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex flex-col gap-6 m-10'>
        <div className='border-2 border-gray-300 rounded-md'>
          <h2 className='text-xl font-bold bg-gray-300 px-2 py-1'>
            Country
          </h2>
          <ToggleButtonGroup
            className='m-4'
            color="primary"
            value={country}
            exclusive={true}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                setCountry(newValue)
              }
            }}
          >
            <ToggleButton value='JP'>🇯🇵 Japan</ToggleButton>
            <ToggleButton value='AU'>🇦🇺 Australia</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='border-2 border-gray-300 rounded-md'>
          <h2 className='text-xl font-bold bg-gray-300 px-2 py-1'>
            Experiment Mode
          </h2>
          <div className='flex flex-row gap-4 items-center'>
            <FormControl className='m-4'>
              <InputLabel >Experiment Mode</InputLabel>
              <Select
                value={expMode}
                label="Experiment Mode"
                onChange={(event) => setExpMode(event.target.value)}
              >
                <MenuItem value='prePostExp' >Pre/Post Experiment</MenuItem>
                <MenuItem value='randomized' >Randomized Notification</MenuItem>
                <MenuItem value='peer' >Peer Notification</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant='outlined'
              onClick={() => console.log(expMode)}
            >
              Save
            </Button>
          </div>
        </div>

        {/* Group */}
        <div className='border-2 border-gray-300 rounded-md'>
          <h2 className='text-xl font-bold bg-gray-300 px-2 py-1'>
            Groups
          </h2>
          <div className='flex flex-col m-4'>
            <div className='flex gap-4 my-2'>
              <Button 
                variant='outlined'
                onClick={handleEditGroup}
              >
                Edit Group
              </Button>
              <IconButton color='primary' onClick={() => {
                router.reload();
              }}>
                <RefreshIcon />
              </IconButton>
            </div>
            <Modal
              open={openEditGroupModal}
              onClose={() => setEditGroupOpenModal(false)}
            >
              <Box className="mx-40 mt-10">
                <Fab 
                  onClick={() => setEditGroupOpenModal(false)}
                >
                  <CloseIcon />
                </Fab>
                <EditAccount currentUserInfo={selectedGroups[0]}/>
              </Box>
            </Modal>
            <GroupList
              className=""
              handleSelection={handleSelection}
              country={country}
              handleEditUser={handleEditUser}
            />
          </div>
        </div>

        {/* Users */}
        <div className='border-2 border-gray-300 rounded-md'>
          <h2 className='text-xl font-bold bg-gray-300 px-2 py-1'>
            Users
          </h2>
          <div className='flex flex-col m-4'>
            <div className='flex gap-4 my-2'>
              <Button 
                variant='outlined'
                onClick={handleAddUser}
              >
                Add User
              </Button>
              <Button 
                variant='outlined'
                onClick={handleEditUser}
              >
                Edit User
              </Button>
              <Button 
                variant='outlined'
                onClick={handleDeleteUser}
              >
                Delete User
              </Button>
              <Button
                variant='outlined'
                onClick={handleCreateGroup}
              >
                Create Group
              </Button>
              <IconButton color='primary' onClick={() => {
                router.reload();
              }}>
                <RefreshIcon />
              </IconButton>
            </div>
            <Modal
              open={openCreateAccountModal}
              onClose={() => setCreateAccountOpenModal(false)}
            >
              <Box className='m-10'>
                <Fab 
                  onClick={() => setCreateAccountOpenModal(false)}
                >
                  <CloseIcon />
                </Fab>
                <CreateAccount country={country}/>
              </Box>
            </Modal>
            <Modal
              open={openEditAccountModal}
              onClose={() => setEditAccountOpenModal(false)}
            >
              <Box className="mx-40 mt-10">
                <Fab 
                  onClick={() => setEditAccountOpenModal(false)}
                >
                  <CloseIcon />
                </Fab>
                <EditAccount currentUserInfo={selectedUsers[0]}/>
              </Box>
            </Modal>
            <Modal
              open={openCreateGroupModal}
              onClose={() => setCreateGroupOpenModal(false)}
            >
              <Box sx={{  }}>
                <Fab 
                  onClick={() => setCreateGroupOpenModal(false)}
                >
                  <CloseIcon />
                </Fab>
                <CreateGroup selectedUsersInfo={selectedUsers} country={country}/>
              </Box>
            </Modal>
            <UserList
              className=""
              handleSelection={handleSelection}
              country={country}
              handleEditUser={handleEditUser}
            />
          </div>
        </div>
        
        
      </div>
    </>
  )
}
