// [#4DA1A9]
export default function Nav(){
    return (
        <section className="container fixed md:px-[100px] bg-transparent text-black py-[15px] backdrop-blur-md  z-50  w-[100%] ">
            <div className="flex justify-between items-center ">
                <div >
                <h1 className="font-rejoice font-bold text-4xl tracking-normal bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text">CLYNICARE</h1>
                </div>
                <div className="hidden md:flex font-rejoice ">    
                    <ul className="flex  w-[500px] justify-evenly text-gray-500">
                        <li className=""> <a href="/Hero">Home</a> </li>
                        <li> <a href="#">Services</a> </li>
                        <li> <a href="/About">About Us</a> </li>
                        <li> <a href="#">Contact Us</a> </li>  
                        <li> <a href="#">Help</a> </li>  
                    </ul>
                </div>
            </div>

        </section>
    )
}