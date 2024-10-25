import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Setting from "../Components/Setting";
import AboutMe from "../Components/AboutMe";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/UserSlice";
import toast from "react-hot-toast";
import axios from "axios";

import BuyCredits from "../pages/BuyCredits";

function Profile() {
  const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;
  const navigate = useNavigate();
  const [sideProfileMenu, setSideProfileMenu] = useState(false);
  const [content, setContent] = useState("about");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  async function logoutHandler() {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/users/logout`);
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log("error during login ", error.message);
      toast.error("Error during logout: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  function renderContent() {
    switch (content) {
      case "about":
        return <AboutMe />;
      case "home":
        navigate("/");
        return null;
      case "feedback":
        return <div>Feedback content here</div>;
      case "buyCredits":
        return <BuyCredits></BuyCredits>;
      case "settings":
        return <Setting userData={userData} setLoading={setLoading} />;
      default:
        return <AboutMe />;
    }
  }

  return (
    <div className="flex h-screen w-screen relative bg-gray-50">
      {loading && <Loader />}
      {/* Left - Sidebar */}
      <div
        className={`lg:w-1/4 md:static flex flex-col gap-8 py-8 pl-5 pr-10 h-full w-[300px] transition-all duration-200 bg-white shadow-lg z-10 ${
          sideProfileMenu ? "absolute left-0" : "absolute left-[-300px]"
        } lg:relative lg:left-0`}
      >
        <img
          src="/assets/talentid_logo_white.png"
          alt=""
          className="max-w-36"
          height={50}
        />
        <h1 className="text-3xl font-extrabold text-purple-700">Profile</h1>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="flex flex-col gap-4 text-gray-600 font-semibold">
          <div
            className={`cursor-pointer flex items-center gap-3 border rounded-full py-2 px-4 bg-white text-gray-700 hover:bg-purple-300 hover:text-white transition-colors duration-300 cursor-pointer shadow-md ${
              content === "home"
                ? "bg-purple-100 text-purple-600"
                : "hover:bg-gray-100 text-purple-600"
            }`}
            onClick={() => {
              setContent("home");
              setSideProfileMenu(false);
            }}
          >
            Home
          </div>
          <div
            className={`cursor-pointer py-2 px-4 rounded-md ${
              content === "settings"
                ? "bg-purple-100 text-purple-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setContent("settings");
              setSideProfileMenu(false);
            }}
          >
            About
          </div>
          <div
            className={`cursor-pointer py-2 px-4 rounded-md ${
              content === "about"
                ? "bg-purple-100 text-purple-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setContent("about");
              setSideProfileMenu(false);
            }}
          >
            Settings
          </div>

          <div
            className="cursor-pointer py-2 px-4 rounded-md hover:bg-gray-100"
            onClick={() => {
              setContent("feedback");
              setSideProfileMenu(false);
            }}
          >
            Feedback
          </div>
          <div
            className="cursor-pointer py-2 px-4 rounded-md hover:bg-gray-100"
            onClick={() => {
              setContent("buyCredits");
              setSideProfileMenu(false);
            }}
          >
            Buy Credits
          </div>
          {/* Logout */}
          <div
            className="flex items-center gap-3 border rounded-full py-2 px-4 bg-white text-gray-700 hover:bg-purple-300 hover:text-white transition-colors duration-300 cursor-pointer shadow-md"
            onClick={logoutHandler}
          >
            <CiLogout className="text-xl" />
            <p className="text-lg">Logout</p>
          </div>
        </div>
      </div>
      {/* Right - Main Content */}
      <div className="lg:w-3/4 flex flex-col gap-6 p-8 bg-white rounded-md shadow-xl overflow-y-auto w-full">
        <div className="flex items-center gap-6">
          <img
            className="h-24 w-24 rounded-full object-cover shadow-md"
            src={userData?.userImage}
            alt="Profile"
          />
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              {userData?.fullname}
              <BsPencilFill
                className="cursor-pointer text-purple-600"
                onClick={() => setSideProfileMenu(!sideProfileMenu)}
              />
            </p>
            <p className="text-gray-500">{userData?.email}</p>
          </div>
        </div>
        {/* Render Content */}
        {renderContent()}
      </div>
    </div>
  );
}

export default Profile;
