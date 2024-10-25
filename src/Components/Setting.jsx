import React, { useState } from 'react';
import { additionalDetailsData } from '../data/users';

import axios from 'axios';

import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';

import { setData } from '../redux/UserSlice';


function Setting({ userData,setLoading }) {

  const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;

  const dispatch = useDispatch();

  const {
    fullname,
    userImage, // Fallback image URL
    email,
    phone,
    company,
    role,
    credits,
    additionalDetails // Additional details can be passed through userData
  } = userData || {};


  const [updatedData, setUpdatedData] = useState({

    address:userData?.additionalDetails?.address || "",
    gender:userData?.additionalDetails?.gender || "",
    dateOfBirth: userData?.additionalDetails?.dateOfBirth || "",
    nationality : userData?.additionalDetails?.nationality || "",
    maritalStatus : userData?.additionalDetails?.maritalStatus || "",
    bio: userData?.additionalDetails?.bio || ""

  });

  function changeHandler (event){

    setUpdatedData({...updatedData, [event.target.name]: event.target.value });

  }

  async function submitHandler(event) {

    event.preventDefault(); // Prevent form submission

    setLoading(true); // Start loading animation
    
    try {
      console.log("Updated Data:", updatedData);
  
      // Filter out keys with empty or invalid values
      const filtered = Object.keys(updatedData).reduce((acc, key) => {
        if (updatedData[key]) { // Only include if the value is not empty (falsy values like empty strings are excluded)
          acc[key] = updatedData[key];
        }
        return acc;
      }, {});

      if(Object.keys(filtered).length === 0){

        toast.error('No changes detected. Please make some changes.');
        return; // No changes detected, return early to avoid unnecessary API calls
        
      }
  
      console.log("Filtered Data:", typeof filtered);

      filtered.id = userData.additionalDetails?._id;

      filtered.userId = userData._id;
  
      // Here you can now send the filtered data to the backend
      // Example of making a POST request using axios:
      const response = await axios.post(`${backendUrl}/api/users/updateAdditionalDetails`, filtered);
      console.log('Server Response:', response.data.data);

      dispatch(setData(response.data.data))

      toast.success('Additional details updated successfully.');
  
    } catch (error) {
      console.log("An error occurred:", error);
    }
    finally{

      setLoading(false);

    }
  }
  

  return (
    <div className="flex flex-col gap-6 p-5 md:p-8 lg:p-10 bg-white shadow-lg rounded-xl w-full max-w-4xl mx-auto mt-8">

      {/* Full Name */}
      <div className="flex flex-col">
        <label className="font-medium text-purple-600" htmlFor="fullname">Full Name</label>
        <input
          defaultValue={fullname}
          value={userData.fullname}
          className="bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 rounded-lg w-full"
          id="fullname"
          type="text"
        />
      </div>

      {/* Email and Phone */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col w-full lg:w-1/2">
          <label className="font-medium text-purple-600" htmlFor="email">Email</label>
          <input
            defaultValue={email}
            value={userData.email}
            readOnly
            className="bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 rounded-lg w-full"
            id="email"
            type="email"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label className="font-medium text-purple-600" htmlFor="phone">Phone</label>
          <input
            defaultValue={phone}
            value={userData.phone}
            className="bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 rounded-lg w-full"
            id="phone"
            type="text"
          />
        </div>
      </div>

      {/* Company and Role */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col w-full lg:w-1/2">
          <label className="font-medium text-purple-600" htmlFor="company">Company</label>
          <input
            defaultValue={company}
            value={userData.company}
            className="bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 rounded-lg w-full"
            id="company"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <label className="font-medium text-purple-600" htmlFor="role">Role</label>
          <input
            defaultValue={role}
            value={userData.role}
            readOnly
            className="bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 rounded-lg w-full"
            id="role"
            type="text"
          />
        </div>
      </div>

      {/* Credits */}
      <div className="flex flex-col">
        <label className="font-medium text-purple-600" htmlFor="credits">Credits</label>
        <input
          defaultValue={credits}
          value={userData.credits}
          readOnly
          className="bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 rounded-lg w-full"
          id="credits"
          type="number"
        />
      </div>

      {/* Additional Details */}
      {additionalDetailsData?.map((detail) => (
        <div key={detail.key} className="flex flex-col">
          <label className="font-medium text-purple-600" htmlFor={detail.key}>{detail.label}</label>
          {
            (userData.additionalDetails == undefined || null) || userData.additionalDetails[detail.key] === null || undefined ? (
              <input
                defaultValue={detail.defaultValue}
                className="bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 rounded-lg w-full"
                id={detail.key}
                type={detail.type == null ? 'text' : detail.type}
                name={detail.key}
                value={updatedData[detail.key]}
                onChange={changeHandler}
                placeholder={detail.defaultValue}
              />
            ) : (
              <input
                defaultValue={userData.additionalDetails[detail.key] || detail.defaultValue}
                className="bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 rounded-lg w-full"
                id={detail.key}
                type="text"
                name={detail.key}
                onChange={changeHandler}
                value={updatedData[detail.key]}

              />
            )
          }
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="border border-gray-400 text-gray-700 rounded-full py-2 px-6 hover:bg-gray-100">
          Cancel
        </button>
        <button className="bg-purple-600 text-white rounded-full py-2 px-6 hover:bg-purple-700 transition-colors duration-200" onClick={submitHandler}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Setting;
