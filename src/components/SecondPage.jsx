'use client';

import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse, faCalendar, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function SecondPage() {
    const [isopen1, setisopen1] = useState(true);
    const [isopen2, setisopen2] = useState(false);
    const [isopen3, setisopen3] = useState(false);

    const toggleopen1 = () => setisopen1(prev => !prev);
    const toggleopen2 = () => setisopen2(prev => !prev);
    const toggleopen3 = () => setisopen3(prev => !prev);

    return (
        <div className="h-auto px-5 md:px-[180px] py-10 md:py-[200px] flex flex-col md:flex-row gap-10 md:gap-[70px] font-rejoice">
            <div className="leftpart flex flex-col items-center md:items-start">
                <Image src='/images/doc.jpg' width={400} height={350} alt="Doctor" className="w-full md:w-[400px]" />
                <div className="rectangle relative md:-top-[120px] left-0 md:left-4 w-full md:w-[350px] h-[80px] bg-white rounded-xl mt-5 md:mt-0">
                    <div className="firstcontent flex items-center justify-between px-5 h-full">
                        <div className="heartfill flex items-center gap-2">
                            <div className="bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faHeartPulse} className="text-white text-xl" />
                            </div>
                            <p className="text-sm md:text-base">Choose <br /> Services</p>
                        </div>
                        <div className="timefill flex items-center gap-2">
                            <div className="bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faCalendar} className="text-white text-xl" />
                            </div>
                            <p className="text-sm md:text-base">Choose <br /> Services</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rightpart w-full md:w-auto">
                <div className="content w-full md:w-[600px] flex flex-col gap-5 text-center md:text-left">
                    <span className="text-orange-400 text-lg md:text-xl">How it Works</span>
                    <h1 className="font-bold text-3xl md:text-5xl">Easy Steps to <br /> Secure Your Nursing Appointment</h1>
                    <p className="font-bold text-lg md:text-xl text-gray-600 border-b-2 pb-4">With our user-friendly platform, accessing top-notch nursing care has never been easier.</p>
                </div>
                
                <div className="steps flex flex-col gap-6 mt-5">
                    {[{ step: 1, isOpen: isopen1, toggle: toggleopen1 }, { step: 2, isOpen: isopen2, toggle: toggleopen2 }, { step: 3, isOpen: isopen3, toggle: toggleopen3 }].map(({ step, isOpen, toggle }) => (
                        <div key={step} className="border-b-2 pb-4 flex flex-row gap-5 items-center">
                            <div className="exclamation bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] w-[40px] h-[40px] rounded-xl flex items-center justify-center">
                                <FontAwesomeIcon icon={faCircleExclamation} className="text-white text-xl" />
                            </div>
                            <div className="stepcontent w-full">
                                <button onClick={toggle} className="text-lg md:text-2xl font-semibold w-full text-left">Step {step}</button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                    <p className="text-sm md:text-base mt-2">Easily Book an Appointment that works with your schedule through our online booking system.</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
