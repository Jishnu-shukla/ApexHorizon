import React from 'react';
import Image from 'next/image';

interface DeviceMockupProps {
  laptopSrc: string;
  mobileSrc: string;
  laptopAlt?: string;
  mobileAlt?: string;
}

export default function DeviceMockup({
  laptopSrc,
  mobileSrc,
  laptopAlt = "Laptop dashboard preview",
  mobileAlt = "Mobile app preview"
}: DeviceMockupProps) {
  return (
    <div className="relative w-full max-w-[900px] mx-auto my-12 px-4 select-none">
      
      {/* 1. LAPTOP FRAME (Background) */}
      <div className="relative w-full aspect-[18/11] bg-gray-900 rounded-t-[2rem] rounded-b-[2rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
        {/* Laptop Screen Content Container */}
        <div className="relative w-full h-full bg-gray-200 overflow-hidden">
          <Image
            src={laptopSrc}
            alt={laptopAlt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-w-900px) 100vw, 900px"
          />
        </div>
      </div>
      
      {/* Laptop Base / Keyboard Lip */}
      {/* <div className="relative bottom-0 left-1/2 -translate-x-1/2 w-[106%] h-[20px] bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-xl shadow-xl z-10 border-t border-gray-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[6px] bg-gray-600 rounded-b-md"></div>
      </div> */}


      {/* 2. MOBILE FRAME (Foreground - Left Side Overlay) */}
      <div className="absolute bottom-[-20px] md:left-[-10%] w-[24%] min-w-[125px] max-w-[200px] z-20 drop-shadow-2xl transition-transform hover:scale-105 duration-300">
        
        {/* Outer Phone Border */}
        <div className="relative border-gray-800 bg-gray-800 border-[6px] sm:border-[8px] rounded-[1.8rem] sm:rounded-[2.2rem] aspect-[9/19] w-full shadow-2xl overflow-hidden">
          
          {/* Speaker / Notch Decorator */}
          <div className="h-[12px] sm:h-[16px] w-[45%] bg-gray-800 top-0 left-1/2 -translate-x-1/2 rounded-b-[0.6rem] absolute z-30"></div>
          
          {/* Left Side Buttons (Volume) */}
          <div className="h-[20px] bg-gray-800 absolute -left-[7px] top-[40px] w-[2px] rounded-l-sm"></div>
          <div className="h-[20px] bg-gray-800 absolute -left-[7px] top-[65px] w-[2px] rounded-l-sm"></div>
          
          {/* Screen Container */}
          <div className="rounded-[1.4rem] sm:rounded-[1.7rem] overflow-hidden w-full h-full bg-slate-900 relative z-10">
            <Image
              src={mobileSrc}
              alt={mobileAlt}
              fill
              className="object-cover object-top"
              sizes="(max-w-200px) 100vw, 200px"
            />
          </div>
          
        </div>
      </div>

    </div>
  );
}