import React from "react";
import "react-vertical-timeline-component/style.min.css";
// import { IoIosRocket } from "react-icons/io";
// import { PiHandbagFill } from "react-icons/pi";
// import { TfiReload } from "react-icons/tfi";
import { about } from "../assets";


// import { how_it_works } from '../data';

const HIW: React.FC = () => {
  return (
    <div className="bg-black border-b border-white/10 text-white lg:flex lg:p-6 px-4 py-14 lg:py-22  lg:gap-6 lg:justify-around  ">
      <div className="flex md:gap-2 text-stone-400 items-center -ml-2 ml:ml-0 lg:flex-col-reverse md:flex-row lg:justify-between ">
        <div className="flex ">
          <img src= {about} className="w-18 lg:w-36" alt="" />
        </div>
        <div className="flex gap-2 text-white/30 items-start lg:items-center">
          <div className="hidden lg:flex  w-22 h-[2px]  bg-white/30"></div>
          <p className="text-sm lg:text-[22px] ">About Us</p>
        </div>
      </div>
      <div className="mt-6 lg:mt-0">
        <p className="lg:w-[600px] w-full text-lg leading-normal lg:text-2xl">
          We are a decentralized hub designed to connect job seekers, founders,
          and Web3 projects in one seamless ecosystem. Unlike traditional job
          platforms, BlockHub combines job discovery, community building,
          project support, and verifiable on-chain credentials into one powerful
          platform.
        </p>
      </div>
    </div>
  );
};

export default HIW;
