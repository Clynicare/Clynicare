import React from 'react'

const Content = () => {
  return (
    <div className='flex'>
        <div className="maincontent relative  ml-[200px] top-[200px] w-[600px] flex flex-col gap-5 font-rejoice">
            <div className="heading     text-black">
            <span className='font-bold text-5xl leading-[50px]'>Expert Care Made <br /> Easy: Book Trusted Professionals Anytime, Anywhere</span>

            </div>
            <div>
                <p className='text-gray-600'>Seamless healthcare at your doorstep—skilled care,<br /> easy booking, and your well-being prioritized.</p>
            </div>
            <div className='flex bg-white w-[400px] gap-[20px] rounded-full p-3  ' >
                
                <input type="text" className='border-none  focus:outline-none ml-3'  placeholder='Enter your Email Here'/>
                    <button className='bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white p-3 rounded-full w-[200px] '>Book now</button>
               
            </div>
            </div>
            
            <div className="landingImage">
              {/* <img src="/images/landingimage.jpg" alt="" /> */}
            </div>

    </div>
  )
}

export default Content