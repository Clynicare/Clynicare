'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClipboardList, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {motion} from 'framer-motion'

export default function SecondPage() {
    const [isOpen, setIsOpen] = useState([true, false, false]);

    const toggleOpen = (index) => {
        setIsOpen((prev) => {
            const newState = [false, false, false];
            newState[index] = !prev[index];
            return newState;
        });
    };

    const steps = [
        {
            step: 1,
            icon: faUserPlus,
            title: 'Sign Up',
            description: 'Visit our website and create an account by providing your details.',
        },
        {
            step: 2,
            icon: faClipboardList,
            title: 'Select Service',
            description: "Navigate to the 'Services' section, choose your desired service.",
        },
        {
            step: 3,
            icon: faCalendarCheck,
            title: 'Schedule Appointment',
            description: 'Enter preferred date, time, and any additional information; confirm your booking.',
        },
    ];

    return (
        <div className="h-auto px-5 md:px-[180px] py-10 md:py-[100px] flex flex-col md:flex-row gap-10 md:gap-[70px]  -">
            <motion.div  initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:2,ease:'easeOut'}} className="leftpart flex flex-col items-center md:items-start">
                <Image src="/images/doc.jpg" width={400} height={350} alt="Doctor" className="w-full md:w-[400px]" priority/>
                <div className="rectangle relative md:-top-[120px] left-0 md:left-4 w-full md:w-[350px] h-[80px] bg-white rounded-xl mt-5 md:mt-0">
                    <div className="firstcontent flex items-center justify-between px-5 h-full">
                        <div className="heartfill flex items-center gap-2">
                            <div className="bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faUserPlus} className="text-white text-xl" />
                            </div>
                            <p className="text-sm md:text-base">Choose <br /> Services</p>
                        </div>
                        <div className="timefill flex items-center gap-2">
                            <div className="bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faCalendarCheck} className="text-white text-xl" />
                            </div>
                            <p className="text-sm md:text-base">Choose <br /> Services</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div className="rightpart w-full md:w-auto">
                <div className="content w-full md:w-[600px] flex flex-col gap-5 text-center md:text-left">
                    <span className="text-orange-400 text-lg md:text-xl">How it Works</span>
                    <h1 className="font-bold text-3xl md:text-5xl">Easy Steps to <br /> Secure Your Nursing Appointment</h1>
                    <p className="font-bold text-lg md:text-xl text-gray-600 border-b-2 pb-4">With our user-friendly platform, accessing top-notch nursing care has never been easier.</p>
                </div>

                <div className="steps flex flex-col gap-6 mt-5">
                    {steps.map((step, index) => (
                        <div key={step.step} className="border-b-2 pb-4 flex flex-row gap-5 items-center">
                            <div className="exclamation bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] w-[40px] h-[40px] rounded-xl flex items-center justify-center">
                                <FontAwesomeIcon icon={step.icon} className="text-white text-lg" />
                            </div>
                            <div className="stepcontent w-full">
                                <button onClick={() => toggleOpen(index)} className="text-lg md:text-2xl font-semibold w-full text-left">
                                    {step.title}
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen[index] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-sm md:text-base mt-2">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
