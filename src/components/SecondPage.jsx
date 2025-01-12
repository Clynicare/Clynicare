'use client';

import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse,faCalendar ,faCircleExclamation,faAngleUp    } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function SecondPage(){
    const [isopen1,setisopen1]=useState(true)
    const [isopen2,setisopen2]=useState(false)
    const [isopen3,setisopen3]=useState(false)
    const toggleopen1=()=>{
        setisopen1((prev) => !prev)
    }
    const toggleopen2=()=>{
        setisopen2((prev) => !prev)
    }
    const toggleopen3=()=>{
        setisopen3((prev) => !prev)
    }
    return(
        <div className="h-[130vh] px-[180px] py-[200px] flex gap-[70px] font-rejoice">
           <div className="leftpart ml-5 ">
            <Image src='/images/doc.jpg' width={400} height={350} alt="nothing"></Image>
            <div className="rectangle relative -top-[120px] left-4 w-[350px] h-[80px] bg-white rounded-xl ">
                <div className="firstcontent flex  items-center text-center px-5 justify-between align-middle h-[100%]   ">
                        <div className="heartfill flex">
                            <div className="bg-gradient-to-b from-[#4DA1A9] to-[#007BA7]  z-0 flex w-[40px] h-[40px] rounded-full align-middle text-center justify-center items-center"><FontAwesomeIcon icon={faHeartPulse} className="text-white text-xl" /></div>
                            <p>Choose <br /> Services</p>
                            </div> 
                        <div className="timefill flex  ">
                            <div className="bg-gradient-to-b from-[#4DA1A9] to-[#007BA7]  z-0 flex w-[40px] h-[40px] rounded-full align-middle text-center justify-center items-center">
                            <FontAwesomeIcon icon={faCalendar} className="text-white text-xl " />
                            </div>
                        
                            <p>Choose <br /> Services</p>
                            </div> 
                </div>
                <div className="secondcontent">

                </div>
            </div>
           </div>

           <div className="rightpart ">

            <div className="content w-[600px] flex flex-col gap-5">
            <span className="text-orange-400 text-xl">
            How it Works
            </span>

            <h1 className="font-bold text-5xl">Easy Steps  to <br /> Secure Your Nursing Appointment</h1>

            <p className="font-bold text-xl text-gray-600 border-b-2 pb-4">With our user-friendly platform,accessing top notch nursing care has never been easier.</p>
            </div>
            <div className="steps ">
                <div className="step1 border-b-2 pb-4 flex flex-row gap-7 pt-10">
                    <div className="exclamation bg-gradient-to-b from-[#4DA1A9] to-[#007BA7]  z-0 flex w-[40px] h-[40px] rounded-xl align-middle text-center justify-center items-center">
                        <FontAwesomeIcon icon={faCircleExclamation} className="text-white text-xl" />
                    </div>

                    <div className="stepcontent">
                    <button onClick={toggleopen1} className="text-2xl">Step 1</button>
                    
                       <div
                       className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isopen1 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                       }`}
                     > <p className="">Easily Book an Appointment that works with you scheduele through out online booking system. </p></div>
                    
                    </div>
                </div>
                <div className="step2 border-b-2 pb-4 flex flex-row gap-7 pt-10">
                    <div className="exclamation bg-gradient-to-b from-[#4DA1A9] to-[#007BA7]  z-0 flex w-[40px] h-[40px] rounded-xl align-middle text-center justify-center items-center">
                        <FontAwesomeIcon icon={faCircleExclamation} className="text-white text-xl" />
                    </div>

                    <div className="stepcontent">
                    <button onClick={toggleopen2} className="text-2xl">Step 2</button>
                    
                       <div
                       className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isopen2 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                       }`}
                     > <p className="">Easily Book an Appointment that works with you scheduele through out online booking system. </p></div>
                    
                    </div>
                </div>
                <div className="step3 border-b-2 pb-4 flex flex-row gap-7 pt-10">
                    <div className="exclamation bg-gradient-to-b from-[#4DA1A9] to-[#007BA7]  z-0 flex w-[40px] h-[40px] rounded-xl align-middle text-center justify-center items-center">
                        <FontAwesomeIcon icon={faCircleExclamation} className="text-white text-xl" />
                    </div>

                    <div className="stepcontent">
                    <button onClick={toggleopen3} className="text-2xl">Step 3</button>
                    
                       <div
                       className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isopen3 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                       }`}
                     > <p className="">Easily Book an Appointment that works with you scheduele through out online booking system. </p></div>
                    
                    </div>
                </div>
            </div>
           </div>
        </div>
    )
}