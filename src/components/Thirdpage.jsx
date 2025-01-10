import Image from 'next/image'
import React from 'react'

const Thirdpage = () => {
  return (
    <div className='h-[150vh] bg-[radial-gradient(ellipse_300%_500%_at_top_right,#007aa79d,white_30%)] flex flex-col gap-10 '>
        <div className="topcontent flex  flex-col text-center justify-center items-center gap-6">    
<span className='text-orange-400 mt-[100px]'> List of therapies</span>

<h1 className='font-bold text-5xl font-rejoice'>Explore Our Wide Secturum <br /> Of Professional Therapeutic Services</h1>
<p className='text-black/50 font-rejoice font-light'>Embark on a journey toward holistic health with our Expertly designed therapies,each tailored to nourish your mind,<br />body and soul. Our specialized services offer a comprehensive approach to well being addressing your unique needs and goals.</p>
        </div>
        <div className="bottomcontent flex">
            <div className="leftcontent w-[50%] h-[500px] p-[100px] flex flex-col gap-4 font-rejoice">
                <h1 className='font-bold font-rejoice text-2xl'>Stomach Flu IV</h1>
                <p className='font-semibold  '>This is the name of the product </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis deleniti cumque harum a quos modi provident, quidem officia aspernatur sed eos maiores cum reprehenderit ut, suscipit repellendus obcaecati ratione! Dolor?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis deleniti cumque harum a quos modi provident, quidem officia aspernatur sed eos maiores cum reprehenderit ut, suscipit repellendus obcaecati ratione! Dolor?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis deleniti cumque harum a quos modi provident, quidem officia aspernatur sed eos maiores cum reprehenderit ut, suscipit repellendus obcaecati ratione! Dolor?</p>
                    <div className="buttonandtime flex items-center gap-4">
                    <button className='bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white p-3 rounded-full w-[200px] '>Schedule a Time</button>
                        <p>$200/Session | 1hr 30mins</p>
                    </div>
            </div>
            <div className="rightcontent w-[50%]  h-[500px] text-white flex justify-center items-center bg-blacks">
                <Image src='/images/Nurse.jpg' width={300} height={300} className='mix-blend-multiply'></Image>
                </div>

        </div>
    </div>
  )
}

export default Thirdpage