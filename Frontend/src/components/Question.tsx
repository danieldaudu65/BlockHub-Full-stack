import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

const Question: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const items: AccordionItem[] = [
    {
      title: "What is BlockHub?",
      content:
        "BlockHub is a Web3 platform that connects job seekers and projects in the blockchain ecosystem, enabling networking, job opportunities, and project discovery.",
    },
    {
      title: "How do I create an account?",
      content:
        "You can create an account on BlockHub using your Telegram account for easy authentication. Wallet integration will be available later for payments.",
    },
    {
      title: "Can I apply for multiple projects?",
      content:
        "Yes! BlockHub allows you to apply for multiple projects and roles, helping you explore various opportunities in Web3.",
    },
    {
      title: "How does the Ambassador program work?",
      content:
        "Ambassadors can complete tasks for projects, submit proof of work, and earn rewards. The program is designed to build your reputation and network in Web3.",
    },
    {
      title: "How are payments handled?",
      content:
        "Currently, BlockHub focuses on connecting you to projects. In future updates, crypto-based payments and on-chain credential verification will be integrated.",
    },
    {
      title: "Is BlockHub free to use?",
      content:
        "Yes! Signing up and browsing projects is free. Some premium features or project applications may have fees in the future.",
    },
  ];

  return (
    <div className="relative grid lg:grid-cols-2 md:grid-cols-1 text-white min-h-[60vh] py-10 lg:px-40 p-4 gap-8 overflow-hidden">

      {/* Neon floating particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute w-24 h-24 rounded-full bg-[#00ff66]/30 blur-3xl animate-float1 top-10 left-10"></div>
        <div className="absolute w-32 h-32 rounded-full bg-[#00ff66]/20 blur-2xl animate-float2 bottom-20 right-20"></div>
        <div className="absolute w-40 h-40 rounded-full bg-[#00ff66]/20 blur-3xl animate-float3 top-1/3 left-1/2"></div>
      </div>

      <h1 className="lg:text-5xl sm:text-4xl lg:w-[500px] md:w-full font-medium pb-6 lg:text-start sm:text-center relative z-10">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6 relative z-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={`border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm 
                        transition-all duration-500 
                        hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] 
                        hover:scale-[1.02]`}
          >
            {/* Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className={`flex justify-between items-center w-full px-4 py-4 text-left 
                          transition-colors duration-300 ${activeIndex === index
                  ? "bg-[#00ff66]/10"
                  : "hover:bg-white/10"
                }`}
            >
              <span className="font-medium lg:text-xl md:text-md text-stone-300">
                {item.title}
              </span>
              <ChevronDown
                className={`transform transition-transform duration-500 text-[#00ff66] ${activeIndex === index ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ${activeIndex === index ? "max-h-60 opacity-100 px-4 pb-4" : "max-h-0 opacity-0"
                }`}
            >
              <p className="text-stone-400 lg:text-lg text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>



      {/* Animations */}
      <style >{`
        @keyframes float1 {
          0% { transform: translate(-20%, -10%); }
          50% { transform: translate(10%, 20%); }
          100% { transform: translate(-20%, -10%); }
        }
        @keyframes float2 {
          0% { transform: translate(30%, 40%); }
          50% { transform: translate(10%, -10%); }
          100% { transform: translate(30%, 40%); }
        }
        @keyframes float3 {
          0% { transform: translate(60%, -20%); }
          50% { transform: translate(40%, 20%); }
          100% { transform: translate(60%, -20%); }
        }
        .animate-float1 { animation: float1 18s ease-in-out infinite; }
        .animate-float2 { animation: float2 22s ease-in-out infinite; }
        .animate-float3 { animation: float3 28s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Question;
