import React from 'react'
import Image from 'next/image'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Doctors = () => {

    const doctors=[
        {
            name:"John",
            content:"Sophia Martinez is a dedicated Registered Nurse with over 10 years of  experience in pediatric care. Herpassion for helping children thrive is evident in her patient care and advocacy work. Sophia has ...",
            likes:50,
            imageurl:"/images/doctorTwo.jpg"
        },
         {
            name:"Sophia",
            content:"Sophia Martinez is a dedicated Registered Nurse with over 10 years of  experience in pediatric care. Her passion for helping children thrive is evident in her patient care and advocacy work. Sophia has ...",
            likes:70,
            imageurl:"/images/doctorThree.jpg"
        },
         {
            name:"David",
            content:"Sophia Martinez is a dedicated Registered Nurse with over 10 years of  experience in pediatric care. Her passion for helping children thrive is evident in her patient care and advocacy work. Sophia has ...",
            likes:80,
            imageurl:"/images/doctorFour.jpg"
        },
         {
            name:"Michael",
            content:"Sophia Martinez is a dedicated Registered Nurse with over 10 years of  experience in pediatric care. Her passion for helping children thrive is evident in her patient care and advocacy work. Sophia has ...",
            likes:90,
            imageurl:"/images/doctorOne.jpg"
        },
    ]

  return (
<div className=' doctorsPage w-[100%] h-[120vh] mt-5 px-[100px] flex flex-col gap-10 ' >

            <div className='flex flex-col justify-center items-center text-center'>
            <div className="topContent flex flex-col gap-5 text-center items-center justify-center w-[60%] " >
               <span className='text-orange-400 mt-[100px]'>Our Expert Doctors Committed to Your Health and Well-being</span>
               <p className='font-bold text-5xl font-rejoice tracking-wide ' >Consult with Our Esteemed Doctors  Where Excellence Meets Empathy</p>
            </div>
            </div>


            <div className="bottomContent mt-[20px] flex  justify-center items-center gap-5">
                {doctors.map((doctor)=>(
                    <div className="firstDoctor  h-[460px] w-[220px]  rounded-3xl border-solid border-2 ">
                       
                    <div className="firstDoctorImage h-[200px] w-[220px]  rounded-tl-3xl rounded-tr-3xl  ">
                                <img src={doctor.imageurl} alt="" className='w-[220px] h-[200px]  ml-[-2px]  rounded-tl-3xl rounded-tr-3xl object-cover' />
                           </div>
                           <div className="firstDoctorDetails mt-[10px]  h-[230px] w-[220px]  items-center rounded-3xl ">
                               <div className="nameLikes flex gap-14  text-center justify-between px-4 ">
                                      <small className='text-[#007BA7]  font-rejoice'>{doctor.name}</small>
                                      <button className='button rounded-full bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-center  items-center px-2 -py-2 flex  gap-1.5' >
                                          <FontAwesomeIcon icon={faHeart} className='text-white size-2.5'></FontAwesomeIcon>
                              <small className='text-[11px] text-white '>  {doctor.likes}</small>       </button>
                               </div>
    
                               <div className="doctorDetails h-[150px] w-[220px]  pl-4 mt-[5px]">
                                              <small className='font-rejoice  leading-[1px]'>{doctor.content}</small>
                               </div>
    
                               <div className="clickMe mt-[4px] flex justify-center items-center py-3">
                                  <button className='button rounded-md border-solid border-2 border-[#007BA7] text-[#007BA7]  text-center px-7 py-1  font-rejoice' >Select</button>
                               </div>
                          
                           </div>
               </div>
                ))}
            </div>
            <div className="detailView  items-center  mt-5 text-center">
            <button className='bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white py-3 px-1 rounded-full w-[150px] font-rejoice '>View All</button>
            </div>

 
</div>
    
    

  )
}

export default Doctors