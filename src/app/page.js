"use client";
import dynamic from "next/dynamic";
import Nav from "../components/Nav";

// Import original components
const EnhancedHero = dynamic(() => import("@/components/EnhancedHero"), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), { ssr: false });
const SecondPage = dynamic(() => import("@/components/SecondPage"), { ssr: false });
const Fourthpage = dynamic(() => import("@/components/Fourthpage"), { ssr: false });
const Doctors = dynamic(() => import("@/components/Doctors"), { ssr: false });
const AgencyBanner = dynamic(() => import("@/components/AgencyBanner"), { ssr: false });
const Packagepage = dynamic(() => import("@/components/Packagepage"), { ssr: false });

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen relative overflow-x-hidden">
      <Nav />
      <div className="w-full">
        <EnhancedHero />
        <ServicesSection />
        <SecondPage />
        <Fourthpage />
        <Doctors />
        <AgencyBanner />
        <Packagepage />

        <Footer />
      </div>
    </div>
  );
}
