import React, { useEffect, useState } from "react";
import { activeC, activeCB, total, totalCB } from "../assets";
import CourseManagementTable from "../components/CourseManagementTable";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 110, damping: 15 } },
};

interface Course {
  _id: string;
  name: string;
  level: string;
  tag?: string;
  totalEnrollments: number;
  thumbnail?: {
    url: string;
  };
  isDraft: boolean;
  isPublished: boolean;
}

interface Tutor {
  coursesCreated: Course[];
  totalActiveCourses: number;
  totalDraftedCourses: number;
}

const CourseManagement: React.FC = () => {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const storedTutor = localStorage.getItem("tutorInfo");
    const storedCourses = localStorage.getItem("tutorCourses");
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      setCourses(parsedCourses);
    }

    if (storedTutor) {
      let parsedTutor = JSON.parse(storedTutor);

      if (storedCourses) {
        const parsedCourses = JSON.parse(storedCourses);

        // Replace course IDs with full course objects
        parsedTutor.coursesCreated = parsedCourses;
      }

      setTutor(parsedTutor);
    }
  }, []);


  if (!tutor) return <p className="text-white">Loading tutor info...</p>;

  const courseSale = [
    {
      image: activeC,
      text: "Active Courses",
      bImage: activeCB,
      number: tutor.totalActiveCourses,
    },
    {
      image: total,
      text: "Drafted Courses",
      bImage: totalCB,
      number: tutor.totalDraftedCourses,
    },
  ];


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full">
          {courseSale.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.04, boxShadow: "0px 0px 25px rgba(0,156,0,0.2)" }}
              className="relative gap-4 bg-[#15151518] items-center border border-[#232323] flex rounded-2xl p-4 py-6 overflow-hidden cursor-pointer"
            >
              <img
                src={item.bImage}
                alt=""
                className="absolute right-0 bottom-0 opacity-40 w-32 pointer-events-none"
              />              <div className="bg-[#1818194b] rounded-lg shadow-2xl p-2">
                <img src={item.image} alt="" className="w-14 h-12 mt-2 object-contain" />
              </div>
              <div>
                <p className="text-sm text-white/50">{item.text}</p>
                <h2 className="text-3xl font-bold text-white">{item.number}</h2>
              </div>

              {index === 0 && (
                <div className="flex md:justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/dashboard/course-management/create-course")}
                    className="bg-[#009C00] hover:bg-green-600 text-white font-semibold px-3 py-2 text-xs rounded-md top-1/3 right-2 absolute transition duration-300 shadow-lg"
                  >
                    + Create Course
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Courses</h2>

        <button
          onClick={() => navigate("/dashboard/course-management/submit-course")}
          className="bg-[#009C00] hover:bg-green-600 text-white px-2 py-2 text-[10px] rounded-md"
        >
          + Propose New Course
        </button>
      </div>

      {/* Table */}
      <CourseManagementTable
        courses={courses}
        setCourses={setCourses}
        setTutor={setTutor}
      />
    </motion.div>
  );
};

export default CourseManagement;