import React from 'react'
import Image from 'next/image'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Doctors = () => {

  return (
<div className=' doctorsPage w-[100%] h-[200vh] mt-5 px-[100px] '  >

            <div className="topContent flex flex-col gap-5 text-center " >
               <span className='text-orange-400 mt-[100px]'>Our Expert Doctors Committed to Your Health and Well-being</span>
               <p className='font-bold text-5xl font-rejoice tracking-wide ' >Consult with Our Esteemed Doctors <br/> Where Excellence Meets Empathy</p>
            </div>


            <div className="bottomContent mt-[20px] flex  ">
                <div className="firstDoctor  h-[430px] w-[220px]  ml-[70px] rounded-3xl border-solid border-2 ">
                       
                       <div className="firstDoctorImage h-[200px] w-[220px]  rounded-tl-3xl rounded-tr-3xl  ">
                            <img src="/images/doctorOne.jpg" alt="" className='w-[220px] h-[200px]  ml-[-2px]  rounded-tl-3xl rounded-tr-3xl' />
                       </div>
                       <div className="firstDoctorDetails mt-[10px]  h-[230px] w-[220px]  items-center text-center rounded-3xl ">
                           <div className="nameLikes flex gap-14  text-center justify-center ">
                                  <small className='text-[#007BA7]  font-rejoice'>Sophia Martinez</small>
                                  <button className='button rounded-full bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-center  items-center px-2 -py-2 flex gap-3' >
                                      <FontAwesomeIcon icon={faHeart} className='text-white size-4'></FontAwesomeIcon>
                          <small>20</small>       </button>
                           </div>

                           <div className="doctorDetails h-[150px] w-[220px]bg-purple-600 text-left mt-[5px]">
                                          <small className='font-rejoice  leading-[1px]'>Sophia Martinez is a dedicated
                                                 Registered Nurse with over 10 years of
                                                 experience in pediatric care. Her
                                                 passion for helping children thrive is
                                                 evident in her patient care and
                                                 advocacy work. Sophia has ...</small>
                           </div>

                           <div className="clickMe mt-[4px]">
                              <button className='button rounded-md border-solid border-2 border-[#007BA7] text-[#007BA7]  text-center px-7 py-0 ' >Select</button>
                           </div>
                      
                       </div>
           </div>

           <div className="secondDoctor  h-[430px] w-[220px]  ml-[100px] mt-[50px] rounded-3xl border-solid border-2 ">
                       
                       <div className="firstDoctorImage h-[200px] w-[220px]  rounded-tl-3xl rounded-tr-3xl  ">
                            <img src="/images/doctorTwo.jpg" alt="" className='w-[220px] h-[200px]  ml-[-2px]  rounded-tl-3xl rounded-tr-3xl' />
                       </div>
                       <div className="firstDoctorDetails mt-[10px]  h-[230px] w-[220px]  items-center text-center rounded-3xl ">
                           <div className="nameLikes flex gap-14  text-center justify-center ">
                                  <small className='text-[#007BA7]  font-rejoice'>Sophia Martinez</small>
                                  <button className='button rounded-full bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-center  items-center px-2 -py-2 flex gap-3' >
                                      <FontAwesomeIcon icon={faHeart} className='text-white size-4'></FontAwesomeIcon>
                          <small>20</small>       </button>
                           </div>

                           <div className="doctorDetails h-[150px] w-[220px]bg-purple-600 text-left mt-[5px]">
                                          <small className='font-rejoice  leading-[1px]'>Sophia Martinez is a dedicated
                                                 Registered Nurse with over 10 years of
                                                 experience in pediatric care. Her
                                                 passion for helping children thrive is
                                                 evident in her patient care and
                                                 advocacy work. Sophia has ...</small>
                           </div>

                           <div className="clickMe mt-[4px]">
                              <button className='button rounded-md border-solid border-2 border-[#007BA7] text-[#007BA7]  text-center px-7 py-0  ' >Select</button>
                           </div>
                      
                       </div>
           </div>

           <div className="thirdDoctor  h-[430px] w-[220px]  ml-[100px] rounded-3xl border-solid border-2 ">
                       
                       <div className="firstDoctorImage h-[200px] w-[220px]  rounded-tl-3xl rounded-tr-3xl  ">
                            <img src="/images/doctorThree.jpg" alt="" className='w-[220px] h-[200px]  ml-[-2px]  rounded-tl-3xl rounded-tr-3xl' />
                       </div>
                       <div className="firstDoctorDetails mt-[10px]  h-[230px] w-[220px]  items-center text-center rounded-3xl ">
                           <div className="nameLikes flex gap-14  text-center justify-center ">
                                  <small className='text-[#007BA7]  font-rejoice'>Sophia Martinez</small>
                                  <button className='button rounded-full bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-center  items-center px-2 -py-2 flex gap-3' >
                                      <FontAwesomeIcon icon={faHeart} className='text-white size-4'></FontAwesomeIcon>
                          <small>20</small>       </button>
                           </div>

                           <div className="doctorDetails h-[150px] w-[220px]bg-purple-600 text-left mt-[5px]">
                                          <small className='font-rejoice  leading-[1px]'>Sophia Martinez is a dedicated
                                                 Registered Nurse with over 10 years of
                                                 experience in pediatric care. Her
                                                 passion for helping children thrive is
                                                 evident in her patient care and
                                                 advocacy work. Sophia has ...</small>
                           </div>

                           <div className="clickMe mt-[4px] ">
                              <button className='button rounded-md border-solid border-2 border-[#007BA7] text-[#007BA7]  text-center px-7 py-0  ' >Select</button>
                           </div>
                      
                       </div>
           </div>

           <div className="forthDoctor  h-[430px] w-[220px]  ml-[100px] mt-[50px] rounded-3xl border-solid border-2 ">
                       
                       <div className="firstDoctorImage h-[200px] w-[220px]  rounded-tl-3xl rounded-tr-3xl  ">
                            <img src="/images/doctorFour.jpg" alt="" className='w-[220px] h-[200px]  ml-[-2px]  rounded-tl-3xl rounded-tr-3xl' />
                       </div>
                       <div className="firstDoctorDetails mt-[10px]  h-[230px] w-[220px]  items-center text-center rounded-3xl ">
                           <div className="nameLikes flex gap-14  text-center justify-center ">
                                  <small className='text-[#007BA7]  font-rejoice'>Sophia Martinez</small>
                                  <button className='button rounded-full bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-center  items-center px-2 -py-2 flex gap-3' >
                                      <FontAwesomeIcon icon={faHeart} className='text-white size-4'></FontAwesomeIcon>
                          <small>20</small>       </button>
                           </div>

                           <div className="doctorDetails h-[150px] w-[220px]bg-purple-600 text-left mt-[5px]">
                                          <small className='font-rejoice  leading-[1px]'>Sophia Martinez is a dedicated
                                                 Registered Nurse with over 10 years of
                                                 experience in pediatric care. Her
                                                 passion for helping children thrive is
                                                 evident in her patient care and
                                                 advocacy work. Sophia has ...</small>
                           </div>

                           <div className="clickMe mt-[4px]">
                              <button className='button rounded-md border-solid border-2 border-[#007BA7] text-[#007BA7]  text-center px-7 py-0  ' >Select</button>
                           </div>
                      
                       </div>
           </div>



                 
                 


            </div>
            <div className="detailView  items-center  mt-5 text-center">
            <button className='bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white p-3 rounded-full w-[150px] '>View All</button>
            </div>

 
</div>
    
    

  )
}

export default Doctors