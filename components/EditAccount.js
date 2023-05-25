import { useState } from 'react';

const EditAccount = (props) => {
  const [accountInfo, setAccountInfo] = useState({
    name: props.currentUserInfo.displayName,
    email: props.currentUserInfo.email,
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(accountInfo.name, accountInfo.email, accountInfo.password, accountInfo.confirmPassword);
    if (passwordValidation(accountInfo.password, accountInfo.confirmPassword)) {
      const body = {
        uid: props.currentUserInfo.uid,
        name: accountInfo.name,
        email: accountInfo.email,
        password: accountInfo.password,
      }
      try {
        const response = await fetch('/api/updateuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('passwords do not match');
    }
  }

  const passwordValidation = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }

  return (
    <div>
      <form className="flex flex-col items-center justify-center">
        <input className="w-1/2 p-2 my-2 border-2 border-gray-400 rounded-md dark:text-black" type="text" placeholder="Name" 
          value={accountInfo.name}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setAccountInfo((props) => ({
              ...props,
              name: val !== null ? val : '',
            }))
          }}
        />
        <input className="w-1/2 p-2 my-2 border-2 border-gray-400 rounded-md dark:text-black" type="email" placeholder="Email" 
          value={accountInfo.email}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setAccountInfo((props) => ({
              ...props,
              email: val !== null ? val : '',
            }))
          }}
        />
        <input className="w-1/2 p-2 my-2 border-2 border-gray-400 rounded-md dark:text-black" type="password" placeholder="Password"
          onChange={(e) => {
            const val = e.currentTarget.value;
            setAccountInfo((props) => ({
              ...props,
              password: val !== null ? val : '',
            }))
          }}
        />
        <input className="w-1/2 p-2 my-2 border-2 border-gray-400 rounded-md dark:text-black" type="password" placeholder="Confirm Password"
          onChange={(e) => {
            const val = e.currentTarget.value;
            setAccountInfo((props) => ({
              ...props,
              confirmPassword: val !== null ? val : '',
            }))
          }}
        />
        <button className="w-1/2 p-2 my-2 text-white bg-blue-500 rounded-md" type="submit" onClick={(e) => {handleSubmit(e)}}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditAccount;