import React, { useEffect, useState } from "react";
import CourseCreationToggle from "../components/CourseCreationToggle";
import CourseCreationStep1 from "../components/CourseCreationStep1";
import CourseCreationStep2 from "../components/CourseCreationStep2";
import CourseCreationStep3 from "../components/CourseCreationStep3";
import { useLocation, useNavigate } from "react-router-dom";
import { type CourseData } from "../types/course";
import { backarr } from "../assets";


const STORAGE_KEY = "course_creation_draft";

/* -------------------------
   File Helpers
-------------------------- */

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const base64ToFile = async (base64: string, filename: string) => {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
};

/* -------------------------
   Component
-------------------------- */

const CourseCreate: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const viewMode = location.state?.viewMode || false;
  const editMode = location.state?.editMode || false;
  const courseToEdit = location.state?.course || null;
  const navigate = useNavigate()

  const [hasLoaded, setHasLoaded] = useState(false);

  const [courseData, setCourseData] = useState<CourseData>({
    totalEnrollments: 0,
    _id: "",
    name: "",
    overview: "",
    thumbnail: null,
    level: "",
    tag: "",
    twitter: "",
    website: "",
    lessons: [
      {
        title: "",
        description: "",
        type: "note",
        content: "",
        quizEnabled: false,
        quiz: [],
        open: true,
        files: [],
        typeDropdownOpen: false,
        videoUrl: ""
      },
    ],
  });

  useEffect(() => {
    if (viewMode) {
      setCurrentPage(3);
    }
  }, [viewMode]);

  /* -------------------------
     Auto-fill Twitter Handle
  -------------------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    try {
      const user = JSON.parse(storedUser);
      if (user.twitterHandle && !courseData.twitter) {
        setCourseData((prev) => ({
          ...prev,
          twitter: `https://x.com/${user.twitterHandle.replace(/^@/, "")}`,
        }));
      }
    } catch (err) {
      console.error("Failed Twitter load:", err);
    }
  }, []);

  /* -------------------------
     LOAD DATA (Draft or Edit Mode)
  -------------------------- */

  useEffect(() => {
    const loadData = async () => {
      // 1️⃣ EDIT MODE → load the course content passed through navigation
      if (editMode && courseToEdit) {
        setCourseData(courseToEdit);
        setHasLoaded(true);
        return;
      }

      // 2️⃣ CREATE MODE → load draft
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setHasLoaded(true);
        return;
      }

      try {
        const parsed = JSON.parse(saved);

        // Restore thumbnail
        if (parsed.thumbnail) {
          if (typeof parsed.thumbnail === "string") {
            parsed.thumbnail = await base64ToFile(parsed.thumbnail, "thumbnail.jpg");
          } else if (parsed.thumbnail.url) {
            const res = await fetch(parsed.thumbnail.url);
            const blob = await res.blob();
            parsed.thumbnail = new File([blob], parsed.thumbnail.name || "thumbnail.jpg", { type: blob.type });
          }
        }

        // Restore videos
        parsed.lessons = await Promise.all(
          parsed.lessons.map(async (lesson: any) => {
            if (
              lesson.type === "video" &&
              lesson.content &&
              typeof lesson.content === "string"
            ) {
              return {
                ...lesson,
                content: await base64ToFile(lesson.content, "lesson-video.mp4"),
              };
            }
            return lesson;
          })
        );

        setCourseData(parsed);
      } catch (err) {
        console.error("Draft load failed:", err);
      }

      setHasLoaded(true);
    };

    loadData();
  }, []);

  /* -------------------------
     AUTO SAVE (only in create mode)
  -------------------------- */

  useEffect(() => {
    if (!hasLoaded || editMode) return;

    const saveDraft = async () => {
      try {
        const dataToSave: any = { ...courseData };

        // Convert thumbnail
        if (courseData.thumbnail instanceof File) {
          dataToSave.thumbnail = await fileToBase64(courseData.thumbnail);
        }

        // Convert videos
        dataToSave.lessons = await Promise.all(
          courseData.lessons.map(async (lesson) => {
            if (lesson.type === "video" && lesson.content instanceof File) {
              return {
                ...lesson,
                content: await fileToBase64(lesson.content),
              };
            }
            return lesson;
          })
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (err) {
        console.error("Draft save failed:", err);
      }
    };

    saveDraft();
  }, [courseData, hasLoaded, editMode]);

  /* -------------------------
     Navigation
  -------------------------- */

  const totalPages = 3;

  const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      {(viewMode || currentPage === 1) && (
        <div
          onClick={() => navigate(-1)}
          className={`flex text-white text-sm font-bold gap-1 ${editMode ? "mb-3 -mt-0" : "-mt-2 mb-2"
            }`}
        >
          <img src={backarr} alt="" />
          <p>Back</p>
        </div>
      )}

      {/* Course Creation Toggle (mobile stays the same) */}
      <div className="lg:hidden">

        {!viewMode && (
          <CourseCreationToggle
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNext}
            onPrev={handlePrev}
            onSelect={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* Step Content */}
      <div className=" text-white lg:flex lg:gap-8">
        {/* ---------- Desktop Left (Toggle) ---------- */}
        <div className="hidden lg:block lg:w-1/3">
          {!viewMode && (
            <CourseCreationToggle
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNext}
              onPrev={handlePrev}
              onSelect={(page) => setCurrentPage(page)}
            />
          )}
        </div>

        {/* ---------- Desktop Right (Step Content) ---------- */}
        <div className="lg:w-2/3">
          {currentPage === 1 && (
            <CourseCreationStep1
              courseData={courseData}
              setCourseData={setCourseData}
            />
          )}
          {currentPage === 2 && (
            <CourseCreationStep2
              courseData={courseData}
              setCourseData={setCourseData}
            />
          )}
          {currentPage === 3 && (
            <CourseCreationStep3 courseData={courseData} editMode={editMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
