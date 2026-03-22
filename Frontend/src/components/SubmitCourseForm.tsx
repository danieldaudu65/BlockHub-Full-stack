import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/apiRequest";

interface CourseSubmission {
  tutorName: string;
  tutorImage: string;
  courseTitle: string;
  summary: string;
  status: string;
  statusMessage?: string; // for rejection reason
}

const SubmitCourseForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tutorName: "",
    courseTitle: "",
    summary: "",
  });
  const [courses, setCourses] = useState<CourseSubmission[]>([]);

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      setLoading(true);
      const response = await apiRequest<any>("/tutor_course/get_all_submitions", {
        method: "GET",
        tokenType: "tutor",
      });
      setLoading(false);

      if (response.success && response.data) {
        const allCourses = response.data.courses.map((course: any) => ({
          tutorName: course.tutorName,
          tutorImage: course.tutorImage,
          courseTitle: course.courseTitle,
          summary: course.description,
          status: course.status,
          statusMessage: course.statusMessage || "", // <-- add this line

        }));
        setCourses(allCourses);
      }
    };
    fetchAllSubmissions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await apiRequest<any>("/tutor_course/submit_course_for_review", {
      method: "POST",
      body: {
        title: form.courseTitle,
        description: form.summary,
      },
      tokenType: "tutor",
      showSuccess: true,
    });

    setLoading(false);

    if (response.success && response.data) {
      const updatedCourses = response.data.courses.map((course: any) => ({
        tutorName: course.tutorName,
        tutorImage: course.tutorImage,
        courseTitle: course.courseTitle,
        summary: course.description,
        status: course.status,
        statusMessage: course.statusMessage || "", // <-- add this line
      }));
      setCourses(updatedCourses);
      setForm({ tutorName: "", courseTitle: "", summary: "" });
    }
  };

  // Function to determine badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "approved":
        return "bg-green-500/20 text-green-500";
      case "rejected":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-8 lg:flex lg:w-full lg:gap-6">

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#000000] border lg:w-full border-[#232323] p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold text-white">Submit Course</h2>

        <input
          type="text"
          name="courseTitle"
          placeholder="Course Title"
          value={form.courseTitle}
          onChange={handleChange}
          className="w-full bg-[#000000] text-sm border border-[#333] placeholder:text-sm rounded-md p-3 text-white"
        />

        <textarea
          name="summary"
          placeholder="Course Summary"
          value={form.summary}
          rows={6}
          onChange={handleChange}
          className="w-full bg-[#000] text-sm border border-[#333] placeholder:text-sm rounded-md p-3 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#009C00] hover:bg-green-600 px-4 py-2 rounded-md text-white font-semibold"
        >
          {loading ? "Submitting..." : "Submit Course"}
        </button>
      </form>

      {/* Table */}
      <div className="border lg:w-full min-h-150 overflow-x-auto text-sm border-[#232323] rounded-xl overflow-hidden">
        <table className="w-full text-left text-white">
          <thead className="bg-[#151515]">
            <tr>
              <th className="p-3">Tutor</th>
              <th className="p-3">Course</th>
              <th className="p-3">Summary</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b border-[#232323] hover:bg-[#1a1a1a] transition-colors">
                <td className="p-3 min-w-40 flex items-center gap-3">
                  <img
                    src={course.tutorImage}
                    alt={course.tutorName}
                    className="w-8 h-8  rounded-full object-cover"
                  />
                  {course.tutorName}
                </td>

                <td className="p-3 align-top min-w-30 font-medium">{course.courseTitle}</td>

                <td className="p-3 min-w-40 max-w-sm align-top">
                  <div className="line-clamp-4">{course.summary}</div>
                </td>
                <td className="p-3 min-w-40">
                  <span
                    className={`px-2 py-1 rounded-full font-medium text-xs ${getStatusBadge(
                      course.status
                    )}`}
                  >
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>

                  {course.status === "rejected" && course.statusMessage && (
                    <p className="text-red-400 text-xs mt-1">{course.statusMessage}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmitCourseForm;