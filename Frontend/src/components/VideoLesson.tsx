import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";
import { solidityModules } from "../pages/Course";
import {  learning2 } from "../assets";
import type { Course } from "../data/courses";
import ModuleCard from "./ModuleCard";
import Resources from "./Resources";
import ModalWrapper from "./modalParent";
import toast from "react-hot-toast";
import QuizModal from "./AcademyQuizModal";
import LessonNavigation from "./LessonNavigation";
import { useNavigate } from "react-router-dom";



interface VideoLessonProps {
    course: Course;
}

const VideoLesson: React.FC<VideoLessonProps> = ({ course }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate()

    const [completedModules, setCompletedModules] = useState<boolean[]>(
        Array(solidityModules.length).fill(false)
    );

    const [showQuiz, setShowQuiz] = useState(false);
    const [courseCompleted, setCourseCompleted] = useState(false);


    const [points, setPoints] = useState(0);

    // const [showResult, setShowResult] = useState(false);

    const [countdown, setCountdown] = useState<number | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    // const [lastQuizResult, setLastQuizResult] = useState<{
    //     score: number;
    //     total: number;
    //     percentage: number;
    //     totalPoints: number;
    // } | null>(null);



    // When video ends
    const handleVideoEnd = () => {
        // Mark current module completed
        const updated = [...completedModules];
        updated[currentIndex] = true;
        setCompletedModules(updated);

        // Check if this module has a quiz
        if (solidityModules[currentIndex].quiz) {
            setShowQuiz(true); // Show quiz overlay
        } else {
            // Start countdown if no quiz
            if (currentIndex < solidityModules.length - 1) {
                setCountdown(10);
            }
        }
    };


    useEffect(() => {
        if (completedModules.every((completed) => completed)) {
            setCourseCompleted(true);
        }
    }, [completedModules]);


    // Countdown effect
    useEffect(() => {
        if (countdown === null) return;
        if (countdown === 0) {
            setCountdown(null);
            setCurrentIndex((prev) => prev + 1);
            setTimeout(() => {
                videoRef.current?.play();
            }, 100); // small delay to ensure video is ready
            return;
        }

        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const toggleModuleCompletion = (index: number) => {
        const updated = [...completedModules];
        updated[index] = !updated[index];
        setCompletedModules(updated);
    };

    const [currentIndex, setCurrentIndex] = useState(0);


    const handleNext = () => {
        const updated = [...completedModules];
        updated[currentIndex] = true; // mark current as completed
        setCompletedModules(updated);
        if (currentIndex < solidityModules.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;

        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        setProgress((current / total) * 100);
    };

    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;
        setDuration(videoRef.current.duration);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;

        videoRef.current.currentTime = percentage * duration;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;

        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;

        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="max-w-md" ref={containerRef}>

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


            {solidityModules[currentIndex].quiz && (
                <QuizModal
                    isOpen={showQuiz}
                    quizData={solidityModules[currentIndex].quizData!}
                    onClose={() => setShowQuiz(false)}
                    onComplete={(result) => {
                        setPoints(prev => prev + result.totalPoints); // you can still only use points
                        setShowQuiz(false);

                        toast.success(`+${result.totalPoints} Points Earned 🎉`);

                        if (currentIndex < solidityModules.length - 1) {
                            setCountdown(10);
                        }
                    }}
                />
            )}


            {/* VIDEO */}
            {/* VIDEO */}
            <div className="relative m-2 rounded-xl overflow-hidden bg-black">
                <video
                    ref={videoRef}
                    className="w-full"
                    poster={course.image}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onEnded={handleVideoEnd}
                >
                    <source src={solidityModules[currentIndex].video} type="video/mp4" />
                </video>



                {/* Countdown overlay */}
                <AnimatePresence>
                    {countdown !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center z-10"
                        >
                            {/* Glassmorphism background */}
                            <div className="bg-black/60 backdrop-blur-md rounded-xl px-6 py-4 shadow-lg border border-white/20 flex flex-col items-center gap-2">
                                <p className="text-white text-lg md:text-xl font-semibold tracking-wide text-center">
                                    Next Module Starting Soon
                                </p>
                                <p className="text-[#96FF96] text-4xl md:text-5xl font-bold animate-pulse">
                                    {countdown}s
                                </p>
                                <p className="text-white/70 text-sm text-center max-w-xs">
                                    Module {currentIndex + 2} will play automatically.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* Center Play Button */}
                <AnimatePresence>
                    {!isPlaying && countdown === null && !showQuiz && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={togglePlay}
                            className="absolute inset-0 flex items-center justify-center z-20"
                        >
                            <div className="bg-[#96FF96] text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-[0_0_25px_#96FF96]">
                                ▶
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>


            {/* CONTROLS */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 mx-2 space-y-3"
            >
                {/* Progress Bar */}
                <div
                    onClick={handleSeek}
                    className="w-full h-2  bg-white/20 rounded cursor-pointer"
                >
                    <motion.div
                        className="h-2 bg-[#96FF96] rounded shadow-[0_0_8px_#96FF96]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between text-sm text-white gap-3">

                    {/* Play / Pause */}
                    <button
                        onClick={togglePlay}
                        className=" text-white w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 transition "
                    >
                        {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                    </button>


                    {/* Time */}
                    <span className="text-white/70">
                        {videoRef.current
                            ? formatTime(videoRef.current.currentTime)
                            : "0:00"}{" "}
                        / {formatTime(duration)}
                    </span>

                    {/* Volume */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleMute}
                            className="text-[#96FF96] text-lg"
                        >
                            {isMuted ? "🔇" : "🔊"}
                        </button>

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20 accent-[#96FF96]"
                        />
                    </div>

                    {/* Fullscreen */}
                    <button
                        onClick={toggleFullscreen}
                        className="text-[#96FF96] text-lg hover:scale-110 transition"
                    >
                        ⛶
                    </button>
                </div>
            </motion.div>

            <div className="m-2">

                {/* Course Title */}
                <h1 className="text-xl font-bold mt-4">
                    {course.title}
                </h1>

                {/* COURSE INFO */}
                <p className="text-white/70 mt-2">
                    {course.description}
                </p>

                <p className="text-sm text-white/60 mt-2">
                    Level: {course.level}
                </p>

                <p className="text-sm text-white/60">
                    Duration: {course.duration}
                </p>
            </div>


            <Resources />

            {/* Navigation */}
            <LessonNavigation
                currentIndex={currentIndex}
                totalLessons={solidityModules.length}
                onPrev={handlePrev}
                onNext={handleNext}
                onComplete={() => setCourseCompleted(true)} // open course complete modal
            />
            <div className=" m-2">

                <div className="bg-black rounded-t-lg p-3 pt-2">
                    <h1 className="text- font-bold mt-4">
                        {course.title}
                    </h1>
                    <div className="flex gap-2 text-white/40 text-sm items-center">
                        <p>Instructor: Derik</p>
                        <div className="w-[6px] h-[6px] rounded-full bg-black border border-white/50" />
                        <div className="flex gap-1 items-center text-xs">
                            <img src={learning2} alt="" className="w-4" />
                            <p>1/9</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    key="modules"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {solidityModules.map((module, index) => (
                        <ModuleCard
                            key={index}
                            module={module}
                            index={index}
                            completed={completedModules[index]}
                            toggleCompletion={toggleModuleCompletion}
                        />
                    ))}
                </motion.div>

            </div>
        </div>
    );
};

export default VideoLesson;
