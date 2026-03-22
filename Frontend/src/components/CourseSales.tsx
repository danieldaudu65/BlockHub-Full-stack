import React, { useState, useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface Course {
    _id: string;
    name: string;
    level: string;
    totalEnrollments: number;
}

interface Props {
    courses: Course[];
}

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 18, mass: 0.6 },
    },
};

const CourseSales: React.FC<Props> = ({ courses }) => {
    const [filter, setFilter] = useState<string>("All");

    // Filtered courses based on dropdown
    const filteredCourses = useMemo(() => {
        if (filter === "All") return courses;

        console.log("Filter selected:", filter);
        console.log("Courses array:", courses);

        return courses.filter(
            (course) => course.level?.toLowerCase() === filter.toLowerCase()
        );
    }, [courses, filter]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-black/60 border lg:h-full  border-white/10 rounded-2xl p-4"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Course Sales</h2>

                <div className="relative inline-block">
                    <select
                        className="appearance-none bg-[#111] border border-[#2a2a2a] text-xs rounded-lg px-4 pr-8 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#48ff75] transition"
                        value={filter}
                        onChange={(e) => {
                            console.log("Selected:", e.target.value);
                            setFilter(e.target.value);
                        }}
                    >
                        <option value="All">All Courses</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60" />
                </div>
            </div>

            {/* Animated List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="bg-[#00000077] rounded-xl overflow-hidden"
            >
                <AnimatePresence>
                    {filteredCourses.map((course) => (
                        <motion.div
                            key={course._id}
                            variants={itemVariants}
                            layout
                            whileHover={{
                                scale: 1.02,
                                backgroundColor: "#1f1f1f",
                            }}
                            className="flex items-center justify-between border-b border-[#23232354] p-4 px-2 cursor-pointer"
                        >
                            <p className="text-xs text-white">{course.name}</p>

                            <motion.p
                                key={course.totalEnrollments}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm font-semibold text-white/60"
                            >
                                Enrollments: {course.totalEnrollments}
                            </motion.p>
                        </motion.div>
                    ))}

                    {filteredCourses.length === 0 && (
                        <p className="text-white/50 p-4 text-sm">No courses found</p>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default CourseSales;