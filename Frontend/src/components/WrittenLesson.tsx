import React, { useState } from "react";
import { motion } from "framer-motion";
import { solidityModules } from "../pages/Course";
import type { Course } from "../data/courses";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ModuleCard from "./ModuleCard";
import Resources from "./Resources";
import ModuleNotes from "./ModuleNotes";
import { demoNotes } from "../data/DemoNoteModule";
import toast from "react-hot-toast";
import QuizModal from "./AcademyQuizModal";
import LessonNavigation from "./LessonNavigation";
import ModalWrapper from "./modalParent";
import { useNavigate } from "react-router-dom";

interface WrittenLessonProps {
    course: Course;
}

// Demo notes for each module


const WrittenLesson: React.FC<WrittenLessonProps> = ({ course }) => {
    const [completedModules, setCompletedModules] = useState<boolean[]>(
        Array(solidityModules.length).fill(false)
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    const [courseCompleted, setCourseCompleted] = useState(false);

    const [showQuiz, setShowQuiz] = useState(false);
    const [lastQuizResult, setLastQuizResult] = useState<{
        score: number;
        total: number;
        percentage: number;
        totalPoints: number;
    } | null>(null);

    console.log(lastQuizResult)
    const [points, setPoints] = useState(0);

    const navigate = useNavigate()

    const toggleCompletion = (index: number) => {
        const updated = [...completedModules];
        updated[index] = !updated[index];
        setCompletedModules(updated);
    };

    const handleNext = () => {
        const module = solidityModules[currentIndex];

        if (module.quiz) {
            setShowQuiz(true);
        } else {
            markModuleCompleteAndNext();
            // scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            // scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const markModuleCompleteAndNext = () => {
        const updated = [...completedModules];
        updated[currentIndex] = true; // mark current as completed
        setCompletedModules(updated);

        if (currentIndex < solidityModules.length - 1) setCurrentIndex(currentIndex + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    };



    return (
        <div className="max-w-md mx-auto text-white space-y-6">

            <ModalWrapper isOpen={courseCompleted} onClose={() => setCourseCompleted(false)}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#040404] p-6 rounded-2xl w-full max-w-md border border-white/10 flex flex-col items-center gap-4"
                >
                    <h2 className="text-2xl font-bold text-[#96FF96]">🎉 Congratulations! 🎉</h2>
                    <p className="text-white/70 text-sm text-center">
                        Impressive work! You've officially completed the course!e course: <strong>{course.title}</strong>. Head to your certificate page to download and showcase your new skills!
                    </p>
                    <p className="text-white/60 text-center">
                        You earned <strong>{points}</strong> points in total! 💎
                    </p>
                    <div className="flex flex-col gap-1 w-full">
                        <button
                            onClick={() => navigate('/academy/courses')}
                            className="bg-[#090909] text-white font-bold py-3 px-4 rounded-xl hover:scale-[1.02] transition"
                        >
                            Explore Courses
                        </button>
                        <button
                            onClick={() => navigate('/dashboard?tab=certificate')}
                            className="bg-[white] text-black font-bold py-3 px-4 rounded-xl hover:scale-[1.02] transition"
                        >
                            Go to certificate
                        </button>

                    </div>
                </motion.div>
            </ModalWrapper>


            {/* Course Intro */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 p-4 bg-black rounded-lg space-y-4"
            >
                <h2 className="text-xl font-bold">Follow along with the video</h2>

                <h3 className="font-semibold mt-2">Introduction</h3>
                <p className="text-white/70">
                    Welcome to BlockHub. This platform offers a complete learning experience
                    by combining video lessons, written content, quizzes, and interactive discussions.
                    Everything you need to master the course is available right here.
                </p>

                <h3 className="font-semibold mt-2">Resources & Community</h3>
                <p className="text-white/60">
                    In the top right corner of the lesson view, you'll find links to the <strong>BlockHub resources 📂</strong> page,
                    containing all course materials, examples, and references. For questions, tips, or discussions, our <strong>community forum 💬</strong> is the best place
                    to connect with fellow learners and instructors, share insights, and solve problems together.
                </p>
                <p className="text-white/60">
                    Next to the video lesson, there is a <strong>written lesson tab 📝</strong>,
                    which provides the course content in text format. This is useful for following along,
                    copy-pasting code snippets, or reviewing the material at your own pace.
                </p>
                <p className="text-white/60">
                    Every module includes a <strong>quiz 🎯</strong> to test your understanding. Completing quizzes earns points, which track your progress and reward you for mastering tasks.
                    Studying on BlockHub allows you to earn points, track achievements, and interact with the community for guidance, giving you a richer learning experience.
                </p>

                <h3 className="font-semibold mt-2">Best Practices for Learning</h3>
                <ul className="list-disc list-inside text-white/60 space-y-1">
                    <li>🌐 Engage with the Community via BlockHub forums and chat for real-time interaction.</li>
                    <li>🏝️ Take Regular Breaks: Avoid cramming; give your brain time to process and retain information.</li>
                    <li>⏩ Adjust Video Playback Speed to match your learning pace and comprehension.</li>
                    <li>❓ Ask Clear Questions: Formulate questions thoughtfully to get the best help from peers and mentors.</li>
                    <li>🧑‍💻 Test Yourself by coding along with the lessons and solving challenges.</li>
                    <li>📕 Complete Quizzes: Earn points for each task to track progress and motivate learning.</li>
                </ul>

                <h3 className="font-semibold mt-2">Conclusion</h3>
                <p className="text-white/70">
                    By following these guidelines, you'll get the most out of BlockHub.
                    Engaging with the community, pacing your learning, completing quizzes, and utilizing the platform's resources
                    will significantly enhance your course experience.
                </p>
            </motion.div>


            {/* Notes Section */}
            <ModuleNotes
                moduleIndex={currentIndex}
                moduleTopic={solidityModules[currentIndex].topic}
                note={
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {demoNotes[currentIndex]}
                    </ReactMarkdown>
                }
            />

            <Resources />

            {/* Navigation */}
            <LessonNavigation
                currentIndex={currentIndex}
                totalLessons={solidityModules.length}
                onPrev={handlePrev}
                onNext={handleNext}
                onComplete={() => {
                    // Mark last module completed
                    const updated = [...completedModules];
                    updated[currentIndex] = true;
                    setCompletedModules(updated);

                    // Show the modal
                    setCourseCompleted(true);
                }}

            />


            {/* Modules List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className=""
            >
                {solidityModules.map((module, index) => (
                    <ModuleCard
                        key={index}
                        module={module}
                        index={index}
                        completed={completedModules[index]}
                        toggleCompletion={toggleCompletion}
                    />
                ))}
            </motion.div>

            {/* Quiz Modal */}
            {solidityModules[currentIndex].quiz && (
                <QuizModal
                    isOpen={showQuiz}
                    quizData={solidityModules[currentIndex].quizData!}
                    onClose={() => setShowQuiz(false)}
                    onComplete={(result) => {
                        setShowQuiz(false);
                        setLastQuizResult(result);
                        setPoints(prev => prev + result.totalPoints);
                        toast.success(
                            `You scored ${result.score}/${result.total} (${result.percentage}%) 🎉`
                        );
                        // Mark module completed and move to next
                        markModuleCompleteAndNext();
                    }}
                />
            )}
        </div>
    );
};

export default WrittenLesson;
