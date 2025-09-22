"use client";

import React, { useState, useMemo } from "react";
import { Check, Sparkles, Crown, Zap, Shield, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/moving-border";

const packs = [
  {
    name: 'Basic Care',
    subtitle: 'Essential Healthcare',
    price: { monthly: 800, yearly: 8000 },
    originalPrice: { monthly: 1500, yearly: 15000 },
    benefits: [
      'Basic feeding assistance',
      'Medication reminders',
      'Light mobility aid & transfers',
      'Hygiene support (bathing, diaper changes)',
      '24/7 Phone Support'
    ],
    featured: false,
    icon: Shield,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    borderGradient: 'from-blue-200 to-cyan-200',
  },
  {
    name: 'Advanced Care',
    subtitle: 'Professional Healthcare',
    price: { monthly: 1800, yearly: 18000 },
    originalPrice: { monthly: 2500, yearly: 25000 },
    benefits: [
      'Medication administration (oral, topical)',
      'Wound care & dressing changes',
      'Compression stocking application',
      'Catheter & ostomy care',
      'Pain management assistance',
      'Priority Support'
    ],
    featured: true,
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    borderGradient: 'from-purple-200 to-pink-200',
  },
  {
    name: 'Total Care',
    subtitle: 'Premium Healthcare',
    price: { monthly: 3200, yearly: 32000 },
    originalPrice: { monthly: 4500, yearly: 45000 },
    benefits: [
      'Injection administration (Insulin, B12, etc.)',
      'IV Drip setup & monitoring',
      'Vital sign monitoring (BP, oxygen, heart rate)',
      'Physical therapy support',
      'Emergency medical response',
      'Dedicated Care Manager'
    ],
    featured: false,
    icon: Zap,
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    borderGradient: 'from-emerald-200 to-teal-200',
  },
];

const Packagepage = React.memo(() => {
  const [isMonthly, setIsMonthly] = useState(true);

  const getMonthlyPrice = (pack) => (isMonthly ? pack.price.monthly : Math.floor(pack.price.yearly / 12));
  const packsToShow = useMemo(() => packs, [isMonthly]);

  return (
    <section className="min-h-screen py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements with simple animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/15 to-pink-200/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 text-sm font-medium text-blue-700 shadow-lg"
          >
            <Star className="w-4 h-4" />
            Treatment Plans
          </motion.div>
          <h1 className="mb-6 text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Care Plan</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed">
            Unlock comprehensive healthcare with our expertly curated treatment plans designed for your unique needs
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="relative flex items-center rounded-2xl bg-white/80 backdrop-blur-lg p-2 shadow-xl border border-white/20">
            <motion.button
              onClick={() => setIsMonthly(true)}
              className={`relative rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300 ${
                isMonthly 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setIsMonthly(false)}
              className={`relative rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300 ${
                !isMonthly 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yearly
              <motion.span 
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-[10px] font-bold text-white shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                -20%
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto mt-8">
          {packsToShow.map((pack, index) => {
            const IconComponent = pack.icon;
            return (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative rounded-3xl bg-gradient-to-br ${pack.bgGradient} p-8 shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm overflow-visible group ${
                  pack.featured ? 'ring-2 ring-purple-500/50 shadow-purple-500/20 mt-6' : ''
                }`}
              >
                {/* Card background glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pack.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}></div>
                
                {pack.featured && (
                  <motion.div 
                    className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-sm font-semibold text-white shadow-lg"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                {/* Icon */}
                <div className={`bg-gradient-to-br ${pack.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pack.name}</h3>
                  <p className="text-gray-600 mb-6">{pack.subtitle}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        ₹{getMonthlyPrice(pack)}
                      </span>
                      <span className="ml-2 text-lg text-gray-500">/month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-400 line-through">
                        ₹{isMonthly ? pack.originalPrice.monthly : Math.floor(pack.originalPrice.yearly / 12)}
                      </span>
                      <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                        Save {Math.round(((isMonthly ? pack.originalPrice.monthly : Math.floor(pack.originalPrice.yearly / 12)) - getMonthlyPrice(pack)) / (isMonthly ? pack.originalPrice.monthly : Math.floor(pack.originalPrice.yearly / 12)) * 100)}%
                      </span>
                    </div>
                  </div>

                  {!isMonthly && (
                    <motion.p 
                      className="mb-6 text-sm text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      💰 Save ${pack.price.monthly * 12 - pack.price.yearly} annually
                    </motion.p>
                  )}

                  <ul className="mb-8 space-y-4">
                    {pack.benefits.map((benefit, idx) => (
                      <motion.li 
                        key={benefit} 
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pack.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {pack.featured ? (
                    <Button
                      borderRadius="1.75rem"
                      className={`w-full bg-gradient-to-r ${pack.gradient} text-white border-0 h-14 text-base font-semibold`}
                      containerClassName="w-full h-14"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-gradient-to-r ${pack.gradient} text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-10">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${pack.gradient}`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Money-back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl"
        >
          <div className="flex items-center justify-center gap-6 text-gray-600 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              30-day money-back guarantee
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Cancel anytime
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              Secure payment
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Packagepage;
