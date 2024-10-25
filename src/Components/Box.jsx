import React, { useState } from 'react';

import { InterViewStatusUser } from '../data/users';
function PopUp() {
  return (
    <button className='bg-black py-1 px-3 ml-6 text-white rounded-[10px] text-base absolute bottom-[-20px] opacity-0 transition-all duration-700 transform group-hover:translate-y-[-35px] group-hover:opacity-100'>
      View more
    </button>
  );
}

function Box({ setPipeline, company }) {
 
  console.log("box ke andar company ka data ", company);

  const [showpopup, setShowpopup] = useState("");

  console.log("company state", company.interviewStatus); // Debugging: Check if the company state is correc
  return (
    <div
      onClick={() => setPipeline(company)}
      
      className="group w-[350px] relative flex flex-col items-center justify-center bg-white h-[160px] rounded-2xl border-black border-[1px]"
    >
      <PopUp />

      {/* hover div create blur effect  */}

      <div className="w-32 h-32 absolute opacity-0 transition-all duration-1000 group-hover:opacity-30 bg-green-500 left-3 top-3 rounded-full filter blur-md" style={{ backgroundColor: InterViewStatusUser[company.interviewStatus] }}></div>

      <h1 className="text-2xl font-semibold">{company?.org_name}</h1>
      <div className="flex items-center justify-start gap-2">
        {/* Dynamically apply background color */}
        <span
          className="rounded-full w-4 h-4"
          style={{ backgroundColor: InterViewStatusUser[company.recommended_status] || 'gray' }} // Fall back to gray if no match
        ></span>
        <p
          className="font-semibold text-md"
          style={{ color: InterViewStatusUser[company.recommended_status] || 'gray' }} // Fall back to gray if no match
        >
          {company.recommended_status}
        </p>
      </div>
    </div>
  );
}

export default Box;
