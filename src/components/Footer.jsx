import Link from 'next/link'
import React from 'react'
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <div className='footer w-full px-6 md:px-[100px] py-10 bg-gray-100'>
      
      {/* Brand Name */}
      <h1 className="font-rejoice font-bold text-3xl md:text-4xl tracking-normal bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text text-center md:text-left">
        CLYNICARE
      </h1>

      {/* Main Footer Content */}
      <div className="main flex flex-col md:flex-row justify-between mt-8 space-y-8 md:space-y-0">

        {/* Links Section */}
        <div className="links flex flex-col md:flex-row gap-10">
          
          {/* First Column */}
          <div className="flex flex-col gap-3">
            <p className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text font-semibold'>Important Links</p>
            <Link href="/appointment" className='text-sm text-black/50'>Book Appointment</Link>
            <Link href="/intake-form" className='text-sm text-black/50'>Intake Form</Link>
          </div>

          {/* Second Column */}
          <div className="flex flex-col gap-3">
            <p className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text font-semibold'>Help Center</p>
            <Link href="/About" className='text-sm text-black/50'>About Us</Link>
            <Link href="/contact" className='text-sm text-black/50'>Contact Us</Link>
            <Link href="/pricing" className='text-sm text-black/50'>Pricing</Link>
          </div>

        </div>

        {/* Download Section */}
        <div className="download flex flex-col gap-3">
          <p className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text font-semibold'>Download</p>
          <p className='text-sm text-black/50'>
            Your Health at Your Fingertips: Download Our App Today
          </p>

          {/* App Store & Google Play Links */}
          <div className="flex gap-3">
            
            <Link href="/app-store">
              <div className="flex items-center gap-2 border-2 border-black rounded-lg px-3 py-2">
                <FontAwesomeIcon icon={faApple} className='text-2xl'/>
                <div className="flex flex-col">
                  <small className='text-[10px]'>Download on the</small>
                  <p className='text-sm font-bold'>App Store</p>
                </div>
              </div>
            </Link>

            <Link href="/google-play">
              <div className="flex items-center gap-2 border-2 border-black rounded-lg px-3 py-2">
                <FontAwesomeIcon icon={faGooglePlay} className='text-2xl'/>
                <div className="flex flex-col">
                  <small className='text-[10px]'>GET IT ON</small>
                  <p className='text-sm font-bold'>Google Play</p>
                </div>
              </div>
            </Link>

          </div>
        </div>

      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-black/50 text-center md:text-left space-y-4 md:space-y-0">
        
        {/* Copyright */}
        <p>
          © 2024 Clynicare. All Rights Reserved. Designed & Developed by
          <Link href="/about" className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text font-semibold ml-1'>ONEDUMB TEAM</Link>
        </p>

        {/* Terms & Privacy Links */}
        <div className="flex gap-4">
          <Link href="/Terms-and-Conditions" className='text-sm text-black/50'>Terms & Conditions</Link>
          <Link href="/Privacy-Policy" className='text-sm text-black/50'>Privacy Policy</Link>
        </div>

      </div>

    </div>
  )
}
