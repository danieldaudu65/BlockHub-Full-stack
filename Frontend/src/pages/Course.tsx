import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { courses } from "../data/courses";
import { backarr, bulb, derik, level, Notebook, stars, time, timing, tt, verified, } from "../assets";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

export const solidityModules = [
    {
        week: 1,
        topic: "Introduction to Solidity",
        duration: "45min",
        description: "Learn the basics of Solidity...",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        week: 2,
        topic: "Solidity Data Types & Variables",
        duration: "50min",
        description: "Dive into Solidity's data types...",
        video: "https://sample-videos.com/video123/mp4/480/asdasdas.mp4"
    },
    {
        week: 3,
        topic: "Functions & Visibility",
        duration: "55min",
        quiz: true,
        quizData: {
            pointsPerQuestion: 10,
            questions: [
                {
                    question: "Which visibility makes a function callable only inside the contract?",
                    options: ["public", "external", "private", "internal"],
                    answer: "private"
                },
                {
                    question: "Which visibility allows child contracts to call a function?",
                    options: ["private", "internal", "external", "none"],
                    answer: "internal"
                },
                {
                    question: "Which keyword allows public access?",
                    options: ["internal", "public", "private", "view"],
                    answer: "public"
                }
            ]
        },
        description: "Understand how to create and organize functions...",
        video: "https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_5mb.mp4"
    }
    ,
    {
        week: 4,
        topic: "Smart Contract Storage & Memory",
        duration: "50min",
        description: "Explore storage vs memory...",
        video: "https://www.w3schools.com/html/movie.mp4"
    },
];




interface CourseCardProps {
    course: typeof courses[0];
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {

    const navigate = useNavigate();

    return (
        <motion.div
            className="bg-[#000000] relative border border-white/5 p-4 py-8 flex flex-col gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
        >


            <div className="absolute top-2 flex items-center gap-1 right-5">
                <FaStar className="text-[#FFB545]" />
                <p className="text-white/50">{course.rate || 0}</p>
            </div>

            <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
            />

            <p className="mt-2 text-xs bg-[#1D1C1F] text-left text-[#DFDFDF] w-fit p-2 py-1.5 rounded-lg font-light">
                {course.category}
            </p>

            <h3 className="text-md text-white text-left my-3 font-semibold">
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
                onClick={() => navigate(`/academy/courses/${course.id}`)}
                className="w-full bg-[#0A0A0A] border text-[#6BFF6B] border-[#6bff6b5e] py-4 mb-4 font-normal rounded-lg">
                Enroll Now
            </button>
        </motion.div>
    );
};

const Course = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"overview" | "modules" | "reviews">("overview");


    const course = courses.find((c) => c.id === id);

