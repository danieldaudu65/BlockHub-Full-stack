// CourseDetails.tsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Course } from "../data/courses";
import VideoLesson from "./VideoLesson";
import WrittenLesson from "./WrittenLesson";

const CourseDetails: React.FC = () => {
    const location = useLocation();
    const course = location.state?.course as Course;

    const [activeTab, setActiveTab] = useState("Video lessons");

    if (!course) {
        return <div className="text-white p-4">Course not found.</div>;
    }

    const tabs = ["Video lessons", "Written lesson"];

    return (
        <div className="text-white border-[#2E2E2E]   rounded-lg bg-[#080707] border ">

            {/* Tabs */}
            <div className="flex gap-6 mb-8 m-2  border p-1 rounded-lg border-white/5 relative">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative p-1 px-4 w-full ${activeTab === tab ? "bg-black" : ""}  capitalize text-white/40 hover:text-white/70 transition`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTabBorder"
                                className="absolute -inset-1 rounded-lg border border-[#00ff883a] pointer-events-none"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}

                        <span
                            className={`relative text-sm w-full transition ${activeTab === tab ? "text-[#96FF96]" : ""
                                }`}
                        >
                            {tab}
                        </span>
                    </button>
                ))}
            </div>

          

            {/* Animated Content Switch */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    className=""
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                >
                    {activeTab === "Video lessons" && <VideoLesson course={course} />}

                    {activeTab === "Written lesson" && <WrittenLesson course={course} /> }
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CourseDetails;
