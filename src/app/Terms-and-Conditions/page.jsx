import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React from 'react'

export default function page() {
  return (
    <div>
           <Nav></Nav>
           <div className='Terms-and-Conditions h-[170vh] w-[100%]  '>

              <div className="aboutimage ">
                <img src="/images/abouttwo.jpg" alt="" className='w-[100%] h-[60vh] object-cover ml-[-2px] relative rounded-tl-3xl rounded-tr-3xl' />       
                <h1 className='absolute text-gray-500 top-[27%] left-[27%] z-10 font-rejoice text-[80px] '  > Terms & Conditions</h1>
                </div>
                <div className="start h-[110vh] w-[100%] md:px-[100px]  ">
                   
                       <div className="termsDate  py-[30px] flex flex-row justify-between    ">
                          <span className=''> Marvel Infusion Terms & Conditions</span>
                          <span className='text-black/50'>Effective Janaury 12, 2025</span>
                      </div>

                      <hr />
                         
                      <div className="T&C  w-[100%] h-[80vh] flex flex-row  mt-[60px] ">
                           
                           <div className="leftSide h-[80vh] w-[25%]  flex flex-col gap-3  px-5  ">
                                   <p  className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Introduction</p>
                                   <p>Your relationship with Marvel Infusion</p>
                                   <p>Content in Marvel Infusion services</p>
                                   <p>In case of problems or disagreements</p>
                                   <p>About these terms</p>
                           </div>
                           <div className="border-l border-gray-300 h-[80vh]   "></div>
                           <div className="rightSide  h-[80vh] w-[75%] px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 pr-4 gap-6 space-y-4">
                                     
                                    <h4 className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
                                       <p className='text-black/50 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                                        survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized
                                        in the 1960s with the release of Letterset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                        software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                       <p className='text-black/50'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                         text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                                         survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized
                                         in the 1960s with the release of Letterset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                         software like Aldus PageMaker including versions of Lorem Ipsum.</p>   

                                        <h4 className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
                                       <p className='text-black/50'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                                        survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized
                                        in the 1960s with the release of Letterset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                        software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                       <p className='text-black/50'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                         text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                                         survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized
                                         in the 1960s with the release of Letterset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                         software like Aldus PageMaker including versions of Lorem Ipsum.</p>     

                                         <h4  className= 'text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
                                       <p className='text-black/50'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                                        survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized
                                        in the 1960s with the release of Letterset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                        software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                       <p className='text-black/50'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                         text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                                         survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized
                                         in the 1960s with the release of Letterset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                         software like Aldus PageMaker including versions of Lorem Ipsum.</p>     
  

                
                           </div>

                      </div>
                </div>
           </div>
  
               <Footer></Footer>
    </div>
  )
}
