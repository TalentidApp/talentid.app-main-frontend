import React, { useState } from 'react'
import { SlArrowLeft } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";
import PopUps from './PopUps'

function HeadContent({ emailSearch, setEmailHandler, setEmailSearch,setSearchedResultFound }) {
  const [showPopUps, setshowPopUps] = useState(false)
  return (
    <div className="flex flex-col gap-6  items-center w-full   mt-1 relative ">


      {

        showPopUps && <PopUps emailSearch={emailSearch}
          setEmailSearch={setEmailSearch}
          setEmailHandler={setEmailHandler}
          showPopUps={showPopUps}
          setshowPopUps={setshowPopUps}
          setSearchedResultFound ={setSearchedResultFound}
          
        />

      }

      <div className="flex items-center gap-5 font-bold md:text-2xl text-xl ">

        <h1 className="">Track candidate status</h1>
      </div>

      <div className="flex flex-col items-center lg:flex-row gap-6  lg:gap-3 " >

        <div className="relative border-gray-300 lg:w-[700px] w-[300px] items-center border-2 flex rounded-full shadow-xl bg-gradient-to-r from-white to-[#f9f9f9] p-2 transition-shadow          duration-300 ease-in-out">
          <span className='lg:text-2xl text-gray-500 ml-3'><IoMdSearch /></span>
          <input
            onChange={setEmailHandler}
            className="bg-transparent text-xs lg:text-sm border-none outline-none w-full p-2 rounded-full transition-all duration-200 ease-in-out"
            type="email"
            placeholder="Enter your Email or Mobile Number"
            value={emailSearch}
          />
        </div>
        <button onClick={() => setshowPopUps(true)} className=" shadow-xl bg-[#803bd8] text-white  rounded-[50px] text-[12px] px-4 py-[5px] md:py-[4px] font-medium md:text-[14px] md:w-[130px] lg:py-2 lg:w-[150px]">Check status
        </button>

      </div>
    </div>
  )
}

export default HeadContent