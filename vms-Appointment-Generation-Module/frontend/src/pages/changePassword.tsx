
import  { useEffect, useState } from 'react';
import NavBar from '../components/navBar'; 
import custom_axios from '../axios/AxiosSetup'; 
import { getLoginInfo } from '../utils/LoginInfo';
import { ApiConstants } from '../api/ApiConstants';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


const ChangePassword = () => {
  let navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState<number | undefined>(undefined);

  useEffect(()=>{
    const userInfo = getLoginInfo();
    const userId = userInfo?.userId;
    setLoggedInUserId(userId);
  }, []);
  
//   const userInfo = getLoginInfo();
//   const loggedInUserId = userInfo?.userId || ''; // Use the userId from the decoded token
//  console.log(loggedInUserId)
  const handleChangePassword = async () => {
    // Perform client-side validation
    if (!newPassword || !confirmNewPassword) {
      alert('Please fill in both password fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match.');
      return;
    }

    try { 
      if(loggedInUserId===undefined){
        alert('Please log in to change you password')
        return;
      }
      console.log(ApiConstants);
      // Make the PATCH API request to update the user password by user ID
      const response = await custom_axios.patch(ApiConstants.USER.UPDATE(loggedInUserId), {
        password: newPassword,
      });
     

      // Check the response status
      if (response.status === 200) {

        toast.success('Password changed successfully!');
        navigate("/appointmentform")
        
        // Optionally, you can redirect the user to a different page after successful password change
      } else {
        alert('Failed to change password. Please try again.');
      }
    } catch (error) {
      // Handle any errors that occurred during the API request
      alert('An error occurred while changing the password.');
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center mt-10">
        <div className="w-full max-w-lg">
          <div className="bg-blue-300 shadow-2xl rounded px-12 mt-10 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="password">
                New Password
              </label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="New Password"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Confirm New Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

  