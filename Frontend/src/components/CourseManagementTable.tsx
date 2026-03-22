import React, { useState } from "react";
import { del, edit } from "../assets";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import { FiEye, FiUpload, FiMoreVertical } from "react-icons/fi";

const tableVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

interface Course {
  _id: string;
  name: string;
  level: string;
  tag?: string;
  totalEnrollments: number;
  thumbnail?: any;
  isDraft: boolean;
  isPublished: boolean;
}

// interface Tutor {
//   _id: string;
//   name: string;
//   email: string;
//   [key: string]: any;
// }

interface Props {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  // In CourseManagementTable.tsx props
  setTutor: React.Dispatch<React.SetStateAction<any>>;
}

const CourseManagementTable = ({ courses, setCourses, setTutor }: Props) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [confirmPublish, setConfirmPublish] = useState(false);
  const [courseToPublish, setCourseToPublish] = useState<string | null>(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenu(prev => (prev === id ? null : id));
  };

  const askDeleteCourse = (id: string) => {
    setCourseToDelete(id);
    setConfirmDelete(true);
  };

  // DELETE COURSE
  const deleteCourse = async (id: string) => {

    setOpenMenu(null);

    const res = await apiRequest("/tutor_course/delete_course", {
      method: "DELETE",
      body: { courseId: id },
      tokenType: "tutor",
    });
    if (res.success) {

      localStorage.setItem("tutorInfo", JSON.stringify(res.data.tutor));
      localStorage.setItem("tutorCourses", JSON.stringify(res.data.allCourses));

      setCourses(res.data.allCourses);
      setTutor(res.data.tutor);

      setModalMessage("Course deleted successfully!");
      setShowModal(true);
    }
  };

  // PUBLISH COURSE
  const publishCourse = async (id: string) => {

    setOpenMenu(null);

    const res = await apiRequest("/tutor_course/publish_course", {
      method: "PUT",
      body: { courseId: id },
      tokenType: "tutor",
    });

    if (res.success) {

      localStorage.setItem("tutorInfo", JSON.stringify(res.data.tutor));
      localStorage.setItem("tutorCourses", JSON.stringify(res.data.allCourses));

      setCourses(res.data.allCourses);
      setTutor(res.data.tutor);

      setModalMessage("Course published successfully!");
      setShowModal(true);
    }
  };

  const askPublishCourse = (id: string) => {
    setCourseToPublish(id);
    setConfirmPublish(true);
  };

  const confirmPublishCourse = () => {
    if (courseToPublish) {
      publishCourse(courseToPublish);
    }

    setConfirmPublish(false);
    setCourseToPublish(null);
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete);
    }

    setConfirmDelete(false);
    setCourseToDelete(null);
  };
  const handleModalOk = () => {
    setShowModal(false);
  };

  const duplicateCourse = async (id: string) => {
    setOpenMenu(null); // close the menu

    // find the course in current list
    const courseToDuplicate = courses.find((c) => c._id === id);
    if (!courseToDuplicate) return;

    // Make API request to duplicate
    const res = await apiRequest("/tutor_course/duplicate_course", {
      method: "POST",
      body: { courseId: id }, // backend will create a new course with same data
      tokenType: "tutor",
    });

    if (res.success) {
      // update local storage and state
      localStorage.setItem("tutorCourses", JSON.stringify(res.data.allCourses));
      localStorage.setItem("tutorInfo", JSON.stringify(res.data.tutor));
      setCourses(res.data.allCourses);
      setTutor(res.data.tutor);

      setModalMessage("Course duplicated successfully!");
      setShowModal(true);
    }
  };

  return (
    <div className="w-full mt-8 min-h-[50vh] mb-12 overflow-x-auto">

      <table className="w-full text-left text-sm">
        <thead className="bg-[#0a0a0a] text-gray-400">
          <tr>
            <th className="py-3 px-4 min-w-40">Course Name</th>
            <th className="py-3 px-4">Level</th>
            <th className="py-3 px-4">Tag</th>
            <th className="py-3 px-4">Enrollments</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>

        <motion.tbody variants={tableVariants} initial="hidden" animate="show" className="text-white">
          <AnimatePresence>
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <motion.tr
                  key={course._id}
                  variants={rowVariants}
                  layout
                  className="border-b border-[#2C2C2C] hover:bg-[#151515]"
                >
                  {/* COURSE NAME + THUMB */}
                  <td className="py-3 flex items-center px-4">
                    {course.thumbnail?.url && (
                      <img
                        src={course.thumbnail.url}
                        alt={course.name}
                        className="w-12 h-12 object-contain rounded-md"
                      />
                    )}
                    <p className="py-3 px-4 truncate max-w-[200px]">{course.name}</p>


                    {course.isDraft && (
                      <span className="text-yellow-400 text-xs ml-2">(Draft)</span>
                    )}

                    {course.isPublished && (
                      <span className="text-green-400 text-xs ml-2">(Published)</span>
                    )}
                  </td>


                  <td className="py-3 px-4">{course.level}</td>
                  <td className="py-3 px-4">{course.tag || "—"}</td>
                  <td className="py-3 px-4">{course.totalEnrollments}</td>

                  {/* ACTION BUTTONS */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3 relative">
                      {/* EDIT (unchanged) */}
                      <motion.img
                        src={edit}
                        onClick={() =>
                          navigate("/dashboard/course-management/create-course", {
                            state: { editMode: true, course },
                          })
                        }
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="w-7 cursor-pointer"
                      />

                      {/* DELETE (unchanged) */}
                      <motion.img
                        src={del}
                        onClick={() => askDeleteCourse(course._id)}
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        className="w-7 cursor-pointer"
                      />

                      {/* MENU TRIGGER */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        onClick={() => toggleMenu(course._id)}
                        className="cursor-pointer p-1"
                      >
                        <FiMoreVertical size={20} className="text-white" />
                      </motion.div>

                      {/* DROPDOWN MENU */}
                      <AnimatePresence>
                        {openMenu === course._id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: -5 }}
                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            className="absolute right-0 top-3 bg-[#0f0f0f] border border-[#2C2C2C] rounded-lg shadow-xl w-40 z-50 py-2"
                          >
                            {/* VIEW */}
                            <button
                              onClick={() =>
                                navigate("/dashboard/course-management/create-course", {
                                  state: { viewMode: true, course },
                                })
                              }
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#1c1c1c] text-left"
                            >
                              <FiEye className="text-blue-400" />
                              <span>View Course</span>
                            </button>


                            {/* PUBLISH */}
                            {course.isDraft && (
                              <button
                                onClick={() => askPublishCourse(course._id)}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#1c1c1c] text-left"
                              >
                                <FiUpload className="text-green-400" />
                                <span>Publish Course</span>
                              </button>
                            )}
                            {/* DUPLICATE */}
                            <button
                              onClick={() => duplicateCourse(course._id)}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#1c1c1c] text-left"
                            >
                              <FiUpload className="text-yellow-400 rotate-45" /> {/* just an icon */}
                              <span>Duplicate </span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr
                key="no-courses"
                variants={rowVariants}
                className="border-b border-[#2C2C2C]"
              >
                <td
                  colSpan={5}
                  className="text-center py-10 text-white/70 italic"
                >
                  No drafted courses yet.
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        </motion.tbody>
      </table>

      <AnimatePresence>
        {confirmPublish && (
          <motion.div
            className="fixed inset-0 m-4 bg-black/60 backdrop-blur-[5px] flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] rounded-xl w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-white px-6 pt-6 text-lg font-bold mb-3">
                Publish Course
              </h2>

              <p className="text-white/70 px-6 mb-6">
                Are you sure you want to publish this course?
              </p>

              <div className="flex w-full">
                <button
                  onClick={() => setConfirmPublish(false)}
                  className="px-4 py-4 w-full bg-[#00ff0038] rounded-bl-lg hover:bg-green-600 text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmPublishCourse}
                  className="px-4 py-4 w-full bg-[#009C00] rounded-br-lg hover:bg-green-700 text-white"
                >
                  Publish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 m-4 bg-black/60 backdrop-blur-[5px] flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] rounded-xl  w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-white px-6 pt-6 text-lg font-bold mb-3">
                Delete Course
              </h2>

              <p className="text-white/70 px-6 mb-6">
                Are you sure you want to delete this course?
                This action cannot be undone.
              </p>

              <div className="flex w-full ">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-4 w-full  bg-[#00ff0038] rounded-bl-lg hover:bg-green-600 text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDeleteCourse}
                  className="px-4  py-4 w-full    bg-[#ff000038] rounded-br-lg  hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] rounded-xl p-6 w-80 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-white text-lg font-bold mb-2">
                🎉 Success!
              </h2>

              <p className="text-white/70">
                {modalMessage}
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  className="bg-[#009C00] hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  onClick={handleModalOk}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseManagementTable;
