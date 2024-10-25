import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Dateformatter } from '../../utils/index.js';
import NoHistoryPage from './common/NoHistoryFound.jsx'; // Adjust path as needed
import Loader from './Loader.jsx';

import Pipeline from './Pipeline.jsx';

import MyPipelineContext from '../context/context.jsx';

import { useContext } from 'react';

import { MyContext } from '../context/UserContext.jsx';

function History({ setEmailSearch, setchangeContent, setSearchedResultFound }) {

  const [loading, setLoading] = useState(true);

  const { pipeline, setPipeline } = useContext(MyPipelineContext);

  const { searchedUserData, setSearchedUserData } = useContext(MyContext);

  const [userHistoryData, setUserHistoryData] = useState([]);
  const data = useSelector((state) => state.user.data);
  const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;

  function viewMoreClickHandler(user){

    console.log("view userdata ",user);

    // setPipeline(user);
    // setEmailSearch(user?.candidate_name);
    // setChangeContent(0);

    setSearchedUserData([user])

    setchangeContent(0);
      
    setSidebarOpen(true);


  }

  useEffect(() => {

    setSearchedResultFound("");

    const fetchHistoryData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/users/getUserHistoryData/${data._id}`);
        setUserHistoryData(response.data.data);

        console.log("User History data ",response.data.data);
      } catch (error) {
        console.error('Error fetching history data:', error);
        toast.error(error.response?.data?.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    };


    fetchHistoryData();
  }, [backendUrl, data._id]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader />
      </div>
    );
  }

  return userHistoryData.length === 0 ? (
    <NoHistoryPage />
  ) : (
    <div className='relative px-2 py-5 md:p-5 bg-[#f2f2f2] w-full rounded-3xl shadow-inner border-gray-500 border-[1px] text-left overflow-x-auto'>
      <div className='relative'>


        <table className=' rea table-auto w-full overflow-x-auto'>

          <thead className='sticky top-0 z-40 bg-[#f2f2f2] w-[200px] md:w-full'>
            <tr>
              <th colSpan="5">
                <h1 className='font-bold text-xl md:text-2xl mb-6 ml-3'>History</h1>
              </th>
            </tr>
            <tr className='border-gray-400 border-b-[2px]'>
              <th className='pl-5 pb-2 text-left'> </th>
              <th className='pr-4 pb-2 text-left'>Name</th>
              <th className='text-left pl-6 pb-2'>Email</th>
              <th className='pb-2 text-left'>Last Updated</th>
              <th className='pl-6 pb-2 text-left'>Pipeline</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody className='relative text-gray-500 font-semibold text-xs md:text-sm '>
            {userHistoryData.map((user, index) => (
              <tr key={index} className='border-b-[2px] border-gray-400'>
                <td className='p-2 text-center'>

                  <img
                    className="rounded-full w-10 md:w-12 bg-purple-500"
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.candidate_name}&backgroundColor=800080&textColor=FFFFFF`}
                    alt={user.candidate_name}
                  />

                </td>
                <td className='capitalize'>{user.candidate_name}</td>
                <td className='pl-6'>{user.email}</td>
                <td>{Dateformatter(user.updatedAt)}</td>
                <td>
                  <button
                    onClick={()=>viewMoreClickHandler(user)}
                    className='bg-white font-semibold text-gray-500 border-[0.5px] border-black rounded-full text-xs md:text-sm py-1 px-2'
                  >
                    View more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>


      </div>
    </div>
  );
}

export default History;
