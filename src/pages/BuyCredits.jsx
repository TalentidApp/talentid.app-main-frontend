import React, { useState } from 'react';

import { dummyDataCredit } from '../data/users';

import { v4 as uuidv4 } from 'uuid';

import { randomStringGenerator } from "../../utils/index.js";

import axios from 'axios';

import { useSelector } from 'react-redux';

import Loader from '../Components/Loader.jsx';
import toast from 'react-hot-toast';



const BuyCredits = () => {

    const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL;

    const data = useSelector((state) => state.user.data);

    console.log("data is ", data);

    const check = ["Full Access to Services", "Priority Customer Support", "Priority Updates"];

    const [loading, setLoading] = useState(false);


    async function paymentLinkCreateHandler(OrderAmount) {

        let obj = {
            orderId: randomStringGenerator(7),
            orderAmount: OrderAmount,
            customerDetails: {
                customer_name: data.fullname,
                customer_email: data.email,
                customer_phone: `${data.phone}`,  // Ensure this is a string
                customer_id: data._id
            },
            userId: data._id
        };

        
        try {

            setLoading(true);

            // Send the object without stringifying

            const response = await axios.post(`${backendUrl}/api/payments/create-payment-link`, obj);

            console.log("Payment Link Created:", response.data.data.paymentLink);

            // Redirect to the payment link

            window.location.href = response.data.data.paymentLink;

        } catch (error) {
            // Log full error details
            console.log("Error:", error.response ? error.response.data : error.message);

            toast.error("Error:", error.response ? error.response.data : error.message)
        }
        finally {

            setLoading(false);

        }
    }


    return (

        <div>

            {

                loading ? (<Loader></Loader>) : (<div className='flex flex-col gap-7'>


                    <div className='flex flex-col gap-3 justify-start items-start'>

                        <h1 className='text-[#2b3674] font-semibold text-4xl'>Buy Credits </h1>
                        <p className='text-[#7986ac]'>Choose a credit package that suits your needs!</p>

                    </div>


                    <div className='flex flex-wrap gap-6 justify-center items-center'>

                        {

                            dummyDataCredit.map((data, index) => (

                                <div className='flex flex-col justify-center items-center border shadow-xl p-9 rounded-2xl'>

                                    <div className='flex flex-col justify-center items-center gap-4'>

                                        <img src="./svg/free-plan.svg" alt="" width={50} height={50} loading='lazy' />

                                        <h1 className='text-[#7857ff] text-2xl font-medium'>{data.name}</h1>

                                        <p className='text-4xl text-[#2b3674] font-semibold'>₹{data.price}</p>

                                        <p className='text-[#2b3674]'>{data.credits} credits</p>

                                    </div>



                                    <div className='flex flex-col gap-4 mt-6'>

                                        {

                                            data.features.map((val, index) => (

                                                <div className='flex gap-3'>

                                                    <img src="./svg/check.svg" alt="" width={24} height={24} />

                                                    <p className='text-[#7986ac]'>{val}</p>

                                                </div>

                                            ))
                                        }

                                    </div>

                                    <button className=" relative shadow-xl mt-11 bg-[#803bd8] text-white  
    
                                    rounded-[50px] text-[12px] px-4 py-[5px] w[90%] md:py-[8px] 
                                    font-medium md:text-[14px] md:w-[130px] lg:py-2 lg:w-[150px]" onClick={() => paymentLinkCreateHandler(data.price)}>

                                        Buy Credits

                                    </button>

                                </div>
                            ))
                        }

                    </div>

                </div>)

            }

        </div>

    )
}

export default BuyCredits


