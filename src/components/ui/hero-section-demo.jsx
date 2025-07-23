"use client";

import { HeroSection } from "@/components/ui/hero-section";
import { Icons } from "@/components/ui/icons";

export function HeroSectionDemo() {
  return (
    <HeroSection
      badge={{
        text: "Your health, our priority",
        action: {
          text: "Book an appointment",
          href: "/appointments",
        },
      }}
      title="Comprehensive Healthcare, Personalized for You"
      description="Clynicare connects you with expert doctors and modern medical care—anytime, anywhere. Book appointments, access your records, and manage your health with ease."
      actions={[
        {
          text: "Get Started",
          href: "/signup",
          variant: "default",
          icon: <Icons.stethoscope className="h-5 w-5" />,
        },
        {
          text: "Learn More",
          href: "/about",
          variant: "glow",
          icon: <Icons.arrowRight className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        dark: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80",
        alt: "Healthcare professionals with patient",
      }}
    />
  );
}
