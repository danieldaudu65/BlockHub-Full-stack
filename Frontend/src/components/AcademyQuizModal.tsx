import React, { useState } from "react";
import { motion } from "framer-motion";
import ModalWrapper from "./modalParent";
import { backarr } from "../assets";

interface Question {
    question: string;
    options: string[];
    answer: string;
}

interface QuizModalProps {
    isOpen: boolean;
    quizData: {
        pointsPerQuestion: number;
        questions: Question[];
    };
    onClose: () => void;
    onComplete: (result: {
        score: number;
        total: number;
        percentage: number;
        totalPoints: number;
    }) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, quizData, onClose, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<{
        score: number;
        total: number;
        percentage: number;
        totalPoints: number;
    } | null>(null);

    console.log("Quiz data received in modal:", isAnswered);

    const currentQuestion = quizData.questions[currentQuestionIndex];

    const handleAnswer = (option: string) => {
        // Do NOT lock selection immediately
        setSelectedOption(option);

        // Only update answers array when clicking Next
    };


    const handleNextQuestion = () => {
        if (!selectedOption) return; // require selection before next

        // Save the current selection in answers array
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = selectedOption!;
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);

            // prefill next question if already answered
            setSelectedOption(updatedAnswers[currentQuestionIndex + 1] || null);
        } else {
            finishQuiz(updatedAnswers);
        }
    };


    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);

            // prefill previous selection
            setSelectedOption(answers[currentQuestionIndex - 1] || null);
        }
    };


    const handleSkip = () => {
        // mark as unanswered
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = "";
        setAnswers(updatedAnswers);
        handleNextQuestion();
    };

    const finishQuiz = (finalAnswers: string[]) => {
        let correct = 0;
        finalAnswers.forEach((answer, index) => {
            if (answer === quizData.questions[index].answer) correct++;
        });

        const total = quizData.questions.length;
        const percentage = Math.round((correct / total) * 100);
        const totalPoints = correct * quizData.pointsPerQuestion;

        setResult({ score: correct, total, percentage, totalPoints });
        setShowResult(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    };

    const handleContinue = () => {
        if (!result) return;
        onComplete(result);

        // reset
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowResult(false);
        setResult(null);
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="min-h-screen flex items-center justify-center bg-black/60 px-4"
            >
                <div className="bg-[#040404] p-6 rounded-2xl w-full max-w-lg border border-white/10">
                    {!showResult ? (
                        <>
                            <div className="text-white flex justify-between text-sm font-bold mb-4 text-center">
                                <p>Question</p>
                                <p>{currentQuestionIndex + 1} of {quizData.questions.length}</p>
                            </div>

                            <p className="text-white/80 mb-6 text-left text-sm">{currentQuestion.question}</p>

                            <div className="flex flex-col gap-3">
                                {currentQuestion.options.map((option, i) => {
                                    const isSelected = selectedOption === option;

                                    return (
                                        <label
                                            key={i}
                                            className={`flex justify-between items-center gap-3 px-4 py-3 rounded-xl border border-white/20 cursor-pointer transition
                ${isSelected ? "bg-green-600 text-white" : "bg-black text-white"}
            `}
                                        >
                                            <span>{String.fromCharCode(65 + i)}. {option}</span>
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestionIndex}`}
                                                value={option}
                                                checked={isSelected}
                                                onChange={() => handleAnswer(option)}
                                                className="w-5 h-5 rounded-full border border-white/20 cursor-pointer
                           bg- accent-green-500 checked:bg-green-500 checked:border-green-500 transition-all"
                                            />
                                        </label>
                                    );
                                })}

                            </div>

                            {/* Navigation buttons */}
                            <div className="flex items-center justify-between mt-6 gap-2">
                                <button
                                    onClick={handlePrevQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="flex items-center gap-2 p-2  border px-4 border-white/20 rounded hover:bg-white/10 disabled:opacity-50"
                                >
                                    <img src={backarr} alt="" />
                                </button>
                                <div className="flex gap-2 items-center">

                                    <button
                                        onClick={handleSkip}
                                        className="flex items-center bg-black text-sm gap-2 px-4 p-2 border border-white/20 rounded hover:bg-white/10"
                                    >
                                        Skip
                                    </button>
                                    <button
                                        onClick={handleNextQuestion}
                                        className="flex items-center gap-2 bg-white  px-4  p-2 border border-white/20 rounded hover:bg-white/10"
                                    >
                                        <img src={backarr} className="rotate-180" alt="" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#96FF96] mb-4">Quiz Completed 🎉</h2>
                            <p className="text-white/80 mb-2">Score: {result?.score} / {result?.total}</p>
                            <p className="text-white/70 mb-2">Accuracy: {result?.percentage}%</p>
                            <p className="text-[#96FF96] font-semibold mb-6">+{result?.totalPoints} Points Earned</p>
                            <button
                                onClick={handleContinue}
                                className="w-full bg-[#96FF96] text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition"
                            >
                                Continue to Next Lesson →
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </ModalWrapper>
    );
};

export default QuizModal;
