import React, { useState } from 'react'
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import axios from "axios";

import toast from 'react-hot-toast';
import Loader from './Loader';


function AboutMe() {

  const [loading,setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;

  console.log("backendUrl: " + backendUrl);

  const [password, setPassword] = useState(true);
  
  const [confirmPassword, setConfirmPassword] = useState(true);

  const [passwordData, setPasswordData] = useState({ password: "", confirmPasswordValue: "" });

  async function resetPasswordhandler(event) {

    event.preventDefault();

    console.log("dkijd", passwordData);

    if (passwordData.password === "" || passwordData.password === "") {


      // toast.error("Password is required");
      toast.error("Password is required")

      return;

    }

    // here i have to make database call to update the password

    try {

      setLoading(true);

      const response = await axios.post(`${backendUrl}/api/users/resetPassword`, passwordData);

      console.log("response", response.data);
      toast.success("Password changed successfully");

    } catch (error) {

      toast.error("Failed to change password", error.message);

    }finally{

      setLoading(false);

    }

  }

  return (

    <div className='flex flex-col gap-12 lg:gap-8 lg:h-full  mt-7 w-full mb-32 lg:mb-0'>

      {

        loading && <Loader></Loader>
      }

      <div className='flex flex-col'>
        <label className='text-gray-800' htmlFor="Cpd">Current Password</label>
        <div className='relative w-full lg:w-max'>
          <input placeholder='Enter Current password'
            className='bg-[#f5f5f5]
             text-black placeholder:text-gray-500 p-3
              focus:outline-none rounded-lg  lg:w-[400px] w-full '
            type={`${password ? "password" : "text"}`}
            value={passwordData.password}
            onChange={(event) => {

              setPasswordData({ ...passwordData, password: event.target.value });

            }}
          />
          <span onClick={() => {

            setPassword(!password);

          }} className='absolute top-4 right-4 cursor-pointer'><VscEye />
          </span>
        </div>
      </div>

      <div className='flex flex-col'>
        <label className='text-gray-800'>New Password</label>
        <div className='relative w-full lg:w-max'>
          <input placeholder='Enter New password'
           className='bg-[#f5f5f5] text-black
           placeholder:text-gray-500 p-3 w-full focus:outline-none 
           rounded-lg lg:w-[400px]'
            type={`${confirmPassword ? "password" : "text"}`}
            value={passwordData.confirmPasswordValue}
            onChange={(event) => {

              setPasswordData({ ...passwordData, confirmPasswordValue: event.target.value });

            }}
          />

          <span onClick={() => {

            setConfirmPassword(!confirmPassword)

          }} className='absolute top-4 right-4 cursor-pointer'><VscEye /></span>
        </div>

        <button className='rounded-full border w-fit p-3 mt-9 bg-indigo-500 text-white' onClick={resetPasswordhandler}>reset Password</button>

      </div>
    </div>
  )
}

export default AboutMe;

