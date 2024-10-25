import React, { useState } from 'react';
import { useContext } from 'react';
import { FaHistory } from "react-icons/fa";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import SidebarContext from '../context/SidebarContext';
import { IoSettings } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { BiSupport } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-hot-toast";
import axios from 'axios';
import Loader from './Loader';

import { useDispatch } from 'react-redux';

import {logout} from "../redux/UserSlice";


import { RxCrossCircled } from "react-icons/rx";

function SideBar({ changeContent, setchangeContent }) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;

  const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext);

  const items = [
    { title: "Candidate Tracking", icon: <HiOutlinePresentationChartLine /> },
    { title: "History", icon: <FaHistory /> }
  ];

  const [loading, setLoading] = useState(false);


  return (
    <div className={`absolute transition-all duration-500 w-[80vw] sm:w-[40vw] left-[-100vw] z-50 self-end bg-gradient-to-b from-purple-600 to-purple-800 shadow-lg rounded-lg flex flex-col justify-between lg:w-[270px] lg:static lg:duration-0 h-[100vh] ${isSidebarOpen ? "left-[0vw]" : ""}`}>

      {/* Loading Spinner */}
      {loading && <Loader />}

      {/* Menu Items */}
      <div className="w-full mt-32">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-start py-4 px-6 my-2 mx-4 rounded-lg cursor-pointer transition-colors duration-300 ${changeContent === index ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-purple-300 hover:text-white'}`}
            onClick={() => { setchangeContent(index); setSidebarOpen(false); }}
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="font-medium text-lg">{item.title}</span>
          </div>
        ))}

        <div className='absolute top-0 right-0 cursor-pointer block lg:hidden' onClick={()=>setSidebarOpen(!isSidebarOpen)}>

          <RxCrossCircled size={35}></RxCrossCircled>

        </div>

      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col font-semibold text-base px-8 gap-5 mb-9">

        {/* Settings */}
        <div
          className='flex justify-start items-center border rounded-full px-6 py-2 gap-4 bg-white text-gray-700 hover:bg-purple-300 hover:text-white transition-colors duration-300 cursor-pointer shadow-lg'
          onClick={() => navigate("/profile")}
        >
          <IoSettings className='w-6 h-6' />
          <p className='text-lg'>Settings</p>
        </div>

        {/* Support */}
        <a
          className='flex justify-start items-center border rounded-full px-6 py-2 gap-4 bg-white text-gray-700 hover:bg-purple-300 hover:text-white transition-colors duration-300 cursor-pointer shadow-lg'
          href='https://talentid.tawk.help/'
        >
          <BiSupport className='w-6 h-6' />
          <button className='text-lg'>Support</button>
        </a>
      </div>
    </div>
  );
}

export default SideBar;
