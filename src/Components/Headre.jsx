import React, { useState } from 'react'
import { useContext } from 'react';
import { SiThunderstore } from "react-icons/si";
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import SidebarContext from '../context/SidebarContext';

import {MyContext} from '../context/UserContext';
import { useSelector } from 'react-redux';

function Headre() {

  const { isSidebarOpen, setSidebarOpen, } = useContext(SidebarContext);

  // const {userData} = useContext(MyContext);

  const userData = useSelector((state)=>state.user.data);


  return (
    <div className="flex gap-3 absolute top-[50px] left-[20px] right-[20px]  items-center lg:left-[150px] lg:right-[70px] z-20 lg:z-50">
      <div className='text-2xl cursor-pointer lg:hidden'>
        <label className="burger" htmlFor="burger">
          <input onClick={() => setSidebarOpen(!isSidebarOpen)} type="checkbox" id="burger" />
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      {/* middle */}
      <div
        className="flex items-center justify-between w-full z-10  py-3
           bg-transparent/10 px-2 rounded-[50px] shadow-2xl">


        <div className="text-[14px] font-extrabold ml-2 lg:ml-5 flex gap-2 items-center  md:text-xl lg:text-2xl lg:font-extrabold">
          {/* <SiThunderstore /> */}
          {/* <span className='  '> </span> */}

          <img src="/assets/talentid_logo_white.png" alt="Logo" className='w-24 md:w-44 h-full'/>

        </div>

        <Link to='/profile'><img className="rounded-full hidden md:block w-[30px] h-[30px] object-cover border-[1px] border-customPurple md:w-[50px] md:h-[50px]" src={userData?.userImage} alt="" /> </Link>

      </div>

      {/* right */}
      <div className="flex py-1 h-full  gap-2 items-center bg-[#7129CF] opacity-80 text-white font-medium text-xs px-3  rounded-[10px] md:text-sm">
        <div className="flex flex-col ">
          <span>Credits</span>
          <span>{userData?.credits}</span>
        </div>
        <div className="  flex flex-col justify-center items-center">

          <div className="border-black  border-[1px] rounded-[4px]  h-  relative h-[25px] w-[15px]">
            <div className="w-[2.5px] h-[5px] bg-black  rounded-[100px_0_0_100px] top-[-5.5px] rotate-90 absolute  left-0 right-0 mx-auto" />
            <div className="h-[20%]  bg-white" />
            <div className="bg-green-500 h-[80%]" />
          </div>
        </div>
      </div>

    </div>
  )
}



export default Headre
