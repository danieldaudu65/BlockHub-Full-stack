import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onSelect?: (page: number) => void; // optional: click bullet to jump (desktop)
}

const stepLabels = [
  "Course Overview",
  "Course lessons and content",
  "Preview",
];

const CourseCreationToggle: React.FC<Props> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onSelect,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col lg:flex-row lg:mt-13 items-start lg:items-center justify-between bg-[#15151518] border border-[#232323] rounded-xl px-6 py-4 w-full"
    >
      {/* ---------- Mobile Arrows (unchanged) ---------- */}
      <div className="flex lg:hidden w-full justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed text-white/50"
        >
          <FaChevronLeft />
        </motion.button>

        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h3 className="text-white font-semibold">
            {stepLabels[currentPage - 1]}
          </h3>
          <p className="text-white/50 text-xs">
            Step {currentPage} of {totalPages}
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed text-white/50"
        >
          <FaChevronRight />
        </motion.button>
      </div>

      {/* ---------- Desktop Stepper (lg and up) ---------- */}
      <div className="hidden lg:flex lg:flex-row lg:items-start w-full lg:gap-6">
        {/* Step bullets column */}
        <div className="flex flex-col items-start gap-4 lg:w-1/3">
          {stepLabels.map((label, idx) => {
            const page = idx + 1;
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => onSelect && onSelect(page)}
                className="flex items-center gap-3 group"
              >
                {/* bullet */}
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300
                    ${isActive ? "bg-green-500" : "bg-white/30 group-hover:bg-green-400"}`}
                />
                {/* label */}
                <span
                  className={`text-sm transition-colors duration-300
                    ${isActive ? "text-green-500 font-semibold" : "text-white/50"}`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current step info column */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-left text-white lg:flex-1"
        >
          <h3 className="font-semibold text-lg lg:text-xl break-words">
            {stepLabels[currentPage - 1]}
          </h3>
          <p className="text-white/50 text-sm lg:text-base">
            Step {currentPage} of {totalPages}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseCreationToggle;