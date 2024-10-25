import React, { useContext } from 'react';
import Box from './Box';
import MyContext from '../context/context';

function BoxContainer({ searchedUserData, emailSearch, setEmailSearch }) {
  const { pipeline, setPipeline } = useContext(MyContext);

  console.log("hello I am inside box container1 ", searchedUserData);

  return (
    <div className="w-full">
      {searchedUserData && (
        <div
          className="flex relative mx-auto h-fit max-h-[400px] flex-wrap lg:p-5 p-4 bg-[#f2f2f2] lg:max-w-[55vw] rounded-3xl justify-center md:justify-between lg:gap-7 gap-5 shadow-inner border-gray-500 border-[1px] mb-10 px-4 overflow-y-scroll"
          style={{
            scrollbarWidth: 'none',        /* Firefox */
            msOverflowStyle: 'none'        /* Internet Explorer and Edge */
          }}
        >
          <style>
            {`
              .scrollbar-hide::-webkit-scrollbar {
                display: none; /* WebKit-based browsers (Chrome, Safari) */
              }
            `}
          </style>

          {/* {searchedUserData.map((company, index) => (
            <Box
              key={index}
              company={company}
              setPipeline={setPipeline}
              setEmailSearch={setEmailSearch}
            />
          ))}

          {searchedUserData.map((company, index) => (
            <Box
              key={index}
              company={company}
              setPipeline={setPipeline}
              setEmailSearch={setEmailSearch}
            />
          ))}

          {searchedUserData.map((company, index) => (
            <Box
              key={index}
              company={company}
              setPipeline={setPipeline}
              setEmailSearch={setEmailSearch}
            />
          ))} */}

          {/* {searchedUserData.map((company, index) => (
            <Box
              key={index}
              company={company}
              setPipeline={setPipeline}
              setEmailSearch={setEmailSearch}
            />
          ))}

          {searchedUserData.map((company, index) => (
            <Box
              key={index}
              company={company}
              setPipeline={setPipeline}
              setEmailSearch={setEmailSearch}
            />
          ))} */}

          {searchedUserData.map((company, index) => (
            <Box
              key={index}
              company={company}
              setPipeline={setPipeline}
              setEmailSearch={setEmailSearch}
            />
          ))}

          {/* Repeat the map function if necessary */}
        </div>
      )}
    </div>
  );
}

export default BoxContainer;
