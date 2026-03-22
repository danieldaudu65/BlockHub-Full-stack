import React, { useEffect, useState } from "react";
import {
  activeC,
  activeCB,
  total,
  totalCB,
  totalSBig,
  totalSt,
} from "../assets";
import CourseSales from "../components/CourseSales";
import { motion, type Variants } from "framer-motion";
import SalesChart from "../components/SalesChart";
import type { CourseData } from "../types/course";

interface SalesData {
  month: string;
  sales: number;
}

interface TutorStats {
  totalActiveCourses: number;
  totalStudents: number;
  totalCourseSales: number;
  coursesCreated: CourseData[];
}
// interface Tutor {
//   totalActiveCourses: number;
//   totalStudents: number;
//   totalCourseSales: number;
//   coursesCreated: { name: string; totalEnrollments: number }[];
// }]


const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } },
};

const getInitials = (title: string) => {
  return title
    .split(" ")                 // split into words
    .map(word => word[0])       // take first letter
    .join("")                   // join together
    .toUpperCase();             // make uppercase
};




const AcademyManage: React.FC = () => {
  const [data, setData] = useState<SalesData[]>([]);
  const [tutorStats, setTutorStats] = useState<TutorStats | null>(null);

  // Fetch tutor stats and courses from backend
  // const fetchTutorData = async () => {
  //   // 1️⃣ Fetch tutor stats
  //   const statsRes = await apiRequest<TutorStats>("/tutor_dashboard/tutor_stats", {
  //     method: "GET",
  //     tokenType: "tutor",
  //   });

  //   if (statsRes.success && statsRes.data) {
  //     setTutorStats(statsRes.data);

  //     // 2️⃣ Map courses to chart data
  //     const chartData = courses.map((course) => ({
  //       month: course.name.length > 10 ? course.name.slice(0, 10) + "…" : course.name,
  //       sales: course.totalEnrollments
  //     }));

  //     setData(chartData);
  //   }
  // };

  useEffect(() => {
    if (tutorStats) {
      console.log("Updated tutorStats:", tutorStats.coursesCreated);
    }
  }, [tutorStats]);


  useEffect(() => {
    const lsTutor = localStorage.getItem("tutorInfo");
    const lsCourses = localStorage.getItem("tutorCourses");

    if (lsTutor && lsCourses) {
      try {
        const tutor = JSON.parse(lsTutor);
        const courses = JSON.parse(lsCourses);


        setTutorStats({
          totalActiveCourses: tutor.totalActiveCourses,
          totalStudents: tutor.totalStudents,
          totalCourseSales: tutor.totalCourseSales,
          coursesCreated: courses, // direct from LS
        });

        console.log(tutorStats?.coursesCreated)

        // Build chart data from LS
        const chartData = courses.map((course: { name: string; totalEnrollments: any; }) => ({
          month: getInitials(course.name),
          sales: course.totalEnrollments
        }));


        setData(chartData);
        return; // IMPORTANT → Stop here (no API request)
      } catch (e) {
        console.error("LocalStorage parse error", e);
      }
    }

    // Otherwise fallback to backend
    // fetchTutorData();
  }, []);


  // Optional: Simulated live updates
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setData((prev) =>
  //       prev.map((item) => ({
  //         ...item,
  //         sales: Math.max(0, item.sales + Math.floor(Math.random() * 5 - 2)), // small fluctuation
  //       }))
  //     );
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  if (!tutorStats) return <p className="text-white">Loading tutor info...</p>;

  const academyM = [
    {
      image: activeC,
      text: "Active Courses",
      bImage: activeCB,
      number: tutorStats.totalActiveCourses,
    },
    {
      image: totalSt,
      text: "Total Students",
      bImage: totalSBig,
      number: tutorStats.totalStudents,
    },
    {
      image: total,
      text: "Total Courses Sales",
      bImage: totalCB,
      number: tutorStats.totalCourseSales,
    },
  ];

  const Courses = (tutorStats.coursesCreated || []).map((c) => ({
    _id: c._id,
    name: c.name,
    level: c.level || "Beginner", // fallback if level is missing
    totalEnrollments: c.totalEnrollments || 0,
  }));

  return (
    <div className="text-white">
      {/* Stats Grid */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {academyM.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.04, boxShadow: "0px 0px 25px rgba(72,255,117,0.15)" }}
            className="relative gap-4 bg-[#15151518] items-center border border-[#232323] flex rounded-2xl p-4 py-6 overflow-hidden cursor-pointer"
          >
            <img src={item.bImage} alt="" className="absolute -right-5 bottom-0 opacity-40 w-40" />
            <div className="bg-[#1818194b] rounded-lg shadow-2xl p-3">
              <img src={item.image} alt="" className="w-14 h-12 mt-2 object-contain" />
            </div>
            <div>
              <p className="text-sm text-white/50">{item.text}</p>
              <motion.h2
                key={item.number}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold text-white"
              >
                {item.number}
              </motion.h2>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="lg:flex lg:gap-8 lg:w-full">

        {/* Chart Component */}
        <div className="lg:w-full">

          <SalesChart data={data} />
        </div>

        {/* Course Sales List */}
        <div className="lg:w-full">

          <CourseSales courses={Courses} />
        </div>

      </div>
    </div>
  );
};


export default AcademyManage;