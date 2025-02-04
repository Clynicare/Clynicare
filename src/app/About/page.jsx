import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Nav />
      <div className='aboutUS min-h-screen w-full'>
        <div className='relative'>
          <img 
            src='/images/abouttwo.jpg' 
            alt='About' 
            className='w-full h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover rounded-tl-3xl rounded-tr-3xl' 
          />
          <h1 
            className='absolute text-gray-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            z-10 font-rejoice text-3xl sm:text-4xl md:text-6xl text-center'
          >
            About Us
          </h1>
        </div>
        <div className='aboutContent flex flex-col gap-12 px-4 sm:px-6 md:px-[100px] py-10'>
          {[{
            title: 'Our Mission',
            text: [
              'Our mission is to provide accessible, timely, and compassionate nursing care to all our patients through a seamless appointment system.',
              'We aim to revolutionize the way nurse appointments are managed by integrating cutting-edge technology.',
              'Our mission is to serve our community by offering convenient, comprehensive nurse-led health services.'
            ],
            image: '/images/aboutimgone.jpg',
            reverse: false
          }, {
            title: 'Our Approach',
            text: [
              'We ensure every patient feels heard, cared for, and satisfied with their healthcare experience.',
              'Our approach focuses on enhancing nurse-patient communication and improving health outcomes.',
              'We foster healthier lives across all ages and backgrounds through our services.'
            ],
            image: '/images/aboutimgone.jpg',
            reverse: true
          }, {
            title: 'Our Process',
            text: [
              'We provide accessible and compassionate nursing care with seamless appointment scheduling.',
              'Our process optimizes efficiency, improves health outcomes, and enhances patient experience.',
              'We prioritize community health by offering reliable and professional home healthcare services.'
            ],
            image: '/images/aboutimgone.jpg',
            reverse: false
          }].map((section, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${section.reverse ? 'md:flex-row-reverse' : ''}`}
            >
              <div className='w-full md:w-1/2 flex flex-col gap-4'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>{section.title}</h1>
                {section.text.map((paragraph, i) => (
                  <p key={i} className='text-gray-600'>{paragraph}</p>
                ))}
              </div>
              <div className='w-full md:w-1/2'>
                <img src={section.image} alt={section.title} className='w-full h-auto rounded-xl' />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
