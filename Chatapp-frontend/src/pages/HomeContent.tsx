import {  wave } from "../assets";
import BuzzwordFloat from "../components/BuzzwordFloat";
import { Img as Image } from 'react-image';
import {  logo } from '../assets/';
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { API_URL } from "../confiq";



export default function HomeContent() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleTwitterLogin = () => {
    setLoading(true);
    window.location.href = `${API_URL}/user_auth/auth/twitter`; 
  };

  return (
    <div className="bg-gradient-to-b from-blue-main to-black relative w-full h-screen overflow-hidden flex items-end justify-center py-10">
      {/* <Image
        src={ondoardingBg}
        alt="Onboarding Background"
        className="absolute inset-0 w-full bottom-0 object-cover z-50"
      /> */}
      <Image
        src={wave}
        alt="Onboarding Background"
        className="absolute w-full object-cover z-0"
      />
      <div className="absolute top-10 z-20 flex flex-col items-center w-full gap-5">

        <div>
          <Image
            src={logo}
            alt="Onboarding Background"
            className="w-32 inline-block mx-[1px]"
          />

        </div>
        <div className="w-full ml-[-10px] z-1 pointer-events-none">
          <BuzzwordFloat />
        </div>
      </div>









      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center px-5">
        <p className="text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
          Find your dream <br /> Web3 Jobs.
        </p>
        <p className="text-center mb-3 text-gray-300">
          Discover exciting Web3 opportunities, apply for <br />
          jobs, and grow your network  in one place.
        </p>

         <button
          onClick={handleTwitterLogin}
          className="bg-blue-main w-full p-3 px-6 rounded-lg text-white font-medium hover:bg-blue-700 transition flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "Connect Twitter"}
        </button>
      </div>
    </div>
  );
}
