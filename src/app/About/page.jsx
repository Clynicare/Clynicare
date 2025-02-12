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
              'Enhance Accessibility: To make essential medical services readily available to individuals in their homes, reducing the need for hospital visits.',
              'Promote Preventative Care: By offering regular health check-ups and monitoring, we aim to prevent potential health issues before they become critical.',
              'Support Paramedical Professionals: We provide opportunities for paramedical students and professionals to apply their skills and gain valuable experience.'
            ],
            image: '/images/aboutimgone.jpg',
            reverse: false
          }, {
            title: 'Our Approach',
            text: [
              'User-Friendly Platform: Our intuitive platform allows users to easily book services, manage appointments, and communicate with healthcare providers.',
              'Quality Assurance: We implement strict vetting processes to ensure that all paramedical professionals meet our high standards of care.',
              'Continuous Improvement: We regularly gather feedback from users to refine our services and better meet the evolving needs of our community.'
            ],
            image: '/images/aboutimgone.jpg',
            reverse: true
          }, {
            title: 'Our Process',
            text: [
              'Easy Booking: Sign up on our platform, browse available services, and schedule an appointment at your convenience.',
              'Personalized Care: A qualified paramedical professional visits your home to provide the selected medical service, ensuring personalized attention.',
              'Follow-Up Support: After the service, we offer follow-up support and resources to assist with your ongoing health and wellness journey.'
            ],
            image: '/images/fourthTwo.jpg',
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
