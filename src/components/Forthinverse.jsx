import Image from 'next/image'
import React from 'react'

const Fourthinverse = () => {
  return (
    <div className="bg-transparent h-[20vh] overflow-hidden   ">
      <div className="flex space-x-16 animate-loop-scroll-inverse object-cover">
        <Image src="/images/forthThree.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/WoundDressing.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/forthThree.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/WoundDressing.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/forthThree.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/WoundDressing.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/forthThree.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        {/* Duplicate images for seamless loop */}
        <Image src="/images/forthThree.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/WoundDressing.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/forthThree.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/WoundDressing.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/forthThree.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/WoundDressing.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
        <Image src="/images/forthThree.jpg" width={300} height={300} alt="Child" className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
      </div>
    </div>
  )
}

export default Fourthinverse