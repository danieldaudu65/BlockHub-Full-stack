import React, { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModuleNotesProps {
    moduleIndex: number;
    moduleTopic: string;
    note: ReactNode; // ✅ Accept JSX elements
}

const ModuleNotes: React.FC<ModuleNotesProps> = ({ moduleIndex, moduleTopic, note }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={moduleIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 bg-black rounded-lg text-white/70"
            >
                <h3 className="font-semibold mb-2">
                    Notes for Module {moduleIndex + 1}: {moduleTopic}
                </h3>
                <p className="whitespace-pre-line">{note}</p>
            </motion.div>
        </AnimatePresence>
    );
};

export default ModuleNotes;
