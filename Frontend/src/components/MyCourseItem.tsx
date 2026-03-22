import React from "react";
import { useNavigate } from "react-router-dom";
import { backarr } from "../assets";
import type { Course } from "../data/courses";

interface MyCourseItemProps {
    course: Course;
    lessonCompleted: number;
    lessonOverall: number;
}

const MyCourseItem: React.FC<MyCourseItemProps> = ({
    course,
    lessonCompleted,
    lessonOverall,
}) => {
    const navigate = useNavigate();

    const progress =
        lessonOverall > 0 ? (lessonCompleted / lessonOverall) * 100 : 0;

    return (
        <div
            onClick={() =>
                navigate(`/dashboard/course/${course.id}`, {
                    state: { course },
                })
            }
            className="flex items-center justify-between bg-[#000000] hover:bg-[#1a1a1a] transition cursor-pointer p-2 rounded-xl border border-[#1f1f1f]"
        >
            <div className="flex items-center w-full relative gap-4">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-24 object-cover rounded-lg"
                />

                <div>
                    <h2 className="text-white font-semibold text-sm">
                        {course.title}
                    </h2>

                    <p className="text-xs mt-1 text-gray-400">
                        Instructor: {course.instructor}
                    </p>

                    <p className="text-xs mt-2 text-gray-500">
                        Lessons Completed: {lessonCompleted} / {lessonOverall}
                    </p>

                    <div className="w-40 h-1.5 bg-[#222] rounded-full mt-2">
                        <div
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="bg-[#2E2E2E] absolute right-0 p-1 flex justify-center items-center rounded-md">
                    <img
                        src={backarr}
                        alt="Go to course"
                        className="w-4 h-4 object-contain rotate-180 opacity-60 hover:opacity-100 transition"
                    />
                </div>
            </div>
        </div>
    );
};

export default MyCourseItem;
