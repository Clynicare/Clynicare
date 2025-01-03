import Nav from './Nav'

import MainContent from './MainContent';
import Elements from './elements';


export default function Hero(){
    return (
        <section className=" bg-[radial-gradient(ellipse_300%_100%_at_bottom_center,#007BA7,white_90%)] h-[120vh]">
            <Nav></Nav>
            <div>
                <MainContent></MainContent>
                    <Elements></Elements>
            </div>
        </section>
    )
}