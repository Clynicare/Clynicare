import React from 'react';
import { Search } from 'lucide-react';
import Nav from './Nav';
import Searchbox from './Searchbox';

export default function Hero() {
    return (
        <section className="bg-[radial-gradient(ellipse_300%_100%_at_bottom_center,#007BA7,white_90%)] min-h-[90vh] md:min-h-screen overflow-hidden relative">
            <Nav />
            <div className="pt-20 md:pt-0 flex flex-col md:flex-row justify-between items-center md:items-start px-5 md:px-0">
                {/* Main Content */}
                <div className="maincontent relative z-10 md:ml-[200px] md:top-[200px] w-full md:w-[600px] flex flex-col gap-5 font-rejoice text-center md:text-left mt-10 md:mt-0">
                    <div className="heading text-black">
                        <span className='font-bold text-3xl md:text-5xl leading-tighter md:leading-[50px]'>
                            Your Health, Our Priority : <br className='hidden md:block' /> 
                            Seamless Home Care at Your Fingertips.
                        </span>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm md:text-base'>
                            Seamless healthcare at your doorstep—skilled care, <br className='hidden md:block' /> 
                            easy booking, and your well-being prioritized.
                        </p>
                    </div>
                    
                    {/* Search Container - Always Horizontal Layout */}
                    <div className='flex flex-row bg-white w-full max-w-[400px] gap-2 rounded-3xl p-2 items-center mx-auto md:mx-0'>
                        <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex child from overflowing */}
                            <Searchbox />
                        </div>
                        <button className="bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white px-4 py-3 rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap min-w-[100px]">
                            <Search className="w-4 h-4" />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
                
                {/* Landing Image */}
                <div className="landingImage mt-10 md:mt-[100px] flex justify-center">
                    <img 
                        src='/images/Land.png' 
                        alt="Healthcare Illustration"
                        width={300} 
                        height={300} 
                        className='w-[90%] md:w-[900px] h-auto object-contain'
                        style={{
                            filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1))'
                        }}
                    />
                </div>
            </div>
        </section>
    );
}