

import Image from "next/image";
import Nav from '../components/Nav'
import Hero from "@/components/Hero";
import SecondPage from "@/components/SecondPage";
import './fontawesome';
import Thirdpage from "@/components/Thirdpage";
import Fourthpage from "@/components/Fourthpage";
import  FifthContent  from "@/components/FifthContent";
import Doctors from "@/components/Doctors";
import Fourthinverse from "@/components/Forthinverse";
import Packagepage from "@/components/Packagepage";
import Footer from "@/components/Footer";
// import Page from '@/app/Services/Page'
import ContactForm from "@/components/ContactForm";
export default function Home() {
  return (
   <>
    <Hero></Hero>
    <SecondPage></SecondPage>
    
    <Fourthpage></Fourthpage>
    
    <Doctors></Doctors>
    <Packagepage></Packagepage>
    <Footer></Footer>
    
    
   </>
   
  );
}
