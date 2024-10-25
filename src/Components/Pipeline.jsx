import React, { useContext, useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import MyContext from '../context/context';

import StepProgress from '../pages/Temp';

function Pipeline({ user }) {
  const { pipeline, setPipeline } = useContext(MyContext);
  const [appliedRound, setAppliedRound] = useState(-1);

  console.log("user ka data ",pipeline);

  let roundNames = Array.isArray(pipeline?.round_name) ? pipeline?.round_name : [pipeline?.round_name]

  useEffect(() => {
    if (pipeline) {
      setAppliedRound(pipeline.round);
    }
  }, [pipeline]);

  // Array of round names
  // const roundNames = [
  //   "Screening Round",
  //   "Round 1",
  //   "Round 2",
  //   "Technical Round",
  //   "Culture Round",
  //   "HR & Final Round"
  // ];


  const RoundComponent = ({ roundName, index }) => (
    <div className='relative flex flex-col items-center'>
      <p className={`text-lg text-nowrap text-center mb-2 ${index <= appliedRound ? 'font-semibold text-black' : 'text-gray-500'}`}>
        {roundName}
      </p>
    </div>
  );

  return (
    <div className='flex flex-col gap-6 w-full bg-[#f2f2f2] shadow-lg border-gray-300 border rounded-3xl py-6 lg:p-8'>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex gap-4 items-center'>
          <span
            onClick={() => setPipeline(null)}
            className='text-2xl cursor-pointer ml-4 lg:ml-0 text-gray-700'
            aria-label="Back"
          >
            <IoIosArrowBack />
          </span>
          <span className='shadow-lg rounded-lg py-2 px-5 text-white bg-gray-700'>
            {pipeline?.candidate_name} Pipeline
          </span>
        </div>
        <p className='text-xl font-medium'>{pipeline?.org_name}</p>
      </div>

      <div className='relative flex flex-col mt-5 items-center justify-center px-4 lg:px-8'>

          <StepProgress roundName ={roundNames} recommended_status={pipeline.recommended_status}></StepProgress>

      </div>

      <div className='flex justify-end px-4 lg:px-8'>
        <button
          onClick={() => setPipeline(null)}
          className='bg-[#7f3ad8] text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-600 transition duration-300'
        >
          Check another candidate
        </button>
      </div>
    </div>
  );
}

export default Pipeline;


