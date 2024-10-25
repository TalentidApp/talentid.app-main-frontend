import React, { useState } from 'react';
import { SiThunderstore } from "react-icons/si";
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import toast from 'react-hot-toast';
import axios from 'axios';

import { VscEye, VscEyeClosed } from "react-icons/vsc";

function SignUp() {

  const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;

  const [loading, setLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    phone: "",
    company: "talenid",
    role: "User",
    password: ""
  });

  function changeHandler(event) {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  }

  async function submitHandler() {
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/users/signup`, signupData);
        toast.success("Successfully signed up");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }, 5000);
  }

  return (
    <div className='flex h-[100vh]'>
      {/* Left Section */}
      {loading && <Loader />}

      <div
        style={{
          backgroundImage: "url('https://example.com/purple-theme-bg.jpg')", // Replace with the actual image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          background: "linear-gradient(180deg, #603C9A 0%, #201434 100%)"
        }}
        className='hidden w-full py-12 px-14 lg:flex flex-col gap-[120px]'
      >
        <h1 className='font-bold text-white text-3xl flex items-center gap-1 '>
          <SiThunderstore />
          <img src="/assets/Signup.svg" alt="" className='w-32' />
        </h1>
        <div className='flex flex-col gap-6 items-center '>
          <h1 className='text-white text-3xl font-bold '>Existing user?</h1>
          <p className='text-white'>Take a few moments to connect back</p>
          <Link to={"/login"}>
            <button className='py-3 px-6 font-extrabold bg-[#d9d9d9] w-[240px] rounded-3xl'>Log in</button>
          </Link>
        </div>
      </div>


      {/* Right Section */}
      <div className='w-full lg:py-12 py-28 md:px-14 px-6 flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-8 w-full max-w-md'>
          <h1 className='font-extrabold text-5xl text-purple-700'>Sign Up</h1>
          <div className='flex flex-col gap-6'>
            <input
              className='w-full bg-purple-100 text-gray-700 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md'
              name='fullname'
              value={signupData.fullname}
              type="text"
              placeholder='Enter your Full Name'
              onChange={changeHandler}
              required
            />
            <input
              className='w-full bg-purple-100 text-gray-700 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md'
              name='email'
              type="email"
              value={signupData.email}
              placeholder='Enter your Email'
              onChange={changeHandler}
              required
            />
            <input
              className='w-full bg-purple-100 text-gray-700 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md'
              name='phone'
              type="text"
              value={signupData.phone}
              placeholder='Enter your Phone'
              onChange={changeHandler}
              required
            />
            <div className='flex gap-4'>
              <input
                className='w-1/2 bg-purple-100 text-gray-700 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md'
                name='company'
                type="text"
                value={signupData.company}
                placeholder='Company'
                onChange={changeHandler}
                required
              />
              <select
                className='w-1/2 bg-purple-100 text-gray-700 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md'
                name='role'
                value={signupData.role}
                onChange={changeHandler}
              >
                <option value="HR">HR</option>
                <option value="User">User</option>
                <option value="Cn">Candidate</option>
              </select>
            </div>

            {/* Password Input */}
            <div className='relative'>
              <input
                className='w-full bg-purple-100 text-gray-700 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md'
                type={isPassword ? 'password' : 'text'}
                placeholder='Enter your password'
                name='password'
                value={signupData.password}
                onChange={changeHandler}
              />
              <div className='absolute right-4 top-4 cursor-pointer'>
                {isPassword ? (
                  <VscEye size={24} onClick={() => setIsPassword(false)} />
                ) : (
                  <VscEyeClosed size={24} onClick={() => setIsPassword(true)} />
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex flex-col items-center gap-4'>
            <button
              className='w-full bg-purple-600 text-white py-4 rounded-lg font-bold shadow-md hover:bg-purple-700 transition-all'
              onClick={submitHandler}
            >
              Create Account
            </button>
            <Link to="/login" className='text-purple-600 hover:underline lg:hidden'>
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;


