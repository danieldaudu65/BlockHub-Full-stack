// import { ondoardingBg, wave } from "../assets";
// import BuzzwordFloat from "../components/BuzzwordFloat";
// import { Img as Image } from 'react-image';
// import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
// import { logoWhite } from '../assets/';
import HomeContent from "./HomeContent";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {
      isLoading ? <SplashScreen /> : <HomeContent />
    }
      
    </>
  );
}
