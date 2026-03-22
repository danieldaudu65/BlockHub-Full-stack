// components/TaskSheetContent.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { pfp2 } from '../assets';

interface Task {
  task: string;
  point: number;
  status: string;
  // any other properties it needs
}

interface TaskSheetContentProps {
  currentTask: Task;
  onClose: () => void;
}


const TaskSheetContent: React.FC<TaskSheetContentProps> = ({ currentTask, onClose }) => {
    if (!currentTask) return null;

    return (
        <div className="text-white space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Submitted Task</h2>
                <div
                    onClick={onClose}
                    className="bg-[#93949683] p-1.5 rounded-full cursor-pointer"
                >
                    <FaTimes className="text-[#939496] text-sm" />
                </div>
            </div>

            <div>
                <p>Ambassador</p>
                <div>
                    <img src={pfp2} alt="Ambassador" />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold">{currentTask.task}</h2>
            </div>
            <p>{currentTask.point}</p>
            <p>{currentTask.status}</p>

            <div className="flex justify-between gap-4">
                <button
                    className="w-full py-2 bg-green-700 rounded-xl text-white"
                    onClick={() => {
                        alert("Approved!");
                        onClose();
                    }}
                >
                    Approve
                </button>
                <button
                    className="w-full py-2 bg-red-600 rounded-xl text-white"
                    onClick={() => {
                        alert("Rejected!");
                        onClose();
                    }}
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default TaskSheetContent;
