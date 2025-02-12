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
            Terms & Conditions
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
              <p>Welcome to Clynicare.</p>
              <p>By accessing or using our platform and services,</p>
              <p> you agree to comply with and be bound</p>
              <p>by the following terms and conditions.</p>
            </div>
            <div className='border-l border-gray-300 hidden md:block'></div>
            <div className='rightSide w-full md:w-3/4 px-3 md:px-5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 pr-4 gap-6 space-y-4 text-sm md:text-base'>

            <h4 className='text-lg'>Introduction</h4>
              <p className='text-black/50'>
              Welcome to Clynicare. By accessing or using our platform and services, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h4 className='text-lg'>Services Provided</h4>
              <p className='text-black/50'>
              Clynicare connects individuals with qualified paramedical professionals for home-based medical services, including but not limited to wound dressing, blood tests, and other essential care.
              </p>
              <h4 className='text-lg'>User Responsibilities</h4>
              <p className='text-black/50'>
              Accurate Information: Users must provide truthful and up-to-date information during registration and service requests.
              </p>
              <p className='text-black/50'>
              Compliance: Users agree to adhere to all applicable laws and regulations when using the platform
              </p>

              <h4 className='text-lg'>Booking and Appointments</h4>
              <p className='text-black/50'>
              Process: Appointments can be scheduled, modified, or canceled through our online platform.
              </p>
              <p className='text-black/50'>
              Cancellations: Users are advised to review our cancellation policy, which may include fees for late cancellations or no-shows.
              </p>

              <h4 className='text-lg'>Payment Terms</h4>
              <p className='text-black/50'>
              Fees: Service fees are outlined during the booking process.
              </p>
              <p className='text-black/50'>
              Payment Methods: We accept various payment methods as specified on our platform.
              </p>

              <h4 className='text-lg'>Privacy and Data Protection</h4>
              <p className='text-black/50'>
              Data Collection: We collect personal data to provide and improve our services.
              </p>
              <p className='text-black/50'>
              Security: Clynicare implements measures to protect user data; however, absolute security cannot be guaranteed.
              </p>


              <h4 className='text-lg'>Limitation of Liability</h4>
              <p className='text-black/50'>
              Clynicare is not liable for any indirect, incidental, or consequential damages arising from the use of our services.
              </p>


              
              <h4 className='text-lg'>Termination</h4>
              <p className='text-black/50'>
              We reserve the right to suspend or terminate user accounts for violations of these terms.
              </p>

              <h4 className='text-lg'>Changes to Terms</h4>
              <p className='text-black/50'>
              Clynicare may update these terms periodically. Continued use of the platform constitutes acceptance of any changes.
              </p>

              <h4 className='text-lg'>Governing Law</h4>
              <p className='text-black/50'>
              These terms are governed by the laws of the jurisdiction in which Clynicare operates.
              </p>
              <p className='text-black/50'>
              By using Clynicare's services, you acknowledge that you have read, understood, and agree to these terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
