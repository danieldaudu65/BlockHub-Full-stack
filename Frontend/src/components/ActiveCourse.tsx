// ActiveCourse.tsx
import React from "react";
import { motion } from "framer-motion";
import MyCourseItem from "../components/MyCourseItem";
import { courses } from "../data/courses";

const ActiveCourse: React.FC = () => {
  const activeCourses = courses.slice(0, 3); // just 3 courses

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {activeCourses.map((course) => (
        <motion.div
          key={course.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <MyCourseItem
            course={course}
            lessonCompleted={Math.floor(Math.random() * 10)}
            lessonOverall={12}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ActiveCourse;
