import React, { useRef, useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const ForgotPasswordMail = () => {

    const [loading,setLoading] = useState(false);

  const inputRef = useRef("");

  const navigate = useNavigate();

  async function clickHandler() {

    console.log(inputRef.current.value);

    if(inputRef.current.value == ""){

        toast.error("plz enter the email")

    }

    setLoading(true); // start loading spinner


    try {

      const response = await axios.post('http://localhost:4000/api/users/forgotPasswordEmail', {
        email: inputRef.current.value,
      });
      console.log(response);
      toast.success("password reset link sent to your email")

      navigate('/login'); // navigate to login page after successful email sending

    } catch (error) {

      console.error(error);
      toast.error("Failed to send password reset link")

    }
    finally{

        setLoading(false); // stop loading spinner after completion or error

    }

    inputRef.current.value = ""; // clear the input field after submission

  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-r">

        {

            loading && <Loader></Loader>
        }

      <div className="bg-white border rounded-2xl p-8 shadow-lg w-full max-w-md flex flex-col items-center gap-6">
        
        <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
        
        <p className="text-sm text-gray-500 text-center">
          Enter your email address below to reset your password.
        </p>

        <input
          type="email"
          ref={inputRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="you@example.com"
          required
        />

        <button
          onClick={clickHandler}
          className="w-full bg-indigo-600 text-white rounded-full py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          Reset Password
        </button>

        <p className="text-xs text-gray-400 mt-4">
          We'll send you an email with instructions to reset your password.
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordMail;
