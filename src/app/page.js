"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Nav from "../components/Nav";
import Loading from "@/components/Loading";

// Dynamically import components to improve loading times
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const SecondPage = dynamic(() => import("@/components/SecondPage"), { ssr: false });
const AnimatedSection = dynamic(() => import("@/components/Animated_section"), { ssr: false });
const Fourthpage = dynamic(() => import("@/components/Fourthpage"), { ssr: false });
const Doctors = dynamic(() => import("@/components/Doctors"), { ssr: false });
const Packagepage = dynamic(() => import("@/components/Packagepage"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Set loading state for 3 seconds, after which components will be shown
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);  // Set loading duration to 3 seconds
    return () => clearTimeout(timer);  // Clean up timer when component unmounts
  }, []);

  return (
    <div className="font-sans">
      
      <Nav />

      {loading ? (
        <Loading />
      ) : (
        <>
        
          {/* Hero section */}
          <Hero />

          {/* Lazy load other sections with animation */}
          <AnimatedSection>
            <SecondPage />
          </AnimatedSection>

          <AnimatedSection>
            <Fourthpage />
          </AnimatedSection>

          <AnimatedSection>
            <Doctors />
          </AnimatedSection>

          <AnimatedSection>
            <Packagepage />
          </AnimatedSection>

          {/* Footer section */}
          <Footer />
        </>
      )}
    </div>
  );
}
