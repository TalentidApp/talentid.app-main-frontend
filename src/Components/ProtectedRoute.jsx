
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/UserContext";

import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";



const ProtectedRoute = ({ children }) => {

    // const {loggedIn} = useContext(MyContext);

    const {data,loggedIn} = useSelector((state)=>state.user);


    console.log("user data at protected route ",data);

    console.log("logged in hai kya ",loggedIn);

    if(loggedIn){

        return children;

    }
    return <Navigate to="/login"></Navigate>
};

export default ProtectedRoute;

