import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
import { RichTextEditor } from './RichTextEditor';
import { arrow } from '../assets';
import { VideoUpload } from './VideoUpload';
import type { CourseData, Lesson, UploadedFile } from '../types/course';
import { apiRequest } from '../utils/apiRequest';

interface Props {
  courseData: CourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CourseData>>;
}

interface UploadResponse {
  file: {
    id: string;
    url: string;
    name: string;
    size: number;
    type: string;
  };
}


const CourseCreationStep2: React.FC<Props> = ({ courseData, setCourseData }) => {
  const lessons: Lesson[] = courseData.lessons || [];
  const [lessonToDelete, setLessonToDelete] = React.useState<{ index: number; title: string } | null>(null);

  /* ------------------------
     HELPER: Update Lessons
  ------------------------ */
  const updateLessons = (newLessons: Lesson[]) => {
    setCourseData(prev => ({ ...prev, lessons: newLessons }));
  };

  /* ------------------------
     LESSON HANDLERS
  ------------------------ */
  const addLesson = () => {
    const newLesson: Lesson = {
      title: "",
      description: "",
      type: "video",
      content: null, // now url object: {url, id, name}
      files: [],
      quiz: [],
      quizEnabled: false,
      open: true,
      typeDropdownOpen: false,
      videoUrl: ''
    };
    updateLessons([...lessons, newLesson]);
  };

  const removeLesson = (index: number) => {
    if (lessons.length === 1) return;
    updateLessons(lessons.filter((_, i) => i !== index));
  };

  const toggleLesson = (index: number) => {
    updateLessons(
      lessons.map((lesson, i) => (i === index ? { ...lesson, open: !lesson.open } : lesson))
    );
  };

  const handleLessonChange = (index: number, key: keyof Lesson, value: any) => {
    updateLessons(lessons.map((l, i) => (i === index ? { ...l, [key]: value } : l)));
  };

  /* ------------------------
     FILE UPLOAD HANDLER
  ------------------------ */
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiRequest<UploadResponse>("/upload", {
      method: "POST",
      body: formData,
      isFormData: true,
    });

    if (!res.success || !res.data?.file) {
      throw new Error("Upload failed");
    }

    return res.data.file; // {id, url, name, size, type}
  };

  const handleVideoUpload = async (index: number, file: File) => {
    const uploaded = await uploadFile(file);
    handleLessonChange(index, "content", uploaded);
  };

  const addFilesToLesson = async (lessonIndex: number, files: FileList) => {
    const uploadedFiles: UploadedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const uploaded = await uploadFile(files[i]);
      uploadedFiles.push(uploaded);
    }

    handleLessonChange(lessonIndex, "files", [
      ...(courseData.lessons[lessonIndex].files || []),
      ...uploadedFiles,
    ]);
  };

  const removeFileFromLesson = (lessonIndex: number, fileIndex: number) => {
    const newFiles = (courseData.lessons[lessonIndex].files || []).filter((_, i) => i !== fileIndex);
    handleLessonChange(lessonIndex, "files", newFiles);
  };

  const deleteFile = async (fileId: string) => {
    try {
      await apiRequest(`/delete-file`, {
        method: "DELETE",
        body: { id: fileId },
      });
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  /* ------------------------
     QUIZ HANDLERS (unchanged)
  ------------------------ */
  // const enableQuiz = (lessonIndex: number) => {
  //   const newLessons = [...lessons];
  //   newLessons[lessonIndex].quizEnabled = true;
  //   if (newLessons[lessonIndex].quiz.length === 0) {
  //     newLessons[lessonIndex].quiz.push({
  //       question: "",
  //       options: [{ text: "", isCorrect: true }],
  //       points: 1,
  //     });
  //   }
  //   updateLessons(newLessons);
  // };

  const addQuizQuestion = (lessonIndex: number) => {
    const newLessons = [...lessons];

    newLessons[lessonIndex].quizEnabled = true;

    newLessons[lessonIndex].quiz.push({
      question: "",
      options: [{ text: "", isCorrect: true }],
      points: 1,
    });

    updateLessons(newLessons);
  };

  const removeQuizQuestion = (lessonIndex: number, questionIndex: number) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quiz.splice(questionIndex, 1);
    updateLessons(newLessons);
  };

  const handleQuizQuestionChange = (lessonIndex: number, questionIndex: number, key: keyof typeof lessons[0]["quiz"][0], value: any) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quiz[questionIndex] = {
      ...newLessons[lessonIndex].quiz[questionIndex],
      [key]: value,
    };
    updateLessons(newLessons);
  };

  const addQuizOption = (lessonIndex: number, questionIndex: number) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quiz[questionIndex].options.push({ text: "", isCorrect: false });
    updateLessons(newLessons);
  };

  const removeQuizOption = (lessonIndex: number, questionIndex: number, optionIndex: number) => {
    const newLessons = [...lessons];
    if (newLessons[lessonIndex].quiz[questionIndex].options.length <= 1) return;
    newLessons[lessonIndex].quiz[questionIndex].options.splice(optionIndex, 1);
    updateLessons(newLessons);
  };

  const handleQuizOptionChange = (lessonIndex: number, questionIndex: number, optionIndex: number, value: string) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quiz[questionIndex].options[optionIndex].text = value;
    updateLessons(newLessons);
  };

  const setCorrectOption = (lessonIndex: number, questionIndex: number, optionIndex: number) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quiz[questionIndex].options = newLessons[lessonIndex].quiz[questionIndex].options.map(
      (opt, i) => ({ ...opt, isCorrect: i === optionIndex })
    );
    updateLessons(newLessons);
  };
  // ===== Render =====
  return (
    <div className="space-y-6 w-full">
      <h1 className="text-white text-xl font-semibold">Course Lessons</h1>

      <div className="space-y-4">
        <AnimatePresence>
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              layout
              initial={false}
              transition={{ duration: 0.25 }}
              className="border border-[#232323] rounded-xl bg-[#030303] p-4 w-full"
            >
              {/* Lesson Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleLesson(index)}
              >
                <div className="text-white font-medium w-full justify-between text-sm flex items-center gap-2">
                  <span className="max-w-30">
                    Lesson {index + 1}{lesson.title ? `: ${lesson.title}` : ''}
                  </span>

                  {lesson.quizEnabled && lesson.quiz.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-green-600 rounded-full text-white">
                      {lesson.quiz.length} Question{lesson.quiz.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {lesson.open ? <FaChevronUp className='opacity-40 ml-2' /> : <FaChevronDown className='opacity-40 ml-2' />}
                  <FaTrash
                    onClick={(e) => {
                      e.stopPropagation();
                      setLessonToDelete({
                        index,
                        title: lesson.title || `Lesson ${index + 1}`,
                      });
                    }}
                    className={`text-red-500 hover:text-red-400 cursor-pointer ${lessons.length === 1 ? 'opacity-30 cursor-not-allowed' : ''
                      }`}
                  />
                </div>
              </div>

              {/* Lesson Body */}
              <AnimatePresence>
                {lesson.open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-3 overflow-hidden w-full"
                  >
                    {/* Lesson Name & Description */}
                    <div className="flex flex-col lg:flex-row gap-4 w-full">
                      <div className="flex-1 flex flex-col">
                        <label className="text-white/70 text-sm mb-2 mt-3">
                          Lesson Name
                        </label>
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) =>
                            handleLessonChange(index, "title", e.target.value)
                          }
                          placeholder="Enter lesson name"
                          className="border border-[#232323] rounded-lg py-2 px-3 bg-transparent text-white text-sm w-full"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <label className="text-white/70 text-sm mb-2 mt-3">
                          Lesson Description
                        </label>
                        <textarea
                          value={lesson.description}
                          onChange={(e) =>
                            handleLessonChange(index, "description", e.target.value)
                          }
                          placeholder="Enter lesson description"
                          rows={3}
                          className="border border-[#232323] rounded-lg py-2 px-3 bg-transparent text-white text-sm w-full"
                        />
                      </div>
                    </div>

                    {/* Lesson Type */}
                    <div className="flex flex-col relative w-full lg:max-w-md">
                      <label className="text-white/70 text-sm mb-2 mt-3">
                        Lesson Type
                      </label>
                      <motion.div
                        className="relative border border-[#232323] rounded-lg bg-transparent text-white text-sm cursor-pointer flex items-center justify-between py-2 px-3 w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLessonChange(
                            index,
                            "typeDropdownOpen",
                            !lesson.typeDropdownOpen
                          );
                        }}
                      >
                        <span>{lesson.type === "note" ? "Note" : "Video"}</span>
                        <motion.img
                          src={arrow}
                          alt="arrow"
                          className="w-3 h-3"
                          animate={{ rotate: lesson.typeDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>

                      <AnimatePresence>
                        {lesson.typeDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute left-0 right-0 bg-[#111] border border-[#232323] rounded-b-lg overflow-hidden mt-1 z-10"
                          >
                            {["note", "video"].map((t) => (
                              <div
                                key={t}
                                className="px-3 py-2 hover:bg-[#222] cursor-pointer text-white text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateLessons(
                                    lessons.map((l, i) =>
                                      i === index
                                        ? {
                                          ...l,
                                          type: t as "note" | "video",
                                          content: t === "video" ? null : "",
                                          typeDropdownOpen: false,
                                        }
                                        : l
                                    )
                                  );
                                }}
                              >
                                {t === "note" ? "Note" : "Video"}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <motion.div
                      key={`${lesson.type}-${index}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {lesson.type === "note" ? (
                        <RichTextEditor
                          value={lesson.content as string}
                          onChange={(content: string) =>
                            handleLessonChange(index, "content", content)
                          }
                        />
                      ) : (
                        <VideoUpload
                          file={lesson.content as File | UploadedFile | null}
                          onFileSelect={(file) => file && handleVideoUpload(index, file)}
                        />
                      )}
                    </motion.div>

                    {/* Add Question + Add File Row */}
                    <div className="flex flex-row gap-3 w-full mt-4">
                      <button
                        onClick={() => addQuizQuestion(index)}
                        className="flex items-center w-full  m-auto justify-center gap-1 text-green-400 text-sm px-3 py-4 rounded-md border border-green-400 hover:bg-green-500 hover:text-white transition"
                      >
                        <FaPlus /> Add Question
                      </button>

                      <button
                        onClick={() =>
                          document.getElementById(`file-input-${index}`)?.click()
                        }
                        className="flex items-center w-full  m-auto justify-center gap-1 text-blue-400 text-sm px-3 py-4 rounded-md border border-blue-400 hover:bg-blue-500 hover:text-white transition"
                      >
                        <FaPlus /> Add File
                      </button>

                      <input
                        type="file"
                        multiple
                        id={`file-input-${index}`}
                        onChange={(e) => {
                          if (!e.target.files) return;
                          addFilesToLesson(index, e.target.files);
                        }}
                        className="hidden"
                      />
                    </div>
                    {/* Display Uploaded Files */}
                    {lesson.files && lesson.files.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {lesson.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex items-center justify-between text-white text-xs border border-[#232323] rounded-lg px-3 py-4 my-3 bg-[#1111117c]">
                            <span>{file.name}</span>
                            <FaTrash
                              className="text-red-500 hover:text-red-400 cursor-pointer"
                              onClick={async () => {
                                const file = lesson.files[fileIndex];

                                await deleteFile(file.id);

                                removeFileFromLesson(index, fileIndex);
                              }} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Animated Question List */}
                    <AnimatePresence>
                      {lesson.quiz.map((q, qIndex) => (
                        <motion.div
                          key={qIndex}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 border border-[#232323] rounded-lg p-3 bg-[#020202] space-y-2"
                        >
                          {/* Question header */}
                          <div className="flex justify-between items-center">
                            <label className="text-white/70 text-sm">Question {qIndex + 1}</label>
                            <FaTrash
                              onClick={() => removeQuizQuestion(index, qIndex)}
                              className="text-red-500 hover:text-red-400 cursor-pointer"
                            />
                          </div>

                          {/* Question text */}
                          <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuizQuestionChange(index, qIndex, 'question', e.target.value)}
                            placeholder="Enter question text"
                            className="border border-[#232323] outline-none rounded-lg py-3 px-2 bg-transparent text-white text-sm w-full"
                          />

                          {/* Options */}
                          {q.options.map((opt, optIndex) => (
                            <div key={optIndex} className="flex items-center gap-2 mt-2">
                              <input
                                type="text"
                                value={opt.text}
                                onChange={(e) => handleQuizOptionChange(index, qIndex, optIndex, e.target.value)}
                                placeholder={`Option ${optIndex + 1}`}
                                className="border border-[#232323] rounded-lg py-3 px-2 bg-transparent text-white text-sm flex-1"
                              />
                              <input
                                type="radio"
                                name={`correct-${index}-${qIndex}`}
                                checked={opt.isCorrect}
                                onChange={() => setCorrectOption(index, qIndex, optIndex)}
                                className="accent-green-500"
                              />
                              <span className="text-white/50 text-sm">Correct</span>
                              {q.options.length > 1 && (
                                <FaTrash
                                  onClick={() => removeQuizOption(index, qIndex, optIndex)}
                                  className="text-red-500 hover:text-red-400 cursor-pointer"
                                />
                              )}
                            </div>
                          ))}

                          <button
                            onClick={() => addQuizOption(index, qIndex)}
                            className="flex mt-2 items-center gap-1 text-green-400 text-sm"
                          >
                            <FaPlus /> Add Option
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Delete Lesson Modal */}
        <AnimatePresence>
          {lessonToDelete && (
            <motion.div
              key="delete-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-[#030303] p-6 rounded-xl border border-[#232323] w-11/12 max-w-md"
              >
                <h2 className="text-white text-lg font-semibold mb-4">Delete "{lessonToDelete.title}"?</h2>
                <p className="text-white/70 mb-6 text-sm">Are you sure you want to delete this lesson? This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setLessonToDelete(null)} className="px-4 py-2 rounded-md border border-green-900 text-white bg-[#0133011e] hover:bg-[#0953096c] transition">
                    No
                  </button>
                  <button
                    onClick={() => {
                      if (lessonToDelete) removeLesson(lessonToDelete.index);
                      setLessonToDelete(null);
                    }}
                    className="px-4 py-2 rounded-md border border-green-900 bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Yes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Lesson Button */}
      <button
        onClick={addLesson}
        className="w-full flex items-center justify-center gap-2 bg-[#0ca10c80] hover:bg-[#08a308] px-4 py-3 rounded-md text-white text-sm transition"
      >
        <FaPlus /> Add Lesson
      </button>
    </div>
  );
};

export default CourseCreationStep2;