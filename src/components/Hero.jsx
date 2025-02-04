import Nav from './Nav'; 
import MainContent from './MainContent';

export default function Hero() {
    return (
        <section className="bg-[radial-gradient(ellipse_300%_100%_at_bottom_center,#007BA7,white_90%)] min-h-screen overflow-hidden">
            <Nav />
            <div className="pt-20 md:pt-0 flex flex-col md:flex-row justify-between items-center md:items-start px-5 md:px-0">
                {/* Main Content */}
                <div className="maincontent relative z-10 md:ml-[200px] md:top-[200px] w-full md:w-[600px] flex flex-col gap-5 font-rejoice text-center md:text-left mt-10 md:mt-0">
                    <div className="heading text-black">
                        <span className='font-bold text-3xl md:text-5xl leading-tight md:leading-[50px]'>
                            Expert Care Made <br className='hidden md:block' /> Easy: Book Trusted Professionals Anytime, Anywhere
                        </span>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm md:text-base'>
                            Seamless healthcare at your doorstep—skilled care, <br className='hidden md:block' /> easy booking, and your well-being prioritized.
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row bg-white w-full max-w-[300px] md:max-w-[400px] gap-2 md:gap-[20px] rounded-3xl p-2 md:p-3 items-center md:items-stretch mx-auto md:mx-0'>
                        <input 
                            type="text" 
                            className='border-none focus:outline-none px-2 md:px-3 w-full md:w-auto text-center md:text-left rounded-lg md:rounded-full py-1 md:py-0 text-xs md:text-base ' 
                            placeholder='Enter your Email Here' 
                        />
                        <button className='bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white p-2 md:p-3 rounded-full w-full md:w-[200px] text-xs md:text-base'>Book now</button>
                    </div>
                </div>
                
                {/* Landing Image */}
                <div className="landingImage mt-10 md:mt-[100px] flex justify-center">
                    <img src='/images/Land.png' width={300} height={300} className='w-[90%] md:w-[900px] h-auto' />
                </div>
            </div>
        </section>
    );
}
