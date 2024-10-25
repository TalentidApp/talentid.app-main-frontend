import React, { useState } from 'react';
import axios from 'axios';

import { useContext } from 'react';

import { MyContext } from '../context/UserContext';

import toast from 'react-hot-toast';
import Loader from './Loader';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

import { setCredits } from '../redux/UserSlice';

function PopUps({ emailSearch,setEmailSearch, showPopUps, setshowPopUps,setSearchedResultFound }) {

  const dispatch = useDispatch();

  const { searchedUserData, setSearchedUserData } = useContext(MyContext);

  const data = useSelector((state)=>state.user.data);

  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;

  async function checkStatusHandler() {

    try {

      setLoading(true);

      setSearchedUserData(null);
      
      console.log("check status handler email ", emailSearch);

      if (emailSearch === "") {

        toast.error("plz provide the email");

        return;
      }

      console.log("email value is ", emailSearch);

      setshowPopUps(false);

      const response = await axios.post(`${backendUrl}/api/users/user-info`, {

        email: emailSearch,
        userId:data._id

      });

      // console.log((response?.data)?.data.interviews);
      

      dispatch(setCredits(Number(data?.credits)-1));

      console.log("res ka data at pop ups ",response.data.data.profile);

      // setSearchedUserData((response?.data)?.data.interviews);

      setSearchedUserData(response.data.data.profile);

      toast.success("data fetched successfully");

      setSearchedResultFound("");

      // make a call to backend to seraching the user 

    } catch (error) {

      setSearchedResultFound("not_found")

      console.log(error.response.data.message);

      toast.error( error.response.data.message);

    }
    finally {

      setEmailSearch("");

      setLoading(false);

    }
  }

  return (
    <div className={`flex z-50 w-full md:w-[400px] transition-all 
      duration-300  flex-col gap-5 bg-white rounded-3xl py-8 px-4
     mt-[18%] absolute  left-auto
        ${showPopUps ? "" : "right-[-490px]"} shadow-2xl items-center`}>

      {

        loading && <Loader></Loader>
        
      }

      <div className='w-full gap-2 md:gap-0  flex flex-col items-center text-sm md:text-base '>

        <h1 className='text-gray-700 font-bold'>For Checking the status of Candidate,You </h1>
        <div className='flex gap-2'>
          <span className='text-gray-700 font-bold'>need to burn 1</span>
          <div className="border-gray-600  border-[1px] rounded-[2px]  h-[24px] w-[15px]  relative">
            <div className="w-[2.5px] h-[5px] bg-black  rounded-[100px_0_0_100px] top-[-5.5px] rotate-90 absolute  left-0 right-0 mx-auto" />
            <div className="h-[20%]  bg-white" />
            <div className="bg-green-500 h-[80%]" />
          </div>
        </div>

      </div>
      <div className='flex gap-5 text-xs font-semibold'>
        <button onClick={() => setshowPopUps(false)} className=' px-10 border-[1px] border-gray-500 text-black  py-1 rounded-3xl'>Cancel</button>
        <button onClick={checkStatusHandler} className=' py-1 px-10 border-[1px] border-gray-500  text-white rounded-3xl  bg-[#56b54a]'>Proceed</button>
      </div>
    </div>
  )
}

export default PopUps