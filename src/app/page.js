"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Nav from "../components/Nav";
import Loading from "@/components/Loading";
import ParallaxBackground from "@/components/ParallaxBackground";
import ParallaxWrapper from "@/components/ParallaxWrapper";

// Dynamically import components to improve loading times
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), { ssr: false });
const SecondPage = dynamic(() => import("@/components/SecondPage"), { ssr: false });
const AnimatedSection = dynamic(() => import("@/components/Animated_section"), { ssr: false });
const Fourthpage = dynamic(() => import("@/components/Fourthpage"), { ssr: false });
const Doctors = dynamic(() => import("@/components/Doctors"), { ssr: false });
const Packagepage = dynamic(() => import("@/components/Packagepage"), { ssr: false });
const CTA = dynamic(() =>
  import("@/components/ui/call-to-action").then((mod) => mod.CTA),
  { ssr: false }
);

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Set loading state for 3 seconds, after which components will be shown
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);  // Set loading duration to 500ms
    return () => clearTimeout(timer);  // Clean up timer when component unmounts
  }, []);

  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen relative">
      {/* Parallax Background Elements */}
      <ParallaxBackground />
      
      <Nav />

      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Hero section with parallax */}
          <ParallaxWrapper speed={0.3} direction="up" backgroundElements={true}>
            <Hero />
          </ParallaxWrapper>

          {/* Services Section with parallax */}
          <ParallaxWrapper speed={0.5} direction="scale" className="relative z-10">
            <ServicesSection />
          </ParallaxWrapper>

          {/* Lazy load other sections with parallax animation */}
          <ParallaxWrapper speed={0.4} direction="up" backgroundElements={true}>
            <AnimatedSection>
              <SecondPage />
            </AnimatedSection>
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.6} direction="down" className="relative z-10">
            <AnimatedSection>
              <Fourthpage />
            </AnimatedSection>
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.3} direction="scale" backgroundElements={true}>
            <AnimatedSection>
              <Doctors />
            </AnimatedSection>
          </ParallaxWrapper>

          <ParallaxWrapper speed={0.5} direction="up" className="relative z-10">
            <AnimatedSection>
              <Packagepage />
            </AnimatedSection>
          </ParallaxWrapper>

          {/* Call to Action section with parallax */}
          <ParallaxWrapper speed={0.4} direction="scale" backgroundElements={true}>
            <CTA />
          </ParallaxWrapper>

          {/* Footer section with parallax */}
          <ParallaxWrapper speed={0.2} direction="up" className="relative z-20">
            <Footer />
          </ParallaxWrapper>
        </>
      )}
    </div>
  );
}
