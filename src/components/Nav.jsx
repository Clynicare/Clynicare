// [#4DA1A9]
export default function Nav(){
    return (
        <section className="container md:px-[100px] bg-transparent text-black py-[15px]  ">
            <div className="flex justify-between items-center">
                <div >
                <h1 className="font-poppins font-bold text-4xl">LOGO</h1>
                </div>
                <div className="hidden md:flex font-poppins">    
                    <ul className="flex  w-[500px] justify-evenly">
                        <li className=""> <a href="#">Nothing</a> </li>
                        <li className=""> <a href="#">Home</a> </li>
                        <li> <a href="#">Home</a> </li>
                        <li> <a href="#">Home</a> </li>
                        <li> <a href="#">Home</a> </li>  
                    </ul>
                </div>
            </div>

        </section>
    )
}