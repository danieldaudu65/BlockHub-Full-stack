import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/apiRequest";

interface Course {
    id: string;
    tutorName: string;
    tutorImage: string;
    courseTitle: string;
    description: string;
    status: string;
    statusMessage?: string;
    showMenu?: boolean; // for dropdown menu toggle
}

const AdminCourseApproval: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [reasons, setReasons] = useState<Record<string, string>>({}); // reason per course
    const [showRejectInputFor, setShowRejectInputFor] = useState<string | null>(null); // which course shows rejection input

    const fetchCourses = async () => {
        const res = await apiRequest<any>("/tutor_course/get_course_submissions", {
            method: "GET",
        });

        if (res.success) {
            const coursesWithMenu = res.data.courses.map((c: Course) => ({
                ...c,
                showMenu: false,
            }));
            setCourses(coursesWithMenu);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const updateStatus = async (id: string, status: string, reason?: string) => {
        const res = await apiRequest("/tutor_course/toggle_course_status", {
            method: "PATCH",
            body: {
                courseId: id,
                status,
                reason: reason || "",
            },
            tokenType: "tutor",
        });

        if (res.success) {
            fetchCourses();
            setReasons((prev) => ({ ...prev, [id]: "" }));
            setShowRejectInputFor(null); // hide reject input after submit
        }
    };

    const toggleMenu = (id: string) => {
        setCourses((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, showMenu: !c.showMenu } : { ...c, showMenu: false }
            )
        );
        setShowRejectInputFor(null); // hide reject input if menu is toggled
    };

    const deleteCourse = async (id: string) => {
        const res = await apiRequest("/tutor_course/delete_course_submittion", {
            method: "DELETE",
            body: { courseId: id },
            tokenType: "tutor",
        });

        if (res.success) {
            fetchCourses(); // refresh list
        } else {
            alert("Failed to delete course");
        }
    };

    return (
        <div className="space-y-6 -mt-8">
            <h1 className="text-2xl text-white font-semibold">Course Submitted</h1>

            <div className="border overflow-x-auto min-h-200 border-[#232323] rounded-xl overflow-hidden">
                <table className="w-full text-left text-white border-collapse">
                    <thead className="bg-[#151515]">
                        <tr>
                            <th className="p-3 text-left">Tutor</th>
                            <th className="p-3 text-left">Course</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.map((course) => (
                            <tr
                                key={course.id}
                                className="border-b border-[#ffffff2f] hover:bg-[#1a1a1a] transition-colors"
                            >
                                {/* Tutor Info */}
                                <td className="p-3 py-5 flex items-center gap-3 min-w-[200px]">
                                    <img
                                        src={course.tutorImage}
                                        alt={course.tutorName}
                                        className="w-10 h-10 rounded-full object-cover border border-[#333]"
                                    />
                                    <span className="font-medium">{course.tutorName}</span>
                                </td>

                                {/* Course Title */}
                                <td className="p-3 font-semibold min-w-[200px]">{course.courseTitle}</td>

                                {/* Description */}
                                <td className="p-3 min-w-[200px]">{course.description}</td>

                                {/* Status */}
                                <td className="p-3 min-w-[120px]">
                                    {course.status === "pending" && (
                                        <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full font-medium text-xs">
                                            Pending
                                        </span>
                                    )}
                                    {course.status === "approved" && (
                                        <span className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full font-medium text-xs">
                                            Approved
                                        </span>
                                    )}
                                    {course.status === "rejected" && (
                                        <span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full font-medium text-xs">
                                            Rejected
                                        </span>
                                    )}
                                </td>

                                {/* Action */}
                                <td className="p-3 relative min-w-[80px]">
                                    <div className="relative">
                                        {/* Three dots button */}
                                        <button
                                            className="text-white font-bold px-2 py-1 rounded hover:bg-[#222] transition"
                                            onClick={() => toggleMenu(course.id)}
                                        >
                                            ⋮
                                        </button>

                                        {/* Dropdown menu */}
                                        {/* Dropdown menu */}
                                        {course.showMenu && (
                                            <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-[#333] rounded shadow-lg z-50 p-2">
                                                <button
                                                    className="block w-full text-left px-4 py-2 hover:bg-green-600 text-green-400 rounded"
                                                    onClick={() => updateStatus(course.id, "approved")}
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="block w-full text-left px-4 py-2 hover:bg-red-600 text-red-400 rounded mt-1"
                                                    onClick={() => setShowRejectInputFor(course.id)}
                                                >
                                                    Reject
                                                </button>

                                                <button
                                                    className="block w-full text-left px-4 py-2 hover:bg-red-800 text-red-500 rounded mt-1"
                                                    onClick={() => {
                                                        const confirmDelete = window.confirm("Are you sure you want to delete this course proposal?");
                                                        if (confirmDelete) {
                                                            deleteCourse(course.id);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>

                                                {/* Reject textarea */}
                                                {showRejectInputFor === course.id && (
                                                    <div className="mt-2">
                                                        <textarea
                                                            placeholder="Enter reason for rejection..."
                                                            className="w-full p-2 text-sm rounded bg-[#222] text-white outline-none border border-[#adadad44]"
                                                            value={reasons[course.id] || ""}
                                                            rows={6}
                                                            onChange={(e) =>
                                                                setReasons((prev) => ({ ...prev, [course.id]: e.target.value }))
                                                            }
                                                        />
                                                        <button
                                                            className="mt-2 w-full bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-sm font-medium"
                                                            onClick={() => updateStatus(course.id, "rejected", reasons[course.id])}
                                                        >
                                                            Enter
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCourseApproval;