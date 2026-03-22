import { useState, useEffect } from "react";
import { ambasador, community, job, learning, marketing,  } from "../assets";

export default function FloatingTagsCircle() {
  const tagsList = [
    { label: "Market Place", icon: marketing },
    { label: "Community", icon: community },
    { label: "Ambassadorship", icon: ambasador },
    { label: "Learning", icon: learning },
    { label: "Jobs", icon: job },
  ];

  const [tags] = useState(tagsList);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = isSmallScreen ? 120 : 280;
  const containerSize = radius * 2 + 80;

  return (
    <div
      className={`absolute pointer-events-none flex ${
        isSmallScreen ? "justify-center bottom-0" : "justify-end items-center pr-20 top-0"
      }`}
      style={{ width: "100%", height: isSmallScreen ? containerSize : "100%" }}
    >
      <div className="relative" style={{ width: containerSize, height: containerSize }}>
        {tags.map((tag, index) => {
          const angle = (index / tags.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={tag.label}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                transition: "transform 1s ease-in-out",
              }}
            >
              <div
                className="relative rounded-full p-[2px] animate-gradient-border"
                style={{
                  background: "linear-gradient(270deg, #48FF75, #000000, #48FF75)",
                  backgroundSize: "400% 400%",
                }}
              >
                <div className="flex items-center gap-2 px-4 py-1 lg:py-2 rounded-full text-xs lg:text-lg text-green-400 bg-black/40 backdrop-blur-md shadow-[0_0_15px_#00ff66] animate-bounce-slow">
                  <img src={tag.icon} alt={tag.label} className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span>{tag.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style >{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-border {
          animation: gradient-border 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
