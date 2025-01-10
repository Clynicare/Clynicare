import Image from 'next/image'
import React from 'react'

const Fourthpage = () => {
  return (
    <div className='bg-black h-[50vh] flex space-x-16 animate-loop-scroll'>
        <Image src='/images/child.jpg' width={300} height={300}></Image>
        <Image src='/images/child.jpg' width={300} height={300}></Image>
        <Image src='/images/child.jpg' width={300} height={300}></Image>
        <Image src='/images/child.jpg' width={300} height={300}></Image>
        <Image src='/images/child.jpg' width={300} height={300}></Image>
        <Image src='/images/child.jpg' width={300} height={300}></Image>
        <Image src='/images/child.jpg' width={300} height={300}></Image>
        
    </div>
  )
}

export default Fourthpage