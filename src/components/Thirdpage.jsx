import Image from 'next/image';
import React from 'react';

const Thirdpage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_300%_500%_at_top_right,#007aa79d,white_30%)] flex flex-col gap-10 overflow-hidden">
      <div className="topcontent flex flex-col text-center justify-center items-center gap-6 px-4 mt-24">
        <span className="text-orange-400">List of therapies</span>
        <h1 className="font-bold text-3xl md:text-5xl font-rejoice">
          Explore Our Wide Spectrum
          <br className="hidden md:block" /> Of Professional Therapeutic Services
        </h1>
        <p className="text-black/50 font-rejoice font-light text-sm md:text-base ">
          Embark on a journey toward holistic health with our expertly designed therapies, each tailored to nourish your mind,
          body, and soul. Our specialized services offer a comprehensive approach to well-being, addressing your unique needs and goals.
        </p>
      </div>
      <div className="bottomcontent flex flex-col md:flex-row px-4 md:px-12 text-justify">
        <div className="leftcontent w-full md:w-1/2 p-4 md:p-12 flex flex-col gap-4 font-rejoice">
          <h1 className="font-bold text-xl md:text-2xl">Stomach Flu IV</h1>
          <p className="font-semibold">This is the name of the product</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis deleniti cumque harum a quos modi provident, quidem officia aspernatur sed eos maiores cum reprehenderit ut, suscipit repellendus obcaecati ratione! Dolor?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis deleniti cumque harum a quos modi provident, quidem officia aspernatur sed eos maiores cum reprehenderit ut, suscipit repellendus obcaecati ratione! Dolor?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis deleniti cumque harum a quos modi provident, quidem officia aspernatur sed eos maiores cum reprehenderit ut, suscipit repellendus obcaecati ratione! Dolor?
          </p>
          <div className="buttonandtime flex flex-col md:flex-row items-start md:items-center gap-4">
            <button className="bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white p-3 rounded-full w-full md:w-[200px]">
              Schedule a Time
            </button>
            <p>$200/Session | 1hr 30mins</p>
          </div>
        </div>
        <div className="rightcontent w-full md:w-1/2 h-[300px] md:h-[500px] flex justify-center items-center bg-blacks">
          <Image src="/images/Nursecare.png" width={600} height={600} className="object-contain" alt="Nurse care" />
        </div>
      </div>
    </div>
  );
};

export default Thirdpage;
