'use client';
import React, { useState } from 'react'
const Packagepage = () => {

    const packs=[
        {
            name:'Basic  Package',
            price:'50',
            benefits:'Basic treatment plan for 12 months, includes 1 consultation, 1 prescription, and 1 visit',
        },
         {
            name:'Standard Package',
            price:'150',
            benefits:'Standard treatment plan for 24 months, includes 3 consultations, 2 prescriptions, and 2 visits',
        },
         {
            name:'Premium Package',
            price:'300',
            benefits:'Premium treatment plan for 36 months, includes 6 consultations, 3 prescriptions, and 3 visits',
        },
    ]
    const[status,setstatus] =useState(false)
    
    const textdisplay =()=>{
        console.log(status)
        setstatus((some)=>{ 
            return !some
        })
    }
  return (
    
    <div className='h-[130vh] justify-center items-center flex flex-col gap-5 '>
        <div className="topcontent flex flex-col gap-3 justify-center items-center text-center ">
            <h1  className='font-medium text-orange-400 font-rejoice'>
            Monthly Treatment Plans
            </h1>
            <h1 className='font-extrabold font-rejoice text-5xl w-[45%] h-[200px]'>Unlock Continuous Care with Our Expertly Curated Monthly Plans</h1>
        </div>
        <div className="middlecontent bg-white rounded-full  drop-shadow-lg h-[50px] w-[200px] text-center font-medium  text-white items-center flex gap-8 px-2 mb-7">
                
                <div className='bg-white rounded-3xl p-1 cursor-pointer bg-gradient-to-r from-[#4DA1A9] to-[#007BA7]' onClick={textdisplay}>
                <h1 className=' w-[80px] h-[25px]  text-white ' >
                    Monthly
                </h1>
                
                </div>
                <h2 className='text-black/50'>
                    Yearly
                </h2>
        </div>
        <div className="bottomcontent flex gap-5 ">
                {packs.map((pack,key)=>(
                    <div key={key} className="card w-[270px] h-[400px]   flex flex-col text-center p-5 items-center justify-between rounded-3xl font-rejoice shadow-2xl">
                    <div className='flex flex-col gap-4'>
                    <h1 className='text-4xl'>{pack.name}</h1>
                    <h2>{pack.benefits}</h2>
                    </div>

                <div>
                <h1 className='justify-center items-center p-[0px] text-3xl flex gap-3 py-10'><small className='text-sm'>$</small> <b>{pack.price} </b> <small> /</small> <small>Month</small></h1>

                <div className="p-[1px] bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] rounded-xl">
    <button className="bg-white px-5 py-2 rounded-xl w-full">
        Get Started
    </button>
    </div>  
</div>

                </div>
                ))}
        </div>
    </div>
  )
}

export default Packagepage