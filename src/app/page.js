
"use client";
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
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import AnimatedSection from "@/components/Animated_section";
export default function Home() {
  const [loading,setloading]=useState(false)
  useEffect(()=>{
   const timer=setTimeout(() => {
      setloading(false)
   }, 2000);

   return ()=> clearTimeout(timer)
  },[])
  return (
    
   <div className="font-sans">
    {loading ? 
  <Loading/> : (<><Hero></Hero>
    <AnimatedSection>
    <SecondPage></SecondPage>
    </AnimatedSection>
    <AnimatedSection>
    <Fourthpage></Fourthpage>
    </AnimatedSection>
    <AnimatedSection>
    <Doctors></Doctors>
    </AnimatedSection>
    <AnimatedSection>
    <Packagepage></Packagepage>
    </AnimatedSection>
    <AnimatedSection>

    </AnimatedSection>
    <Footer></Footer></> )
    
  }
   </div>
  
   
  );
}
