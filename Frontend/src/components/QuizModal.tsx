import React, { useState, useEffect, useRef } from "react";
import { quizData } from "../data/Quiz";

interface QuizModalProps {
    roles: string[]; // exactly 2 interests from user
    onFinish: (
        score: number,
        total: number,
        answers: string[],
        correct: number,
        totalQuestions: number
    ) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const prepareQuestions = (questions: typeof quizData["Smart Contract Development"]) => {
    return questions.map(q => {
        const shuffledOptions = shuffleArray(q.options);
        return {
            ...q,
            options: shuffledOptions,
            correctAnswer: q.answer, // keep original correct answer
        };
    });
};

const QuizModal: React.FC<QuizModalProps> = ({ roles, onFinish }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [timer, setTimer] = useState(30);
    const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

    const countdownRef = useRef<number | null>(null);

    // Prepare and shuffle questions on mount
    useEffect(() => {
        const combinedQuestions = roles.flatMap(role => quizData[role] || []);
        const prepared = prepareQuestions(combinedQuestions);
        setShuffledQuestions(prepared);
        setAnswers(new Array(prepared.length).fill(""));
    }, [roles]);

    // Timer
    useEffect(() => {
        if (!shuffledQuestions.length) return;

        setTimer(30);
        countdownRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev === 1) {
                    if (!answers[step]) handleAnswer("__timeout__");
                    setTimeout(() => nextQuestion(), 500);
                    if (countdownRef.current) clearInterval(countdownRef.current);
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (countdownRef.current) clearInterval(countdownRef.current);
        };
    }, [step, shuffledQuestions, answers]);

    const handleAnswer = (option: string) => {
        if (countdownRef.current) clearInterval(countdownRef.current);
        const newAnswers = [...answers];
        newAnswers[step] = option;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (step < shuffledQuestions.length - 1) {
            setStep(step + 1);
        } else {
            const totalScore = shuffledQuestions.reduce(
                (sum, q) => sum + (q.score || 0),
                0
            );

            let userScore = 0;
            let correctCount = 0;

            answers.forEach((ans, idx) => {
                if (ans === shuffledQuestions[idx].correctAnswer) {
                    userScore += shuffledQuestions[idx].score || 0;
                    correctCount++;
                }
            });

            onFinish(userScore, totalScore, answers, correctCount, shuffledQuestions.length);
        }
    };

    const optionLetter = (idx: number) => String.fromCharCode(65 + idx);

    if (!shuffledQuestions.length) return null;

    return (
        <div className="inset-0 flex items-center justify-center bg-opacity-70 z-50">
            <div className="bg-[#181819] text-white p-6 rounded-2xl shadow-lg w-[90%] max-w-[400px]">
                <h2 className="text-lg font-semibold mb-4">
                    {shuffledQuestions[step].question}
                </h2>

                <div className="text-right text-sm mb-3 text-purple-400">
                    ⏳ {timer}s
                </div>

                <div className="space-y-3">
                    {shuffledQuestions[step].options.map((option: string, idx: number) => (
                        <label
                            key={idx}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border ${answers[step] === option
                                    ? "border-purple-500 bg-purple-900/40"
                                    : "border-gray-600"
                                }`}
                        >
                            <span className="flex-1">
                                {optionLetter(idx)}. {option}
                            </span>

                            <input
                                type="radio"
                                name={`q-${step}`}
                                value={option}
                                checked={answers[step] === option}
                                onChange={() => {
                                    handleAnswer(option);
                                    setTimeout(() => nextQuestion(), 300);
                                }}
                                className="w-5 h-5 ml-3 rounded-full border border-gray-500 appearance-none checked:bg-purple-500 checked:border-purple-500"
                            />
                        </label>
                    ))}

                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                        disabled
                        className="px-4 py-2 rounded-xl bg-gray-700 text-gray-400 cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-gray-300 font-medium">
                        {step + 1} / {shuffledQuestions.length}
                    </span>

                    <button
                        onClick={nextQuestion}
                        className="px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-700"
                    >
                        {step === shuffledQuestions.length - 1 ? "Finish" : "Skip"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizModal;
