"use client";
import { Heart, Shield, Clock, Phone, ArrowRight, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function CTA() {
  return (
    <div className="w-full py-20 lg:py-40 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-200/30 rounded-full blur-xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="flex flex-col text-center bg-white/80 backdrop-blur-lg rounded-3xl p-8 lg:p-16 gap-8 items-center shadow-2xl border border-white/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge with Healthcare Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 text-sm font-medium flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Start Your Health Journey
            </Badge>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-6xl tracking-tight max-w-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
              Experience Healthcare Like Never Before!
            </h3>
            <p className="text-xl leading-relaxed tracking-tight text-gray-600 max-w-3xl mx-auto">
              Join thousands who've transformed their healthcare experience with Clynicare. 
              Get professional nursing care at home, expert consultations online, and 24/7 medical support 
              – all at your fingertips.
            </p>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 my-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="text-blue-700 font-medium">Certified Professionals</span>
            </div>
            <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-cyan-500" />
              <span className="text-cyan-700 font-medium">24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <Heart className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">Trusted by 10,000+</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="w-full gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('tel:+1234567890', '_self')}
              >
                <Phone className="w-5 h-5" />
                Call Now - Free Consultation
              </Button>
            </motion.div>
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                className="w-full gap-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-xl transition-all duration-300"
              >
                <Stethoscope className="w-5 h-5" />
                Book Appointment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicator */}
          <motion.p
            className="text-sm text-gray-500 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            ✨ No hidden fees • Instant booking • 100% satisfaction guaranteed
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export { CTA };
