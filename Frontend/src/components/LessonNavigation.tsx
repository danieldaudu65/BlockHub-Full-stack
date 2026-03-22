import React from "react";
import { backarr } from "../assets";
import { motion } from "framer-motion";

interface LessonNavigationProps {
    currentIndex: number;
    totalLessons: number;
    onPrev: () => void;
    onNext: () => void;
    onComplete?: () => void; // optional callback for last lesson
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
    currentIndex,
    totalLessons,
    onPrev,
    onNext,
    onComplete,
}) => {
    const isLastLesson = currentIndex === totalLessons - 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex w-full mt-4 "
        >      {/* Previous Lesson */}
            <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 text-white mx-1 px-3 justify-center w-1/2 text-sm py-3 border border-white/10 rounded disabled:opacity-50 hover:bg-white/10 transition"
            >
                <img src={backarr} className="rotate" alt="back" />
                <p>Previous Lesson</p>
            </button>

            {/* Next or Complete */}
            <button
                onClick={isLastLesson ? onComplete : onNext}
                className="flex items-center gap-2 text-white mx-1 px-3 justify-center w-1/2 text-sm py-3 border border-white/10 rounded hover:bg-white/10 transition"
            >
                <p>{isLastLesson ? "Complete Lesson" : "Next Lesson"}</p>
                {
                    !isLastLesson  && < img src={backarr} className={isLastLesson ? "rotate" : "rotate-180"} alt="next" />

                }
            </button>
        </motion.div>
    );
};

export default LessonNavigation;
