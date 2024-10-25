import React, { useState, useContext, useEffect } from 'react';
import BoxContainer from './BoxContainer';
import HeadContent from './HeadContent';
import History from './History';
import MyContexts from '../context/context';
import Pipeline from './Pipeline';
import Headre from './Headre';

import { MyContext } from '../context/UserContext';

import NotFoundPage from "../Components//common/NotFoundPage";

function Content({ changeContent, setchangeContent }) {

  const { pipeline } = useContext(MyContexts);
  const [emailSearch, setEmailSearch] = useState("");

  const [searchedResultFound,setSearchedResultFound] = useState("");

  console.log("chaange content value",changeContent);

  const {searchedUserData,setSearchedUserData} = useContext(MyContext);
  // Handle email input changes
  const handleEmailChange = (e) => {
    setEmailSearch(e.target.value);
  };

  useEffect(()=>{

    console.log("searched user data in content",searchedUserData);

  },[searchedUserData,pipeline]);

  return (
    <div className="flex-1 p-4 pt-[140px] lg:pl-[50px] lg:pr-[90px] flex flex-col gap-10 h-full overflow-x-hidden overflow-y-hidden">
      <Headre />

      <HeadContent
        emailSearch={emailSearch}
        setEmailHandler={handleEmailChange}
        setEmailSearch={setEmailSearch}
        setSearchedResultFound ={setSearchedResultFound}

      />

      {

        pipeline && searchedResultFound.length === 0 ? (
          <Pipeline user={emailSearch} searchedUserData={searchedUserData}/>
        ) : changeContent === 0 ? (
          <div className='w-full flex justify-center'>

            <BoxContainer searchedUserData={searchedUserData} emailSearch={emailSearch} setEmailSearch={setEmailSearch} />

          </div>
        ) : (

          <div className='overflow-auto'>

            <History

              setSearchedResultFound ={setSearchedResultFound}
              setchangeContent={setchangeContent}
              setEmailSearch={setEmailSearch}
            />

          </div>
        )}

        {

          searchedResultFound == "not_found" && <NotFoundPage></NotFoundPage>

        }
    </div>
  );
}

export default Content;


