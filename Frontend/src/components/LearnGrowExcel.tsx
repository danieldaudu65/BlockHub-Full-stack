import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FilterAcademy from "./FilterAcademy";
import { courses } from "../data/courses";
import { time } from "../assets";
import { FaStar } from "react-icons/fa";

const LearnGrowExcel: React.FC = () => {
    const location = useLocation();
    const isAcademyCourses = location.pathname === "/academy/courses";

    const [activeTab, setActiveTab] = useState<"discover" | "courses">("discover");

    const hasUserCourses = true; // toggle test
    const userCourses = courses.slice(0, 2);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-black px-4 text-center text-white py-8 overflow-hidden"
        >

        
            {isAcademyCourses && (
                <div className="flex justify-center mb-6">
                    <div className="bg-transparent border border-white/5 p-2 rounded-xl flex gap-2">

                        <button
                            onClick={() => setActiveTab("discover")}
                            className={`px-4 py-2 rounded-xl transition ${activeTab === "discover"
                                ? "bg-white text-black"
                                : "text-white/60"
                                }`}
                        >
                            Discover
                        </button>

                        <button
                            onClick={() => setActiveTab("courses")}
                            className={`px-4 py-2 rounded-xl transition ${activeTab === "courses"
                                ? "bg-white text-black"
                                : "text-white/60"
                                }`}
                        >
                            My Courses
                        </button>
                    </div>
                </div>
            )}

            <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl lg:text-4xl font-bold"
            >
                Learn. Grow. Excel.
            </motion.p>

            <p className="text-sm lg:text-lg my-2 text-white/30">
                Discover expert-led courses designed to sharpen your skills and unlock new opportunities.
            </p>

            <FilterAcademy />

            {/* Animated Tab Content */}
            <AnimatePresence mode="wait">

                {activeTab === "discover" && (
                    <motion.div
                        key="discover"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mx-auto"                    >
                        {courses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </motion.div>
                )}

                {activeTab === "courses" && (
                    <motion.div
                        key="courses"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {hasUserCourses ? (
                            <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                {userCourses.map((course, index) => (
                                    <CourseCard key={index} course={course} />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-16 min-h-[80vh] text-white/50"
                            >
                                <p className="text-lg mb-4">
                                    You have not enrolled in any course yet.
                                </p>
                                <button
                                    onClick={() => setActiveTab("discover")}
                                    className="px-6 py-3 bg-white text-black rounded-lg"
                                >
                                    Discover Courses
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )
                }

            </AnimatePresence >
        </motion.div >
    );
};

export default LearnGrowExcel;


/* ========================= */
/* Animated Course Card */
/* ========================= */

const CourseCard = ({ course }: any) => {

    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#040404] relative border border-[#181819] rounded-md p-2 hover:border-white/20 transition"
        >

            <div className="absolute top-2 flex items-center gap-1 right-5">
                <FaStar className="text-[#FFB545]" />
                <p>{course.rate || 0}</p>
            </div>

            <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
            />

            <p className="mt-2 text-xs bg-[#1D1C1F] text-left text-[#DFDFDF] w-fit p-2 py-1.5 rounded-lg font-light">
                {course.category}
            </p>

            <h3 className="text-md text-left my-3 font-semibold">
                {course.title}
            </h3>

            <div className="flex items-center gap-2 text-sm text-white/50">
                <p>Instructor: {course.instructor}</p>
                <span className="text-white/30">•</span>
                <p>{course.level}</p>
            </div>

            <div className="flex gap-2 mb-6 text-xs text-white/40 mt-3">
                <img src={time} alt="" />
                <span>Duration : {course.duration}</span>
            </div>

            <button
                onClick={() => navigate(`${course.id}`)}
                className="w-full bg-[#0A0A0A] border border-[#2e2e2e] py-4 mb-4 font-normal rounded-lg">
                Enroll Now
            </button>
        </motion.div>
    );
};
