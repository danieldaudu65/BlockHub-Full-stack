import React, { useState } from "react";
import { arrow, pp } from "../../assets";

interface ProjectHeaderProps {
  project?: {
    projectName?: string;   // ✅ from backend
    profileImage?: string;  // ✅ renamed from "profile"
    desc?: string;
    participants?: number;
    active_tasks?: number;
    hashtags?: string[];
    completedTasks?: number;
    totalTasks?: number;
    totalParticipants?: number;
    twitterHandle?: string; // ✅ new (optional)
    twitterId?: string;     // ✅ new (optional)
    createdAt?: string;
  };
  projectParticipant?: number; // ✅ add this

}

const UserProjectDetialsHeader: React.FC<ProjectHeaderProps> = ({ project, projectParticipant }) => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  if (!project) {
    return (
      <div className="bg-zinc-900 flex items-center justify-center w-[100%] rounded-lg text-gray-400 border h-fit border-gray-700 p-4">
        <p>No project details available - Please Connect</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop details */}
      <div className="bg-zinc-900 hidden lg:flex flex-col w-[40%] gap-4 rounded-lg text-sm text-gray-300 border h-fit border-gray-700">
        <div className="flex items-center mx-3 mt-2 gap-2 text-gray-100">
          {project.profileImage && (
            <img
              src={project.profileImage}
              alt={project.projectName || "Project"}
              className="w-10 h-10 rounded-full"
            />
          )}
          <h3 className="font-medium">{project.projectName || "Unnamed Project"}</h3>
        </div>

        {project.desc && <p className="mx-3 text-gray-400">{project.desc}</p>}

        <div className="flex flex-col">
          <button className="border-t border-gray-700 flex px-3 py-2 text-sm items-center">
            {projectParticipant || 0} participants
          </button>
          <button className="flex px-3 py-3 text-sm items-center border-t border-gray-700">
            {project.hashtags?.length || 0} hashtags
          </button>
          <button className="flex px-3 py-3 text-sm items-center border-t border-gray-700">
            <img
              className="w-[13px] mr-1"
              src={pp}
              alt="completed"
            />
            {project.completedTasks || 0} completed tasks
          </button>
        </div>
      </div>

      {/* Mobile Details */}
      <div
        onClick={() => setIsHeaderOpen(!isHeaderOpen)}

        className="flex flex-col lg:hidden gap-4 rounded-lg text-md text-gray-300 border h-fit border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center mx-3 my-2 gap-2 text-gray-100">
            {project.profileImage && (
              <img
                src={project.profileImage}
                alt={project.projectName || "Project"}
                className="w-10 h-10 rounded-full"
              />
            )}
            <h3>{project.projectName || "Unnamed Project"}</h3>
          </div>
          <img
            className={`cursor-pointer transition-transform ${isHeaderOpen ? "rotate-180" : ""}`}
            src={arrow}
            alt="arrow"
          />
        </div>

        {isHeaderOpen && (
          <div>
            {project.desc && <p className="mx-3 mb-3">{project.desc}</p>}
            <div className="flex flex-col">
              <button className="border-t border-gray-700 flex px-3 py-2 text-sm items-center">
                {projectParticipant || 0} participants
              </button>
              <button className="flex px-3 py-3 text-sm items-center border-t border-gray-700">
                {project.hashtags?.length || 0} hashtags
              </button>
              <button className="flex px-3 py-3 text-sm items-center border-t border-gray-700">
                <img className="w-[13px] mr-1" src={pp} alt="completed" />
                {project.completedTasks || 0} completed tasks
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProjectDetialsHeader;
