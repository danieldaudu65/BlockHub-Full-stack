import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";


interface AccordionItem {
    title: string;
    content: string;
}



const FAQs: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [dim, setDim] = useState({ width: 0, height: 0 });
    const particles = useRef(Array.from({ length: 50 }));

    useEffect(() => {
        setDim({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setDim({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                "Ambassadors complete tasks for projects, submit proof of work, and earn rewards. It helps build reputation and networking opportunities in the Web3 ecosystem.",
        },
        {
            title: "How are payments handled?",
            content:
                "Currently, BlockHub connects you to projects. Future updates will integrate crypto payments, stablecoins, and on-chain credential verification.",
        },
        {
            title: "Is BlockHub free to use?",
            content:
                "Yes! Signing up and browsing projects is free. Some advanced features or premium project applications may have fees in the future.",
        },
        {
            title: "What types of jobs are available?",
            content:
                "BlockHub offers Hard Jobs (high-skill roles like smart contract development, UI/UX, marketing strategy) and Soft Jobs (microtasks, community moderation, content creation).",
        },
        {
            title: "What are on-chain credentials?",
            content:
                "On-chain credentials are verifiable proof of your completed jobs or tasks, often represented as soulbound tokens (SBTs) or attestations on-chain.",
        },
        {
            title: "How does BlockHub ensure trust?",
            content:
                "BlockHub uses a reputation system and verified project listings to minimize scams and fake offers, making it easier for jobbers and founders to trust each other.",
        },
        {
            title: "Can I showcase my portfolio on BlockHub?",
            content:
                "Yes! Completed tasks, projects, and earned badges contribute to a public portfolio, helping you stand out to founders and projects.",
        },
        {
            title: "What is the BlockHub Academy?",
            content:
                "BlockHub Academy is a free skill-building platform with courses and programs designed to prepare you for Web3 jobs and projects.",
        },
        {
            title: "Will there be DAO governance?",
            content:
                "Yes, BlockHub plans to evolve into a DAO-governed ecosystem where the community votes on features, rules, and partnerships.",
        },
        {
            title: "How can I become an early contributor?",
            content:
                "You can join BlockHub, complete tasks, participate in ambassador programs, and contribute to community campaigns to earn recognition and badges.",
        },
    ];

    return (
        <div className="bg-black text-white min-h-screen relative overflow-hidden">
            <Navbar />


            {/* Floating particles like Roadmap */}
            {dim.width > 0 && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                    {particles.current.map((_, i) => (
                        <motion.span
                            key={i}
                            initial={{
                                opacity: 0.2,
                                x: Math.random() * dim.width,
                                y: Math.random() * dim.height,
                                scale: Math.random() * 0.7 + 0.4,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                x: Math.random() * dim.width,
                                y: Math.random() * dim.height,
                            }}
                            transition={{
                                duration: Math.random() * 6 + 6,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                            }}
                            className="absolute w-1 h-1 bg-green-400 rounded-full shadow-[0_0_12px_4px_rgba(72,255,117,0.9)]"
                        />
                    ))}
                </div>
            )}
            {/* Particle background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute w-24 h-24 rounded-full bg-[#00ff66]/30 blur-3xl animate-float1 top-10 left-10"></div>
                <div className="absolute w-32 h-32 rounded-full bg-[#00ff66]/20 blur-2xl animate-float2 bottom-20 right-20"></div>
                <div className="absolute w-40 h-40 rounded-full bg-[#00ff66]/20 blur-3xl animate-float3 top-1/3 left-1/2"></div>
            </div>

            <div className="px-6 md:px-80 py-16">
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
                                className={`overflow-hidden transition-all duration-500 ${activeIndex === index
                                    ? "max-h-96 opacity-100 px-4 pb-4"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-stone-400 lg:text-lg text-sm">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />

            {/* Particle Animations */}
            {/* Particle Animations */}
            <style>
                {`
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
`}
            </style>


        </div>
    );
};

export default FAQs;
