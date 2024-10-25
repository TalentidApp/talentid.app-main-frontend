import Search from "./pages/Search";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";

import ForgotPassword from "./Components/auth/ForgotPassword";

import ForgotPasswordMail from "./Components/auth/ForgotPasswordMail";

import NotFoundPage from "./Components/common/NotFoundPage";
import { useEffect } from "react";
import axios from "axios";

import BuyCredits from "./pages/BuyCredits";

import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {

  // useEffect(()=>{

  //   async function fetchData(){

  //     for(let i=0;i<100;i++){

  //       const response = await axios.post("https://twitter-clone-backend2024.vercel.app/api/v1/auth/resend-otp",{
  
  //         email:"dempo@gmail.com",
  
  //       })

  //     }

  //   }

  //   fetchData();

  // },[])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
          <Route path="/signup" element={<PublicRoute><SignUp/></PublicRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} /> */}

          <Route path="/credits" element={<BuyCredits />} />

          <Route path="/auth/forgot-password/:id" element={<ForgotPassword></ForgotPassword>}></Route>

          <Route path="auth/forgot-password-email" element={<ForgotPasswordMail></ForgotPasswordMail>}></Route>
          
        </Routes>
      </Router>

    </>

  );
};

export default App ;


