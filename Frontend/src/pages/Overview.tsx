import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { backarr } from "../assets";
import ActiveCourse from "../components/ActiveCourse";
import CompletedCourses from "../components/CompletedCourses";
import Certificate from "../components/Certificate";
import { useLocation } from "react-router-dom";


const tabs = ["Active Courses", "Completed", "Certificate"];

const Overview: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Active Courses");
    const [showStreak, setShowStreak] = useState(false);
    const totalStreak = 9; // total streak number
    const [count, setCount] = useState(0);

    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const tabFromQuery = query.get("tab");


    useEffect(() => {
        if (tabFromQuery === "certificate") {
            setActiveTab("Certificate");
        }
    }, [tabFromQuery]);


    useEffect(() => {
        if (showStreak) {
            let start = 0;
            const duration = 1000; // 1 second animation
            const stepTime = Math.abs(Math.floor(duration / totalStreak));
            const counter = setInterval(() => {
                start += 1;
                if (start > totalStreak) {
                    clearInterval(counter);
                } else {
                    setCount(start);
                }
            }, stepTime);
            return () => clearInterval(counter);
        } else {
            setCount(0);
        }
    }, [showStreak]);

    return (
        <div className="text-white ">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">My Courses</h2>

                <div
                    onClick={() => setShowStreak(true)}
                    className="text-[#6BFF6B] flex items-center gap-1 cursor-pointer hover:opacity-80 transition"
                >
                    <p>Streak</p>
                    <FaChevronRight />
                </div>
            </div>

            {/* Your Original Animated Border Tabs */}
            <div className="flex gap-3 mb-8 mt-6 w-full relative">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="relative p-1 px-3  capitalize text-white/40 hover:text-white/70 transition"
                    >
                        {/* Animated Border (UNCHANGED STYLE) */}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTabBorder"
                                className="absolute -inset-1 rounded-lg border border-[#00ff883a] pointer-events-none"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}

                        {/* Text */}
                        <span
                            className={`relative text-sm transition ${activeTab === tab ? "text-[#96FF96]" : ""
                                }`}
                        >
                            {tab}
                        </span>
                    </button>
                ))}
            </div>

            {/* Animated Content Area */}
            <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === "Active Courses" && <ActiveCourse />}
                        {activeTab === "Completed" && <CompletedCourses />}
                        {activeTab === "Certificate" && <Certificate />}
                    </motion.div>
                </AnimatePresence>
            </div>


            <AnimatePresence>
                {showStreak && (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 z-50 w-full h-full top-0 bg-[black] p-4 shadow-xl"
                    >
                        {/* Back Button */}
                        <div
                            onClick={() => setShowStreak(false)}
                            className="flex items-center gap-1 text-sm text-white/60 cursor-pointer mb-6 hover:text-white transition"
                        >
                            <img src={backarr} alt="" /> Back
                        </div>

                        {/* Streak Days Panel */}
                        <div className="bg-[#181819] p-2 rounded">
                            <div className="flex justify-between text-sm">
                                <h4>Learning Streak</h4>
                                {/* Animated Count */}
                                <motion.p
                                    className="font-semibold text-white"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {count}
                                </motion.p>
                            </div>

                            {/* Days */}
                            <div className="flex justify-between bg-black mt-4 rounded-lg p-2 py-4">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
                                    const active = index < 3; // first 3 marked
                                    return (
                                        <div key={day} className="flex flex-col items-center gap-2">
                                            <span className="text-xs text-white/60">{day}</span>

                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${active
                                                    ? "bg-[#6BFF6B] border-[#6BFF6B]"
                                                    : "border-white/20"
                                                    }`}
                                            >
                                                {/* Checkmark for active days */}
                                                {active && (
                                                    <motion.svg
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="w-3 h-3 text-black"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M5 13l4 4L19 7" />
                                                    </motion.svg>
                                                )}
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};






export default Overview;