    if (!course) {
        return (
            <div className="text-white p-10">
                <Navbar />
                <p>Course not found.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative min-h-[100vh] flex flex-col
    lg:bg-black
    bg-black"
        >

            <Navbar />

            <div className="text-white px-4 py-8 max-w-5xl mx-auto">

                {/* Back Button */}
                <div
                    onClick={() => navigate(-1)}
                    className="flex gap-2 items-center cursor-pointer text-white/60 hover:text-white mb-8"
                >
                    <img src={backarr} alt="back" />
                    <p>Back</p>
                </div>

                {/* Course Image */}


                {/* Title */}
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

                {/* Description */}
                <p className="text-white/60 mb-6 leading-relaxed">
                    {course.description}
                </p>
                <div className="grid gap-8 max-w-5xl mx-auto  md:grid-cols-3">
                    {/* Left column: Image + Overview + Instructor */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Course Image */}
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-72 object-cover rounded-xl"
                        />

                        {/* Overview */}
                        {/* <div>
                            <h2 className="text-xl font-semibold mb-4">What you'll Achieve after course</h2>
                            <ul className="list-disc list-inside text-white/70 space-y-2">
                                {course.outcomes.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div> */}

                        {/* Instructor Section */}
                        {/* <div>
                            <h2 className="text-lg font-semibold mb-4">Meet your instructors</h2>
                            {course.instructors.map((instructor, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 bg-[#020202] border border-white/5 rounded-md p-2"
                                >
                                    <img
                                        src={instructor.image}
                                        alt={instructor.name}
                                        className="w-22 h-22 rounded-md object-cover"
                                    />
                                    <div className="flex flex-col justify-between">
                                        <p className="font-semibold">{instructor.name}</p>
                                        <p className="text-white/50 text-sm">{instructor.role}</p>
                                        <a
                                            href={instructor.xLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm text-blue-400"
                                        >
                                            <img src={tt} alt="" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>

                    {/* Right column: Meta + Enroll button (desktop only) */}
                    <div className="hidden md:flex flex-col gap-4 sticky top-24">
                        <div className="bg-[#000000] border border-white/5 p-4 rounded-xl flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <img src={verified} alt="" />
                                <p>Certificate upon completion</p>
                            </div>
                            <div className="flex flex-col gap-2 text-white/50">
                                <div className="flex gap-2 items-center">
                                    <img src={level} alt="" />
                                    <p>{course.level}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <img src={timing} alt="" />
                                    <p>{course.duration}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <img src={Notebook} alt="" />
                                    <p>{course.studentsEnrolled}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <img src={stars} alt="" />
                                {course.rating} from {course.totalReviews} people
                            </div>
                            <button className="bg-[#009C00] font-bold w-full py-3 rounded-xl hover:bg-green-600">
                                Enroll Now | {course.price}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Toggle Section */}
                <div className="flex gap-6 mb-8 mt-6 relative">
                    {["overview", "modules", "reviews"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className="relative p-1 px-2 capitalize text-white/40 hover:text-white/70"
                        >
                            {/* Animated border */}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTabBorder"
                                    className="absolute -inset-1 rounded-lg border border-[#00ff883a] pointer-events-none"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}

                            {/* Text on top */}
                            <span className={`relative ${activeTab === tab ? "text-[#96FF96]" : ""}`}>
                                {tab}
                            </span>
                        </button>

                    ))}
                </div>



                <AnimatePresence mode="wait">

                    {/* this is the overview */}
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                        >

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">What you'll Achieve after course</h2>
                                <ul className="list-disc list-inside text-white/70 space-y-2">
                                    {course.outcomes.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            {/* Instructor Section */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Meet your instructors</h2>

                                {course.instructors.map((instructor, index) => (
                                    <div
                                        key={index}
                                        className="flex  gap-4 bg-[#020202] border border-white/5 rounded-md p-2  "
                                    >
                                        <img
                                            src={instructor.image}
                                            alt={instructor.name}
                                            className="w-22 h-22 rounded-md object-cover"
                                        />

                                        <div className="flex justify-between flex-col">
                                            <p className="font-semibold">{instructor.name}</p>
                                            <p className="text-white/50 text-sm">
                                                {instructor.role}
                                            </p>
                                            <a
                                                href={instructor.xLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm text-blue-400"
                                            >
                                                <img src={tt} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {activeTab === "modules" && (
                        <motion.div
                            key="modules"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.08 }
                                }
                            }}
                            className="space-y-"
                        >

                            {solidityModules.map((module, index) => (
                                <motion.div
                                    key={index}
                                    className="relative"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    {/* Module Card */}
                                    <div className="bg-[#000000] border border-white/5 p-4 py-8   flex flex-col gap-2">
                                        <div className="flex  gap-2 items-center">
                                            <p className="font-semibold">{module.week}.</p>
                                            <p className="font-semibold">{module.topic}</p>
                                        </div>
                                        <p className="text-white/50 text-sm mt-1">{module.description}</p>
                                        <div className="flex items-center gap-2 my-1">
                                            <img src={time} alt="" />
                                            <p className="text-white/50 text-sm -mr-1">Duration:</p>
                                            <p className="text-white/70 text-sm">{module.duration}</p>
                                        </div>
                                    </div>

                                    {/* Quiz after the module (if any) */}
                                    {module.quiz && (
                                        <div className="bg-[#FF85121A] flex items-center gap-2 right-2 z-20 border absolute border-[#FF851299] p-2 py-1 -top-0 rounded text-center text-[#FFB545] text-xs font-semibold mt-2">

                                            <img src={bulb} alt="" />
                                            <p>
                                                Quiz
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}


                    {activeTab === "reviews" && (
                        <motion.div
                            key="reviews"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                            className="space-y-"
                        >

                            {[1, 2, 3].map((review) => (
                                <motion.div
                                    key={review}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}

                                    className="bg-black border border-white/5 p-4 py-7 rounded"
                                >
                                    <div className="flex items-center mb-2 gap-2">

                                        <img src={derik} alt="" className="w-6 h-6 rounded-full" />
                                        <p className="text-white/40 text-xs ">
                                            Ahmed Faruku
                                        </p>
                                    </div>
                                    {/* <div className="flex items-center gap-2 mb-2">
                                    <FaStar className="text-[#FFB545]" />
                                    <FaStar className="text-[#FFB545]" />
                                    <FaStar className="text-[#FFB545]" />
                                    <FaStar className="text-[#FFB545]" />
                                    <FaStar className="text-[#FFB545]" />
                                </div> */}

                                    <p className="text-white/50 text-sm">
                                        This course was extremely helpful and well structured.
                                        I learned practical Web3 concepts.
                                    </p>


                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="px-4">
                <p className="text-white  lg:text-3xl lg:text-center lg:mt-12">Explore other courses</p>

                <motion.div
                    key="discover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid mt-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-60 gap-6"
                >
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.07 }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}

                </motion.div>
            </div>

            <Footer />
        </motion.div >
    );
};

export default Course;
