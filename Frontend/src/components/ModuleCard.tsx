import React from "react";
import { motion } from "framer-motion";
import { time, bulb } from "../assets";

interface ModuleCardProps {
    module: any;
    index: number;
    completed: boolean;
    toggleCompletion: (i: number) => void;
}


const ModuleCard: React.FC<ModuleCardProps> = ({ module, index, completed, toggleCompletion }) => {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="bg-[#000000] border border-white/5 p-4 flex flex-col gap-2 relative rounded-lg">
                <div className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleCompletion(index)}
                        className="w-4 h-4 accent-[#000000]"

                    />

                    <p className="font-semibold">{module.week}.</p>
                    <p className="font-semibold">{module.topic}</p>
                </div>
                <p className="text-white/50 text-sm mt-1">{module.description}</p>
                <div className="flex items-center gap-2 my-1">
                    <img src={time} alt="duration" className="w-4" />
                    <p className="text-white/50 text-sm -mr-1">Duration:</p>
                    <p className="text-white/70 text-sm">{module.duration}</p>
                </div>

                {module.quiz && (
                    <div className="bg-[#FF85121A] flex items-center gap-2 right-2 z-20 border absolute border-[#FF851299] p-2 py-1 -top-0 rounded text-center text-[#FFB545] text-xs font-semibold mt-2">
                        <img src={bulb} alt="quiz" className="w-4" />
                        <p>Quiz</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ModuleCard;
