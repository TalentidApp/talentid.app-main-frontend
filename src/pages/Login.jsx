import axios from 'axios';
import React, { useState, useContext } from 'react';
import { SiThunderstore } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { setData } from '../redux/UserSlice';
import { MyContext } from "../context/UserContext";
import login from "../../public/assets/Login.svg";

function Login() {
    const dispatch = useDispatch();
    const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const navigate = useNavigate();
    const { setUserData, setIsLoggedIn } = useContext(MyContext);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields!');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/users/login`, { email, password });

            setIsLoggedIn(true);
            dispatch(setData(response.data));

            toast.success('Logged in successfully!');
            navigate("/");

        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex h-[100vh]'>
            {loading && <Loader />}
            
            {/* Left Section (Form) */}
            <div 
                className='w-full py-20 px-10 md:py-32 md:px-20 lg:w-1/2 lg:py-16 flex flex-col gap-8 items-center bg-gradient-to-b from-white to-[#e0d1f4]'
            >
                {/* <div className='flex flex-col gap-5 justify-center items-center'> */}
                    <h1 className='font-extrabold text-4xl md:mb-4 text-[#603C9A]'>Log In</h1>

                    {/* Social login buttons */}
                    {/* <div className='flex gap-4'>
                        <button className='rounded-full focus:outline-none w-9 h-9 bg-[#d9d9d9] border border-gray-500 p-3' />
                        <button className='rounded-full focus:outline-none w-9 h-9 bg-[#d9d9d9] border border-gray-500 p-3' />
                        <button className='rounded-full focus:outline-none w-9 h-9 bg-[#d9d9d9] border border-gray-500 p-3' />
                    </div> */}

                    {/* Divider */}
                    {/* <div className='flex gap-2 items-center'>
                        <span className='w-16 bg-gray-600 h-[2px]'></span>
                        <span className='text-gray-500 font-bold'>or</span>
                        <span className='w-16 bg-gray-600 h-[2px]'></span>
                    </div> */}
                {/* </div> */}

                {/* Form */}
                <form onSubmit={submitHandler} className='flex flex-col gap-8 w-full'>
                    <input
                        className='placeholder:text-gray-500 text-black bg-[#f2f2f2] p-3 border rounded-2xl border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#603C9A]'
                        type="email"
                        placeholder='Enter your email address'
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <div className='relative'>
                        <input
                            className='placeholder:text-gray-500 w-full text-black bg-[#f2f2f2] p-3 border rounded-2xl border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#603C9A]'
                            type={isPassword ? 'password' : 'text'}
                            placeholder='Enter your password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className='absolute right-3 top-3 cursor-pointer'>
                            {isPassword ? 
                                (<VscEye size={25} onClick={() => setIsPassword(false)} />) : 
                                (<VscEyeClosed size={25} onClick={() => setIsPassword(true)} />)}
                        </div>
                    </div>

                    <Link className='text-right text-purple-600 hover:underline' to={'/auth/forgot-password-email'}>
                        Forgot Password?
                    </Link>

                    <button className='bg-[#603C9A] text-white hover:bg-[#502b7f] mt-5 mx-auto py-2 px-4 border-none rounded-xl font-bold w-[240px]' type="submit">
                        Log In
                    </button>
                </form>

                <div className='flex flex-col gap-5'>
                    <Link className='font-bold text-purple-600 hover:underline' to={'/signup'}>
                        Don't have an account? Create one
                    </Link>
                </div>
            </div>

            {/* Right Section */}

            <div 
                style={{ backgroundImage: "url('/assets/Login.svg')",  objectFit: 'contain' }} // Replace with actual image URL
                className='hidden lg:flex w-full lg:w-1/2 bg-cover bg-center py-16 px-14 flex-col gap-[120px] justify-center items-center text-white'
            >
                {/* <h1 className='font-bold text-white text-3xl flex items-center gap-1'>
                    <SiThunderstore />
                    <img src="/assets/talentid_logo_black.png" alt="Logo" className='w-32'/>
                </h1>
                <div className='flex flex-col gap-6 items-center'>
                    <h1 className='text-4xl font-bold'>Welcome Back!</h1>
                    <p>Don't have an account? Create one</p>
                    <Link to={'/signup'}>
                        <button className='py-3 px-6 font-bold bg-white text-[#603C9A] hover:bg-[#f3f3f3] w-[240px] rounded-3xl'>
                            Create account
                        </button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
}

export default Login;
