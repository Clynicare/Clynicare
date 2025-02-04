'use client';
import React, { useState } from 'react';

const Packagepage = () => {
  const packs = [
    {
      name: 'Basic Package',
      price: '50',
      benefits: 'Basic treatment plan for 12 months, includes 1 consultation, 1 prescription, and 1 visit',
    },
    {
      name: 'Standard Package',
      price: '150',
      benefits: 'Standard treatment plan for 24 months, includes 3 consultations, 2 prescriptions, and 2 visits',
    },
    {
      name: 'Premium Package',
      price: '300',
      benefits: 'Premium treatment plan for 36 months, includes 6 consultations, 3 prescriptions, and 3 visits',
    },
  ];

  const [status, setStatus] = useState(false);

  const textDisplay = () => {
    setStatus((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen pt-16 px-4 sm:px-8 md:px-16">
      <div className="topcontent flex flex-col items-center justify-center text-center gap-3">
        <h1 className="font-medium text-orange-400 font-rejoice">Monthly Treatment Plans</h1>
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl w-full sm:w-[80%] md:w-[45%] h-auto">
          Unlock Continuous Care with Our Expertly Curated Monthly Plans
        </h1>
      </div>
      <div className="middlecontent flex items-center justify-center gap-8 w-[200px] h-[50px] bg-white rounded-full drop-shadow-lg mb-7">
        <div
          className="bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] rounded-3xl p-1 cursor-pointer"
          onClick={textDisplay}
        >
          <h1 className="w-[80px] h-[25px] text-white">Monthly</h1>
        </div>
        <h2 className="text-black/50">Yearly</h2>
      </div>
      <div className="bottomcontent flex flex-wrap justify-center gap-5 w-full mb-[50px] ">
        {packs.map((pack, key) => (
          <div
            key={key}
            className="card w-full sm:w-[270px] h-auto sm:h-[400px] flex flex-col items-center justify-between text-center p-5 rounded-3xl font-rejoice shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl">{pack.name}</h1>
              <h2 className="text-sm sm:text-base">{pack.benefits}</h2>
            </div>
            <div>
              <h1 className="flex items-center justify-center gap-3 py-10 text-xl sm:text-2xl">
                <small className="text-sm">$</small>
                <b>{pack.price}</b>
                <small>/</small>
                <small>Month</small>
              </h1>
              <div className="p-[1px] bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] rounded-xl">
                <button className="bg-white px-5 py-2 rounded-xl w-full">Get Started</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packagepage;
