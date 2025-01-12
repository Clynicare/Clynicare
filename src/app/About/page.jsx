import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React from 'react'

export const Page = () => {
  return (
    <div>
    <Nav></Nav>
         
        <div className="aboutUS h-[280vh] w-[100%]">
          <div className="aboutimage ">
             <img src="/images/abouttwo.jpg" alt="" className='w-[100%] h-[60vh] object-cover ml-[-2px] relative rounded-tl-3xl rounded-tr-3xl' />       
             <h1 className='absolute text-gray-500 top-[27%] left-[40%] z-10 font-rejoice text-[80px] '  > About Us</h1>
          </div>

          <div className="aboutContent flex flex-col gap-[30px]">

                     <div className="aboutContentOne h-[70vh] w-[100%] px-[100px] flex py-[50px] gap-[30px] ">
                           
                         <div className="contentOne h-[100%] w-[50%]  p-3  font-rejoice flex flex-col gap-[20px] ">
                         <h1 className='text-[40px] ' > Our Mission</h1>
                         <p>    <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Patient-Centered Care</span>: "Our mission is to provide accessible, timely, and
                              compassionate nursing care to all our patients through a seamless
                              appointment system, ensuring every patient feels heard, cared for, and
                              satisfied with their healthcare experience."</p>

                          <p> <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Innovation in Healthcare</span> : "We aim to revolutionize the way nurse
                                appointments are managed by integrating cutting-edge technology that
                                optimizes efficiency, enhances nurse-patient communication, and improves
                                health outcomes."</p> 

                                <p> <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Community Health</span> : "Our mission is to serve our community by offering
                                    convenient, comprehensive nurse-led health services in a welcoming
                                    environment, fostering healthier lives across all ages and backgrounds."</p>   
                         </div>

                         <div className="imageOne  h-[100%] w-[50%]   className='object-cover ">
                                      
                                      <img className=' rounded-xl' src="/images/aboutimgone.jpg" alt="" />
                         </div>
                       
                     </div>

                     <div className="aboutContentTwo h-[70vh] w-[100%] px-[100px] flex py-[50px] gap-[30px]">

                     <div className="imageOne  h-[100%] w-[50%]   className='object-cover ">
                                      
                                      <img className=' rounded-xl' src="/images/aboutimgone.jpg" alt="" />
                         </div>
                           
                         <div className="contentOne h-[100%] w-[50%]  p-3  font-rejoice flex flex-col gap-[20px] ">
                         <h1 className='text-[40px] ' >Our Approach  </h1>
                         <p>    <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Patient-Centered Care</span>: "Our mission is to provide accessible, timely, and
                              compassionate nursing care to all our patients through a seamless
                              appointment system, ensuring every patient feels heard, cared for, and
                              satisfied with their healthcare experience."</p>

                          <p> <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Our Approach </span> : "We aim to revolutionize the way nurse
                                appointments are managed by integrating cutting-edge technology that
                                optimizes efficiency, enhances nurse-patient communication, and improves
                                health outcomes."</p> 

                                <p> <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Community Health</span> : "Our mission is to serve our community by offering
                                    convenient, comprehensive nurse-led health services in a welcoming
                                    environment, fostering healthier lives across all ages and backgrounds."</p>   
                         </div>

                        
                       
                     </div>

                     <div className="aboutContentThird h-[70vh] w-[100%] px-[100px] flex py-[50px] gap-[30px] ">
                           
                         <div className="contentOne h-[100%] w-[50%]  p-3  font-rejoice flex flex-col gap-[20px] ">
                         <h1 className='text-[40px] ' >Our Process</h1>
                         <p>    <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Patient-Centered Care</span>: "Our mission is to provide accessible, timely, and
                              compassionate nursing care to all our patients through a seamless
                              appointment system, ensuring every patient feels heard, cared for, and
                              satisfied with their healthcare experience."</p>

                          <p> <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Innovation in Healthcare</span> : "We aim to revolutionize the way nurse
                                appointments are managed by integrating cutting-edge technology that
                                optimizes efficiency, enhances nurse-patient communication, and improves
                                health outcomes."</p> 

                                <p> <span className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Community Health</span> : "Our mission is to serve our community by offering
                                    convenient, comprehensive nurse-led health services in a welcoming
                                    environment, fostering healthier lives across all ages and backgrounds."</p>   
                         </div>

                         <div className="imageOne  h-[100%] w-[50%]   className='object-cover ">
                                      
                                      <img className=' rounded-xl' src="/images/aboutimgone.jpg" alt="" />
                         </div>
                       
                     </div>

                     

          </div>
        
        </div>

      <Footer></Footer>
      
    </div>
  )
}

export default Page
