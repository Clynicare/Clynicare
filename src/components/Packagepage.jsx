"use client";

import React, { useState } from 'react';
import { Check, Sparkles } from "lucide-react";

const Packagepage = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const packs = [
    {
      name: 'Basic Package',
      price: {
        monthly: 50,
        yearly: 500,
      },
      benefits: [
        'Basic treatment plan',
        '1 consultation per month',
        '1 prescription included',
        'Email support',
      ],
      featured: false,
    },
    {
      name: 'Standard Package',
      price: {
        monthly: 150,
        yearly: 1500,
      },
      benefits: [
        'Standard treatment plan',
        '3 consultations per month',
        '2 prescriptions included',
        'Priority support',
      ],
      featured: true,
    },
    {
      name: 'Premium Package',
      price: {
        monthly: 300,
        yearly: 3000,
      },
      benefits: [
        'Premium treatment plan',
        'Unlimited consultations',
        '3 prescriptions included',
        '24/7 support',
      ],
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center pt-8">
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-gradient-to-b from-[#4DA1A9] to-[#007BA7]">
            Treatment Plans
          </span>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Care Plan
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-600">
            Unlock comprehensive healthcare with our expertly curated treatment plans
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-4 flex justify-center">
          <div className="relative flex items-center rounded-full bg-blue-50 p-1">
            <button
              onClick={() => setIsMonthly(true)}
              className={`relative rounded-full px-6 py-1.5 text-sm font-medium transition-colors ${
                isMonthly
                  ? 'bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsMonthly(false)}
              className={`relative rounded-full px-6 py-1.5 text-sm font-medium transition-colors ${
                !isMonthly
                  ? 'bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Yearly
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex-1 grid gap-4 lg:grid-cols-3 mt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full ">
          {packs.map((pack, index) => (
            <div
              key={pack.name}
              className={`relative rounded-xl ${
                pack.featured
                  ? 'border-2 border-gray-600 shadow-blue-100'
                  : 'border border-gray-200'
              } bg-white p-4 shadow-lg transition-transform duration-300 hover:scale-105 md:h-[400px] h-[300px]  mt-[45px] `}
            >
              {pack.featured && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] px-3 py-0.5 text-xs font-medium text-white">
                  <div className="flex items-center gap-1">
                    <Sparkles size={12} />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-900">{pack.name}</h3>
              </div>

              <div className="mb-3 flex items-baseline">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  ${isMonthly ? pack.price.monthly : Math.floor(pack.price.yearly / 12)}
                </span>
                <span className="ml-1 text-sm text-gray-500">/month</span>
              </div>

              {!isMonthly && (
                <p className="mb-3 text-xs text-green-600">
                  Save ${pack.price.monthly * 12 - pack.price.yearly} annually
                </p>
              )}

              <ul className="mb-4 space-y-2">
                {pack.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gradient-to-b from-[#4DA1A9] to-[#007BA7]" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`md:mt-[50px] w-full rounded-lg py-2 text-center text-sm font-medium transition-all hover:opacity-90 ${
                  pack.featured
                    ? 'bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Money-back Guarantee */}
        <p className="py-4 text-center md:text-xs text-[10px] text-gray-500 ">
          30-day money-back guarantee • Cancel anytime • Secure payment
        </p>
      </div>
    </div>
  );
};

export default Packagepage;