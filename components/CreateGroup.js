import { useEffect, useState } from 'react';

export default function CreateGroup(props) {
  const [groupInfo, setGroupInfo] = useState({
    groupId: '',
  });

  const selectedUsers = props.selectedUsersInfo;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Create Group");
    if (selectedUsers.length === 0) {
      alert('Please select a user to create a group');
      return;
    }

    if (groupInfo.groupId === '') {
      alert('Please enter a group ID');
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
          country: props.country,
          groupName: groupInfo.groupId,
          users: selectedUsers
        }),
      });
    } catch (error) {
      console.log(error);
    }

  }

  const passwordValidation = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }

  return (
    <>
      <div>
        <form className="flex flex-col items-center justify-center">
          <input className="w-1/2 p-2 my-2 border-2 border-gray-400 rounded-md dark:text-black" type="text" placeholder="Group ID" 
            onChange={(e) => {
              const val = e.currentTarget.value;
              setGroupInfo((props) => ({
                ...props,
                groupId: val !== null ? val : '',
              }))
            }}
          />
          <button className="w-1/2 p-2 my-2 text-white bg-blue-500 rounded-md" type="submit" onClick={(e) => {handleSubmit(e)}}>
            Create Group
          </button>
        </form>
      </div>
    </>
  )
}