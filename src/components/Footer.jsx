import Link from 'next/link'
import React from 'react'
import { faApple, faGooglePay, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    
    <div className='footer h-[50vh] md:px-[100px]   '>
        
                <h1 className="font-rejoice font-bold text-4xl tracking-normal  bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text">CLYNICARE</h1>
         

   <div className="main flex justify-between   mt-[50px] h-[50%]" >

  <div className="links flex flex-row gap-20">
        <div className="links flex flex-col ] gap-3">
               <p className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'> Importent Links </p>
               <Link href="/about"className='text-sm text-black/50' > Book Appoinmen </Link>
               <Link href="/about" className='text-sm text-black/50'> Intake Form </Link>
        </div>

        <div className="helpCemterlinks flex flex-col    gap-3">
               <p className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'> Importent Links </p>
              <Link href="/About" className='text-sm text-black/50'> About Us </Link>
              <Link href="/COntact"className='text-sm text-black/50' > Contact Us </Link>
              <Link href="/about" className='text-sm text-black/50'> Pricing </Link>
        </div>
        
        </div>

        <div className="download flex flex-col    gap-3  pr-10">
            <p className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'> Download </p>
            <p className='text-sm text-black/50'> Your Health at Your <br/> Fingertips: Download Our <br/> App Today</p>

            <div className="fontAwesomeIcons flex flex-row gap-3 w-[200px] h-[70px]">

            <Link href="/appStore">
              <div className="appleIcon h-[40px] w-[100px] border-black  border-2 rounded-lg flex items-center px-1 gap-[5px]">

                <FontAwesomeIcon icon={faApple} className='text-2xl '></FontAwesomeIcon>
                   <div className="appStore flex flex-col ml-[1px]">
                    <small className='text-[8px] '>Download on the </small>
                    <p className='text-[12px] font-bold'> App Store</p>
                   </div>
              </div>
            </Link>

              <Link href="googlePlay">
              <div className="google h-[40px] w-[100px] border-black border-2 rounded-lg flex items-center px-1 gap-[5px] ">
                <FontAwesomeIcon icon={faGooglePlay} className='text-[18px] text-'></FontAwesomeIcon>
                  <div className="appStore flex flex-col ml-[1px]">
                     <small className='text-[8px] '>GET IT ON</small>
                     <p className='text-[11px] font-bold'> Google Play</p>
                  </div>
              </div>
              </Link>


            </div>
        </div>
    </div>

     <hr />

    <div className="bottom  h-[30%]  flex justify-between items-center  text-sm text-black/50">
        <div className="copyRight">
            <p>Copyright @2024 Clynicare. All Rights Reserved. Designed and Developed by
            <Link href="/about" className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text font-rejoice'> CLYNICARE.COM </Link>
                 </p>
        </div>

        <div className="terms">
            <div className="links flex gap-3">
               <Link href="/about"className='text-sm text-black/50' > Terms & Conditions </Link>
               <Link href="/about" className='text-sm text-black/50'> Privacy Policy</Link>
            </div>
        </div>

    </div>

    </div>
  )
}
