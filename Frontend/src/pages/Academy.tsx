import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AcademyIntro from "../components/AcademyIntro";
import WhyBlockhubAcademy from "../components/WhyBlockhubAcademy";
import LearnGrowExcel from "../components/LearnGrowExcel";
import JoinNow from "../components/JoinNow";

const Academy: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 4 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Brand-matched skeleton loader
    return (
      <div className="bg-black overflow-hidden min-h-screen">
        <div
          className="relative min-h-screen p pt-24
          lg:bg-[radial-gradient(circle_at_100%_50%,rgba(72,255,117,0.35)_0%,rgba(24,109,24,0.25)_25%,rgba(0,0,0,1)_50%)]
          bg-[radial-gradient(circle_at_50%_120%,rgba(72,255,117,0.35)_0%,rgba(24,109,24,0.25)_25%,rgba(0,0,0,1)_50%)]
          animate-pulse"
        >
          <div className="max-w-7xl mx-auto px-4 space-y-8">

            {/* Title */}
            <div className="h-8 w-64 rounded bg-white/10 mx-auto" />

            {/* Subtitle */}
            <div className="h-4 w-96 rounded bg-white/5 mx-auto" />

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-56 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Real Academy content
  return (
    <div className="bg-black overflow-hidden min-h-screen flex flex-col">
      <div
        className="relative min-h-[100vh] flex flex-col
        lg:bg-[radial-gradient(circle_at_100%_50%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)]
        bg-[radial-gradient(circle_at_50%_120%,rgba(72,255,117,1)_0%,rgba(24,109,24,0.6)_25%,rgba(0,0,0,1)_50%)]"
      >
        <Navbar />
        <div className="flex-1">
          <AcademyIntro />
          <WhyBlockhubAcademy />
          <LearnGrowExcel />
          <JoinNow />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Academy;
