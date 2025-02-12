import React from 'react';
import { Heart, Plus, Stethoscope, Pill, Activity, Syringe, ChevronFirst as FirstAid, Thermometer, Microscope } from 'lucide-react';
import Nav from './Nav';
import MainContent from './MainContent';

export default function Hero() {
    return (
        <section className="bg-[radial-gradient(ellipse_300%_100%_at_bottom_center,#007BA7,white_90%)] min-h-screen overflow-hidden relative">
            {/* Background Medical Symbols */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 text-[#E63946] opacity-25 blur-sm">
                    <Heart size={60} />
                </div>
                <div className="absolute top-40 right-20 text-[#2A6F97] opacity-30 blur-sm">
                    <Plus size={80} />
                </div>
                <div className="absolute bottom-40 left-1/4 text-[#1D3557] opacity-30 blur-sm">
                    <Stethoscope size={70} />
                </div>
                <div className="absolute top-1/3 right-1/3 text-[#457B9D] opacity-30 blur-sm">
                    <Plus size={50} />
                </div>
                <div className="absolute bottom-20 right-1/4 text-[#2D6A4F] opacity-30 blur-sm">
                    <Pill size={65} />
                </div>
                <div className="absolute top-1/2 left-20 text-[#BC4749] opacity-30 blur-sm">
                    <Activity size={55} />
                </div>
                <div className="absolute top-1/4 left-1/3 text-[#386641] opacity-30 blur-sm">
                    <Syringe size={70} />
                </div>
                <div className="absolute bottom-1/3 right-20 text-[#023E8A] opacity-30 blur-sm">
                    <FirstAid size={65} />
                </div>
                <div className="absolute top-2/3 left-1/2 text-[#D62828] opacity-30 blur-sm">
                    <Thermometer size={60} />
                </div>
                <div className="absolute top-20 right-1/4 text-[#14213D] opacity-30 blur-sm">
                    <Microscope size={75} />
                </div>
                <div className="absolute bottom-1/4 left-10 text-[#1B4965] opacity-30 blur-sm">
                    <Plus size={45} />
                </div>
                <div className="absolute top-2/3 right-1/3 text-[#AE2012] opacity-25 blur-sm">
                    <Heart size={50} />
                </div>
            </div>

            <Nav />
            <div className="pt-20 md:pt-0 flex flex-col md:flex-row justify-between items-center md:items-start px-5 md:px-0">
                {/* Main Content */}
                <div className="maincontent relative z-10 md:ml-[200px] md:top-[200px] w-full md:w-[600px] flex flex-col gap-5 font-rejoice text-center md:text-left mt-10 md:mt-0">
                    <div className="heading text-black">
                        <span className='font-bold text-3xl md:text-5xl leading-tight md:leading-[50px]'>
                        Your Health, Our Priority : <br className='hidden md:block' /> Seamless Home Care at Your Fingertips.
                        </span>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm md:text-base'>
                            Seamless healthcare at your doorstep—skilled care, <br className='hidden md:block' /> easy booking, and your well-being prioritized.
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row bg-white w-full max-w-[300px] md:max-w-[400px] gap-2 md:gap-[20px] rounded-3xl p-2 md:p-3 items-center md:items-stretch mx-auto md:mx-0'>
                        <input 
                            type="text" 
                            className='border-none focus:outline-none px-2 md:px-3 w-full md:w-auto text-center md:text-left rounded-lg md:rounded-full py-1 md:py-0 text-xs md:text-base ' 
                            placeholder='Enter your Email Here' 
                        />
                        <button className='bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white p-2 md:p-3 rounded-full w-full md:w-[200px] text-xs md:text-base'>Book now</button>
                    </div>
                </div>
                
                {/* Landing Image */}
                <div className="landingImage mt-10 md:mt-[100px] flex justify-center">
                    <img src='/images/Land.png' width={300} height={300} className='w-[90%] md:w-[900px] h-auto' />
                </div>
            </div>
        </section>
    );
}