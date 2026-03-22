import React, { useState } from "react";
import type { CourseData, Lesson } from "../types/course";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "../utils/apiRequest";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  courseData: CourseData;
  editMode: boolean;
}

const CourseCreationStep3: React.FC<Props> = ({ courseData, editMode }) => {
  const lessons: Lesson[] = courseData.lessons || [];
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedTutor, setUploadedTutor] = useState<any>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const viewMode = location.state?.viewMode || false;

  const [openLessons, setOpenLessons] = useState<boolean[]>(
    lessons.map(() => false)
  );
  const [showModal, setShowModal] = useState(false);

  const toggleLesson = (index: number) => {
    const updated = [...openLessons];
    updated[index] = !updated[index];
    setOpenLessons(updated);
  };

  /* -------------------------
     Thumbnail display
  -------------------------- */
  let thumbnailSrc = "";

  if (!courseData.thumbnail) {
    thumbnailSrc = "";
  } else if (typeof courseData.thumbnail === "string") {
    thumbnailSrc = courseData.thumbnail;
  } else if (courseData.thumbnail instanceof File) {
    thumbnailSrc = URL.createObjectURL(courseData.thumbnail);
  } else if (typeof courseData.thumbnail === "object" && courseData.thumbnail !== null && "url" in courseData.thumbnail) {
    thumbnailSrc = (courseData.thumbnail as { url: string }).url;
  }

  /* -------------------------
     UPLOAD LOGIC (Create or Update)
  -------------------------- */

  const safeLessons = (lessons || []).map((l, idx) => ({
    title: l.title || `Untitled Lesson ${idx + 1}`,
    content: l.content || '',
    type: l.type || 'note',
    videoUrl: l.videoUrl || '',
  }));

  const handleUpload = async () => {
    if (viewMode) return;

    try {
      setIsUploading(true);

      const payload = {
        name: courseData.name,
        overview: courseData.overview,
        level: courseData.level,
        tag: courseData.tag,
        twitter: courseData.twitter,
        website: courseData.website,
        lessons: courseData.lessons || safeLessons,
        thumbnail: courseData.thumbnail, // URL or File or base64
        courseId: courseData._id, // For editing
      };

      let response;

      if (editMode) {
        response = await apiRequest("/tutor_course/update_course", {
          method: "PUT",
          body: payload,
          tokenType: "tutor",
        });
      } else {
        response = await apiRequest("/tutor_course/create_course", {
          method: "POST",
          body: payload,
          tokenType: "tutor",
        });
      }

      const { success, data } = response;

      if (success) {
        // Clean draft ONLY if it's a new create
        if (!editMode) {
          localStorage.removeItem("course_creation_draft");
        }

        // update tutor + courses
        setUploadedTutor({
          tutor: data.tutor,
          courses: data.allCourses,
        });

        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  /* -------------------------
     Save modal actions
  -------------------------- */

  const handleModalOk = () => {
    if (uploadedTutor) {
      localStorage.setItem("tutorInfo", JSON.stringify(uploadedTutor.tutor));
      localStorage.setItem("tutorCourses", JSON.stringify(uploadedTutor.courses));
    }

    setShowModal(false);
    navigate("/dashboard/academy-management");
  };

  /* -------------------------
     RENDER
  -------------------------- */

 return (
  <div className="space-y-4 relative max-w-6xl mx-auto  lg:px-0">
    <h1 className="text-white text-xl font-bold lg:text-2xl">
      {editMode ? "Review Your Changes" : "Course Lesson"}
    </h1>

    {/* Course Summary */}
    <div className="border border-[#232323] bg-[#030303] rounded-xl p-3 space-y-4 lg:flex lg:gap-6 lg:items-start lg:space-y-0">
      <div className="flex-1 space-y-2">
        <p className="flex flex-col">
          <span className="font-medium text-xs text-white/50">Course name</span>
          <span className="text-white text-sm lg:text-base">{courseData.name || "N/A"}</span>
        </p>

        <p className="flex flex-col">
          <span className="font-medium text-xs text-white/50">Overview:</span>
          <span className="text-white text-sm lg:text-base">{courseData.overview || "N/A"}</span>
        </p>

        <div className="flex gap-6 flex-wrap lg:flex-nowrap">
          <p className="flex flex-col gap-1">
            <span className="font-medium text-xs text-white/50">Course Level:</span>
            <span className="text-white text-sm lg:text-base">{courseData.level || "N/A"}</span>
          </p>

          <p className="flex flex-col gap-1">
            <span className="font-medium text-xs text-white/50">Tag:</span>
            <span className="text-white p-1 px-2 bg-[#1D1C1F] rounded-lg text-sm lg:text-base">
              {courseData.tag || "N/A"}
            </span>
          </p>
        </div>
      </div>

      {thumbnailSrc && (
        <div className="mt-4 lg:mt-0 lg:w-1/3 flex-shrink-0">
          <span className="font-medium text-xs text-white/50">Course Thumbnail:</span>
          <img
            src={thumbnailSrc}
            alt="Course Thumbnail"
            className="w-full object-cover rounded-xl border border-white/20 mt-2"
          />
        </div>
      )}
    </div>

    {/* Lessons */}
    <div className="space-y-2 mt-4">
      <h2 className="text-white font-semibold mt-2 text-xl lg:text-2xl">Course Lessons</h2>

      {lessons.length === 0 && (
        <p className="text-white/60">No lessons added yet</p>
      )}

      {lessons.map((lesson, index) => (
        <div
          key={index}
          className="border border-[#232323] rounded-xl bg-[#030303] overflow-hidden lg:max-w-5xl lg:mx-auto"
        >
          <div
            className="flex justify-between items-center p-4 cursor-pointer lg:p-5"
            onClick={() => toggleLesson(index)}
          >
            <h3 className="text-white flex items-center justify-between w-full font-medium lg:text-base">
              <p className="text-xs max-w-30 lg:max-w-[60%] truncate">
                Lesson {index + 1}
                {lesson.title ? `: ${lesson.title}` : ""}
              </p>

              {lesson.quizEnabled && lesson.quiz.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-[#009C00] rounded-full text-white lg:text-sm">
                  {lesson.quiz.length} Question{lesson.quiz.length > 1 ? "s" : ""}
                </span>
              )}
            </h3>

            {openLessons[index] ? (
              <FaChevronUp className="text-white/50" />
            ) : (
              <FaChevronDown className="text-white/50" />
            )}
          </div>

          {/* Expandable lesson content */}
          <AnimatePresence>
            {openLessons[index] && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
                className="p-4 border-t border-[#232323] space-y-3 lg:p-5"
              >
                {lesson.description && (
                  <p className="text-white/70 text-sm lg:text-base">
                    {lesson.description}
                  </p>
                )}

                {lesson.type === "note" && lesson.content && (
                  <div className="border border-[#232323] rounded-md p-2 bg-[#111] text-white text-sm lg:text-base">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lesson.content as string,
                      }}
                    />
                  </div>
                )}

                {lesson.type === "video" &&
                  lesson.content !== null &&
                  !(lesson.content instanceof File) &&
                  typeof lesson.content === "object" &&
                  "url" in lesson.content && (
                    <video
                      src={lesson.content.url}
                      controls
                      className="w-full rounded-md mt-2 border border-white/20"
                    />
                  )}

                {lesson.type === "video" &&
                  lesson.content instanceof File && (
                    <video
                      src={URL.createObjectURL(lesson.content)}
                      controls
                      className="w-full rounded-md mt-2 border border-white/20"
                    />
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>

    {/* Submit Button */}
    {!viewMode && (
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 bg-[#009C00] hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-sm transition transform hover:scale-105 lg:text-base"
          disabled={isUploading}
        >
          {isUploading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
          ) : editMode ? (
            "Save Changes"
          ) : (
            "Upload Course"
          )}
        </button>
      </div>
    )}

    {/* Modal */}
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#111] rounded-xl p-6 w-80 lg:w-96 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-3 right-3 text-white hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>

            <h2 className="text-white text-lg font-bold mb-2 lg:text-xl">
              🎉 Success!
            </h2>
            <p className="text-white/70 lg:text-base">
              {editMode
                ? "Your course has been updated!"
                : "Your course has been uploaded!"}
            </p>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-[#009C00] hover:bg-green-700 text-white px-4 py-2 rounded-md lg:px-6 lg:py-3"
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

export default CourseCreationStep3;
