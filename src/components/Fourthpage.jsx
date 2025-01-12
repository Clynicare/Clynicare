import Image from 'next/image'
import React from 'react'

const Fourthpage = () => {
  return (
    <div className="bg-transparent h-[30vh] overflow-hidden">
    <div className="flex space-x-16 animate-loop-scroll object-cover">
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      {/* Duplicate images for seamless loop */}
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/child.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
      <Image src="/images/serviceOne.jpg" width={300} height={300} alt="Child" />
    </div>
    </div>
  )
}

export default Fourthpage