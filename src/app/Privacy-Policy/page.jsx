import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Nav />
      <div className='Terms-and-Conditions min-h-screen w-full'>
        <div className='relative'>
          <img 
            src='/images/abouttwo.jpg' 
            alt='About' 
            className='w-full h-[50vh] md:h-[60vh] object-cover rounded-tl-3xl rounded-tr-3xl' 
          />
          <h1 
            className='absolute text-gray-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            z-10 font-rejoice text-4xl md:text-6xl text-center'
          >
            Terms & Conditions
          </h1>
        </div>
        <div className='start w-full px-6 md:px-[100px] py-10'>
          <div className='termsDate py-5 flex flex-col md:flex-row justify-between text-sm md:text-base'>
            <span>Marvel Infusion Terms & Conditions</span>
            <span className='text-black/50'>Effective January 12, 2025</span>
          </div>
          <hr />
          <div className='T&C flex flex-col md:flex-row mt-10 gap-6'>
            <div className='leftSide w-full md:w-1/4 flex flex-col gap-3 text-sm md:text-base px-3 md:px-5'>
              <p className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Introduction</p>
              <p>Your relationship with Marvel Infusion</p>
              <p>Content in Marvel Infusion services</p>
              <p>In case of problems or disagreements</p>
              <p>About these terms</p>
            </div>
            <div className='border-l border-gray-300 hidden md:block'></div>
            <div className='rightSide w-full md:w-3/4 px-3 md:px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 pr-4 gap-6 space-y-4 text-sm md:text-base'>
              <h4 className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
              <p className='text-black/50'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
              </p>
              <h4 className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
              <p className='text-black/50'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
              </p>
              <h4 className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
              <p className='text-black/50'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
