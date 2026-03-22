import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import {  useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

//, ShieldCheck, Code,
import { FileText, BookOpen, HelpCircle } from "lucide-react";

const docs = [
    {
        title: "Whitepaper",
        icon: FileText,
        link: "whitepaper",
        version: "Version 2.0: 2025-10-10",
        description: "Comprehensive overview of our vision, mission, and technical framework."
    },
    {
        title: "Documentation",
        icon: BookOpen,
        link: "docs",
        version: "Version 1.5: 2025-09-15",
        description: "Step-by-step guides and tutorials to help you navigate and use our ecosystem.",
        comingSoon: true
    },
    // {
    //     title: "Security Guide",
    //     icon: ShieldCheck,
    //     link: "security",
    //     version: "Version 1.0: 2025-07-20",
    //     description: "Best practices and protocols to ensure safe and secure usage of our platform.",
    //     comingSoon: true
    // },
    // {
    //     title: "Developer API",
    //     icon: Code,
    //     link: "api",
    //     version: "Version 2.3: 2025-10-01",
    //     description: "API reference for developers to integrate and interact with our platform.",
    //     comingSoon: true
    // },
    {
        title: "FAQs",
        icon: HelpCircle,
        link: "faqs",
        version: "Version 1.1: 2025-06-30",
        description: "Frequently asked questions to quickly get answers and guidance."
    },
];

const particles = Array.from({ length: 40 })

const Documentation: React.FC = () => {
    const [dim, setDim] = useState({ width: 0, height: 0 })
    const navigate = useNavigate()

    useEffect(() => {
        setDim({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }, [])

    const handleClick = (item: typeof docs[0]) => {
        if (item.comingSoon) {
            toast("Coming Soon 🚀", { icon: "⏳" })
        } else {
            navigate(item.link)
        }
    }

    return (
        <div className="bg-black overflow-hidden">
            <div className="relative min-h-[100vh] flex flex-col
                bg-[radial-gradient(circle_at_30%_20%,rgba(72,255,117,0.5)_0%,rgba(0,0,0,1)_60%),
                radial-gradient(circle_at_80%_80%,rgba(24,109,24,0.5)_0%,rgba(0,0,0,1)_70%)]">
                
                <Navbar />

                {/* PARTICLES */}
                {dim.width > 0 && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {particles.map((_, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0.2, x: Math.random() * dim.width, y: Math.random() * dim.height, scale: Math.random() * 0.7 + 0.4 }}
                                animate={{ opacity: [0.2, 0.8, 0.2], x: Math.random() * dim.width, y: Math.random() * dim.height }}
                                transition={{ duration: Math.random() * 6 + 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                                className="absolute w-1 h-1 bg-green-400 rounded-full shadow-[0_0_12px_4px_rgba(72,255,117,0.9)]"
                            />
                        ))}
                    </div>
                )}

                {/* BACKGROUND GLOW */}
                <motion.div
                    initial={{ opacity: 0.2, scale: 1 }}
                    animate={{ opacity: [0.2, 0.5, 0.3, 0.6, 0.2], scale: [1, 1.1, 1, 1.15, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-40 left-20 w-[450px] h-[450px] rounded-full bg-green-500/20 blur-[120px]"
                />
                <motion.div
                    initial={{ opacity: 0.2, scale: 1 }}
                    animate={{ opacity: [0.2, 0.45, 0.25, 0.5, 0.2], scale: [1, 1.08, 1, 1.12, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-20 right-20 w-[350px] h-[350px] rounded-full bg-green-400/10 blur-[100px]"
                />

                {/* CONTENT */}
                <div className="px-6 md:px-20 lg:mt-20 mb-20 text-white relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-center px-12 ">
                        From vision to execution (our Docs)
                    </h1>
                    <p className="text-center text-white/60 mb-8 py-3 px-8">
                        Find details guides, technical docs and roadmaps to navigate our ecosystem with ease.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {docs.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15, duration: 0.5 }}
                                    whileHover={{ scale: 1.06, y: -6 }}
                                    className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-green-500/30 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-green-500/20 transition"
                                    onClick={() => handleClick(item)}
                                >
                                    <div className="flex items-start gap-2 mb-12 flex-col">
                                        <Icon className="w-12 ml-4 mt-6 text-green-800 h-12" />
                                        <h2 className="text-xl px-4 font-semibold">{item.title}</h2>
                                        <p className="text-white/60 px-4 text-sm">{item.description}</p>
                                    </div>

                                    <div className='flex justify-between py-6 rounded-xl px-4 bg-zinc-900'>
                                        <p className='text-white/60'>{item.version}</p>
                                        <p className="text-green-400 hover:underline text-sm">OPENDOC &rarr;</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Documentation