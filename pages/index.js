import CreateAccount from '@/components/CreateAccount';
import UserList from '@/components/UserList';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { Button, Modal, Box, Fab, IconButton, Alert, ToggleButtonGroup, ToggleButton } from '@mui/material';
import EditAccount from '@/components/EditAccount';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import CreateGroup from '@/components/CreateGroup';

export default function Home() {
  const [openCreateAccountModal, setCreateAccountOpenModal] = useState(false);
  const [openEditAccountModal, setEditAccountOpenModal] = useState(false);
  const [openCreateGroupModal, setCreateGroupOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [country, setCountry] = useState('JP');
  
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
      <div className='flex flex-col items-center'>
        <h1 className="text-4xl font-bold my-10">
          Peer Pressure Experiment Admin
        </h1>
        <div className='my-5'>
          <ToggleButtonGroup
              color="primary"
              value={country}
              exclusive
              onChange={(event, value) => setCountry(value)}
          >
              <ToggleButton value={'JP'}>🇯🇵 Japan</ToggleButton>
              <ToggleButton value={'AU'}>🇦🇺 Australia</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='flex gap-4 my-2'>
          <Button 
            onClick={handleAddUser}
          >
            Add User
          </Button>
          <Button onClick={handleEditUser}>
            Edit User
          </Button>
          <Button onClick={handleDeleteUser}>
            Delete User
          </Button>
          <Button onClick={handleCreateGroup}>
            Create Group
          </Button>
          <IconButton color='primary'>
            <RefreshIcon />
          </IconButton>
        </div>
        <Modal
          open={openCreateAccountModal}
          onClose={() => setCreateAccountOpenModal(false)}
        >
          <Box sx={{  }}>
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
        <UserList handleSelection={handleSelection} country={country}/>
      </div>
    </>
  )
}
