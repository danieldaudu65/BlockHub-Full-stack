import React from "react";
import Navbar from "../components/Navbar";
import { Aboutgreen, Aboutwhite } from "../assets";
import { mission } from "../data";
import Team from "../components/Team";
import Footer from "../components/Footer";

const About: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[40vh] sm:h-[70vh] md:h-[80vh] lg:h-[100vh] px-6 sm:px-20 lg:px-40 flex items-center">
        {/* Background Images */}
        <img
          src={Aboutgreen}
          alt="Green background"
          className="absolute top-0 left-0 w-full h-full object-cover brightness-150 opacity-80"
        />
        <img
          src={Aboutwhite}
          alt="White overlay"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
        />

        {/* Text Overlay */}
        <div className="relative z-10 py-20 sm:py-28">
          <div className="w-12 h-3 bg-white mb-2" />
          <p className="text-stone-400 text-xs sm:text-sm mb-2">About Us</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-full sm:max-w-[400px] lg:max-w-[600px]">
            Empowering innovators, connecting visionaries.
          </h1>
        </div>
      </div>

      {/* Who Are We */}
      <section className="flex flex-col lg:flex-row px-6 sm:px-12 lg:px-18 items-start justify-between py-12 sm:py-16 gap-6 sm:gap-8">
        <div className="flex gap-2 items-center">
          <hr className="border-t border-gray-500 w-8 sm:w-12" />
          <p className="text-gray-400 text-sm sm:text-base">Who are we</p>
        </div>
        <p className="md:w-auto leading-relaxed text-sm sm:text-base md:text-lg lg:text-2xl text-stone-300">
          We are a decentralized hub designed to connect job seekers, founders,
          and Web3 projects in one seamless ecosystem. Unlike traditional job
          platforms, BlockHub combines job discovery, community building,
          project support, and verifiable on-chain credentials into one powerful
          platform.
        </p>
      </section>

      {/* Mission Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-6 sm:px-12 lg:px-40 py-16 sm:py-20 lg:py-24">
        
        {/* Main Highlight */}
        <div className="flex flex-col gap-4 sm:p-8 bg-black hover:bg-white/5 transition rounded-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
            Empowering projects and experts to thrive.
          </h2>
          <p className="text-stone-500 font-medium text-sm sm:text-base">
            BlockHub connects visionary projects with top-tier talent, empowering
            developers and founders to build groundbreaking solutions with the
            right expertise.
          </p>
        </div>

        {/* Mission Items */}
        {mission.map((item, index) => (
          <div key={index} className=" sm:p-8 flex flex-col gap-4 bg-black hover:bg-white/5 transition rounded-lg">
            <img src={item.img} alt={item.header} className="mb-2 sm:mb-4 w-full h-32 sm:h-40 object-contain" />
            <h3 className="text-md sm:text-lg font-bold">{item.header}</h3>
            <p className="text-sm sm:text-base font-medium text-stone-500">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <Team />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;