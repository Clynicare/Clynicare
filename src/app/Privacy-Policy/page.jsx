import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Nav />
      <div className='Terms-and-Conditions min-h-screen w-full'>
        <div className='relative'>
          <img 
            src='/images/abouttwo.jpg' 
            alt='About' 
            className='w-full h-[50vh] md:h-[60vh] object-cover rounded-tl-3xl rounded-tr-3xl' 
          />
          <h1 
            className='absolute text-gray-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            z-10 font-rejoice text-4xl md:text-6xl text-center'
          >
          Privacy Policy
          </h1>
        </div>
        <div className='start w-full px-6 md:px-[100px] py-10'>
          <div className='termsDate py-5 flex flex-col md:flex-row justify-between text-sm md:text-base'>
            <span>Marvel Infusion Terms & Conditions</span>
            <span className='text-black/50'>Effective January 12, 2025</span>
          </div>
          <hr />
          <div className='T&C flex flex-col md:flex-row mt-10 gap-6'>
            <div className='leftSide w-full md:w-1/4 flex flex-col gap-3 text-sm md:text-base px-3 md:px-5'>
              <p className='bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text'>Introduction</p>
              <p>Clynicare is committed to safeguarding your personal information.</p>
              <p> This Privacy Policy outlines how we collect, use, disclose, and protect your data when you use our services.</p>
            
            </div>
            <div className='border-l border-gray-300 hidden md:block'></div>
            <div className='rightSide w-full md:w-3/4 px-3 md:px-5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 pr-4 gap-6 space-y-4 text-sm md:text-base'>

              <h4 className='text-lg'> Information We Collect</h4>
              <p className='text-black/50'>
              Personal Identification Information: Name, address, email, phone number, and other contact details. </p>
              <p className='text-black/50'>
              Health Information: Medical history, treatment plans, and other relevant health data necessary for providing our services. </p>
              <p className='text-black/50'>
              Usage Data: Information on how you interact with our platform, including IP addresses, browser types, and access times.</p>


              <h4 className='text-lg'> How We Use Your Information</h4>
              <p className='text-black/50'>
              Service Delivery: To provide and manage our home-based medical services.
              </p>
              <p className='text-black/50'>
              Communication: To contact you with updates, reminders, and other relevant information.
              </p>
              <p className='text-black/50'>
              Improvement: To enhance our platform and services based on user feedback and usage patterns.
              </p>



              <h4 className='text-lg'> Information Sharing and Disclosure</h4>
              <p className='text-black/50'>
              With Service Providers: We may share your information with paramedical professionals and other third parties involved in delivering our services.
              </p>
              <p className='text-black/50'>
              Legal Requirements: We may disclose your information if required by law or to protect our rights and safety.
              </p>


              <h4 className='text-lg'>Data Security</h4>
              <p className='text-black/50'>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security..
              </p>
              

              <h4 className='text-lg'> Your Rights</h4>
              <p className='text-black/50'>
              Access: You have the right to request copies of your personal information.
              </p>
              <p className='text-black/50'>
              Correction: You may request corrections to any inaccurate or incomplete information.
              </p>
              <p className='text-black/50'>
              Deletion: You can request the deletion of your personal data, subject to certain conditions.
              </p>



              <h4 className='text-lg'> Changes to This Privacy Policy</h4>
              <p className='text-black/50'>
              Clynicare may update this Privacy Policy periodically. We will notify you of any significant changes by posting the new policy on our platform.
              </p>


              
              <h4 className='text-lg'>Contact Us</h4>
              <p className='text-black/50'>
              If you have any questions or concerns about this Privacy Policy, please contact us at [contact information].
              </p>
              <p className='text-black/50'>
              By using Clynicare's services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
              </p>

             
            

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
