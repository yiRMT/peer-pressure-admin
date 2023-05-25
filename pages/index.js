import CreateAccount from '@/components/CreateAccount';
import UserList from '@/components/UserList';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { Button, Modal, Box, Fab, IconButton } from '@mui/material';
import EditAccount from '@/components/EditAccount';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {
  const [openCreateAccountModal, setCreateAccountOpenModal] = useState(false);
  const [openEditAccountModal, setEditAccountOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
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
      <div>
        <h1 className="text-4xl font-bold text-center">
          Welcome to the Peer Pressure Admin
        </h1>
        <div className='flex gap-4'>
          <Button 
            onClick={handleAddUser}
          >
            Add User
          </Button>
          <Button onClick={handleEditUser}>
            Edit User
          </Button>
          <Button>
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
            <CreateAccount />
          </Box>
        </Modal>
        <Modal
          open={openEditAccountModal}
          onClose={() => setEditAccountOpenModal(false)}
        >
          <Box sx={{  }}>
            <Fab 
              onClick={() => setEditAccountOpenModal(false)}
            >
              <CloseIcon />
            </Fab>
            <EditAccount currentUserInfo={selectedUsers[0]}/>
          </Box>
        </Modal>
        <UserList handleSelection={handleSelection}/>
      </div>
    </>
  )
}
