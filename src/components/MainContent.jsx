"use client";

import Image from 'next/image'
import React from 'react'

const Content = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full py-10 px-6 lg:px-16">
      
      {/* Left Section (Text and Input) */}
      <div className="maincontent relative flex flex-col gap-5 font-rejoice text-center md:text-left">
        <div className="heading text-black">
          <span className="font-bold text-3xl md:text-5xl leading-tight">
            Expert Care Made <br className="hidden md:block" /> Easy: Book Trusted Professionals Anytime, Anywhere
          </span>
        </div>
        <div>
          <p className="text-gray-600 text-base md:text-lg">
            Seamless healthcare at your doorstep—skilled care, <br /> easy booking, and your well-being prioritized.
          </p>
        </div>
        
        {/* Input and Button */}
        <div className="flex justify-center md:justify-start bg-white rounded-full p-3 mt-5 md:w-[400px] w-full">
          <input
            type="text"
            className="border-none focus:outline-none px-4 w-full"
            placeholder="Enter your Email Here"
          />
          <button className="bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white p-3 rounded-full w-full md:w-[200px] mt-3 md:mt-0">
            Book Now
          </button>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="landingImage mt-10 md:mt-0">
        <Image
          src="/images/Land.png"
          alt="Healthcare"
          width={900}
          height={900}
          className="object-contain mx-auto"
        />
      </div>

    </div>
  )
}

export default Content;
