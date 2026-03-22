import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import BottomSheet from './components/BottomSheet';
import { API_URL } from '../confiq';
import { active, arrow, clock, task2 } from '../assets/';
import Pagination from '../components/Pagination'
import No_Task from './components/No_Task';



interface submittionStats {
    totalSubmissions: number;
    approvedSubmissions: number;
    pendingSubmissions: number;
}

const SubmittedTask: React.FC = () => {
    const token = localStorage.getItem('project_token');
    const [submittedTasks, setSubmittedTasks] = useState<any[]>([]);
    const [showSheet, setShowSheet] = useState(false);
    const [currentTask, setCurrentTask] = useState<any | null>(null);
    const [overviewdetail, setOverviewDetails] = useState<submittionStats>({
        totalSubmissions: 0,
        approvedSubmissions: 0,
        pendingSubmissions: 0,
    });
    const [approving, setApproving] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // --- Define refresh function outside useEffect ---
    const fetchOverview = async () => {
        try {
            const res = await fetch(`${API_URL}/project_tasks/project-task-submissions-overview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setOverviewDetails(data);
            console.log("Overview:", data);
        } catch (err: any) {
            toast.error(err.message || 'Failed to fetch overview');
        }
    };

    const fetchSubmittedTasks = async () => {
        try {
            const res = await fetch(`${API_URL}/project_tasks/project-submitted-tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId: localStorage.getItem('project_id') }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setSubmittedTasks(data.data || []);
            console.log("Tasks:", data);
        } catch (err: any) {
            toast.error(err.message || 'Failed to fetch submitted tasks');
        }
    };

    const refreshData = () => {
        fetchOverview();
        fetchSubmittedTasks();
    };

    // --- Approve handler ---
    const handleApprove = async () => {
        setApproving(true);
        try {
            const res = await fetch(`${API_URL}/project_tasks/approve`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submissionId: currentTask.id }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Task approved!');
                setShowSheet(false);
                refreshData(); // 🔄 Refresh after approval
            } else {
                toast.error(data.message || 'Failed to approve');
            }
        } catch (error) {
            toast.error('Server error during approval');
        } finally {
            setApproving(false);
        }
    };

    // --- Reject handler ---
    const handleReject = async () => {
        setRejecting(true);
        try {
            const res = await fetch(`${API_URL}/project_tasks/decline`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submissionId: currentTask.id }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Task rejected!');
                setShowSheet(false);
                refreshData(); // 🔄 Refresh after rejection
            } else {
                toast.error(data.message || 'Failed to reject');
            }
        } catch (error) {
            toast.error('Server error during rejection');
        } finally {
            setRejecting(false);
        }
    };

    // --- useEffect to load once on mount ---
    useEffect(() => {
        if (!token) {
            toast.error('Authentication token not found');
            return;
        }
        refreshData();
    }, [token]);


    const overview = [
        { label: 'Total Submitted', icon: task2, number: overviewdetail.totalSubmissions },
        { label: 'Approved Submitted', icon: active, number: overviewdetail.approvedSubmissions },
        { label: 'Pending Submitted', icon: clock, number: overviewdetail.pendingSubmissions },
    ];

    const orderedTasks = [...submittedTasks].sort((a, b) => {
        const order: Record<'pending' | 'rejected' | 'approved', number> = {
            pending: 0,
            rejected: 1,
            approved: 2,
        };

        return order[a.status as 'pending' | 'rejected' | 'approved'] -
            order[b.status as 'pending' | 'rejected' | 'approved'];
    });
    return (
        <div>
            <div className="flex justify-between">
                <p className="flex items-center gap-2 text-xl">
                    Task
                    <span className="flex items-center gap-2 text-[#A28AE8]">
                        <FaChevronRight className="text-[10px]" />
                        <span>Submitted</span>
                    </span>
                </p>
            </div>

            <div className='lg:flex gap-5'>
                {overview.map((item, index) => (
                    <div
                        key={index}
                        className="h-28 relative py-8 rounded-2xl w-full flex gap-4 items-center bg-[#232323] my-6 px-4"
                    >
                        <div className="bg-[#181819] w-fit p-3 rounded-xl">
                            <img src={item.icon} alt="icon" />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h3 className="text-[#C2C3C6] text-md">{item.label}</h3>
                            <h3 className="text-2xl font-bold">{item.number}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="my-10">
                <div className="flex items-center text-md justify-between mb-4">
                    <h3 className="text-white text-lg font-semibold">Submitted Tasks</h3>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">Filter</span>
                        <div className="flex bg-[#1B1B1C] rounded-xl px-3 p-2 items-center gap-2 text-white">
                            <span>All</span>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>
                </div>

                {
                    submittedTasks.length === 0 ? <No_Task /> :

                        <>
                            <div className="w-full mb-12 overflow-x-auto">
                                <table className="w-full mt-6 text-left text-sm">
                                    <thead className="bg-[#1B1B1C] text-gray-400">
                                        <tr>
                                            <th className="py-3 w-[50px] px-2">
                                                <input
                                                    type="checkbox"
                                                    className="appearance-none w-4 h-4 border border-gray-400 rounded-md bg-transparent checked:bg-white checked:border-white focus:outline-none"
                                                />
                                            </th>
                                            <th className="py-3 px-4">Ambassador</th>
                                            <th className="py-3 px-2">Task</th>
                                            <th className="py-3 px-3">Point</th>
                                            <th className="py-3 px-4">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-white">
                                        {orderedTasks
                                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                            .map((item) => (
                                                <tr
                                                    key={item._id}
                                                    className="border-b border-[#2C2C2C] cursor-pointer"
                                                    onClick={() => {
                                                        setCurrentTask(item);
                                                        setShowSheet(true);
                                                    }}
                                                >
                                                    <td className="py-2 px-2">
                                                        <input
                                                            type="checkbox"
                                                            className="appearance-none w-4 h-4 border border-gray-400 rounded-md bg-transparent checked:bg-white checked:border-white focus:outline-none"
                                                        />
                                                    </td>



                                                    <td className="py-2 px-2">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={item.img}
                                                                alt=""
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                            <p className="text-white text-sm mr-18 whitespace-nowrap">
                                                                {item.name}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="text-sm truncate max-w-[300px]">{item.taskDescription}</td>
                                                    <td className="py-2 px-3 whitespace-nowrap">{item.taskPoints} pts</td>
                                                    <td className="py-6 px-4">
                                                        <span
                                                            className={`text-xs flex justify-center w-20 px-4 py-2 rounded-md ${item.status === 'approved'
                                                                ? 'bg-green-800 text-green-300'
                                                                : item.status === 'rejected' ?
                                                                    'bg-red-700 border border-gray-600 text-gray-300'
                                                                    : 'bg-transparent border border-gray-600 text-gray-300'
                                                                }`}
                                                        >
                                                            {item.status === 'approved'
                                                                ? 'Approved'
                                                                : item.status === 'rejected'
                                                                    ? 'Rejected'
                                                                    : 'Pending'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalItems={orderedTasks.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </>
                }
            </div>

            <BottomSheet show={showSheet} onClose={() => setShowSheet(false)}>
                {currentTask && (
                    <div className="text-white space-y-4">
                        <div className="flex mb-8 items-center justify-between">
                            <h2 className="text-lg font-semibold">Submitted Task</h2>
                            <div onClick={() => setShowSheet(false)} className="bg-[#93949683] p-1.5 rounded-full cursor-pointer">
                                <FaTimes className="text-[#939496] text-sm" />
                            </div>
                        </div>
                        {currentTask.proofImages && currentTask.proofImages.length > 0 && (
                            <div>
                                <p>Submitted Images</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                    {currentTask.proofImages.map((img: any, i: number) => (
                                        <a key={i} href={img.url} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={img.url}
                                                alt={`Proof ${i + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border border-gray-800"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <p>Ambassador</p>
                            <div className="flex border rounded-lg border-gray-800 mt-4 items-center">
                                <img src={currentTask.img} className="w-14 h-14 object-cover rounded-full" alt="avatar" />
                                <p className="ml-4">{currentTask.name}</p>
                            </div>
                        </div>
                        <div>
                            <p>Task</p>
                            <div className="flex border justify-between rounded-lg py-3 px-2 border-gray-800 mt-4 items-center">
                                <p className="text-gray-500 truncate max-w-[250px]">{currentTask.taskDescription}</p>
                                <a href={currentTask.proof} target="_blank" rel="noopener noreferrer" className="bg-blue-main p-2 rounded-lg text-gray-400">
                                    Check
                                </a>
                            </div>
                        </div>
                        <div>
                            <p>Submitted Link</p>
                            <div className="flex border rounded-lg py-3 px-2 border-gray-800 mt-4 items-center">
                                <p className="text-gray-500 truncate max-w-[250px]">{currentTask.proof}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <p className="w-full border border-gray-500 py-3 text-center rounded-md">{currentTask.taskPoints} pts</p>
                            <p className="w-full border border-gray-500 py-3 text-center rounded-md">{currentTask.status === 'approved' ? 'Approved' : 'Pending'}</p>
                        </div>
                        {
                            currentTask.status === 'approved' ? <></> :
                                <div className="flex justify-between gap-4">
                                    <button
                                        className="w-full py-2 border border-gray-500 rounded-xl text-gray-400 flex items-center justify-center"
                                        onClick={handleReject}
                                        disabled={rejecting}
                                    >
                                        {rejecting ? (
                                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent animate-spin rounded-full"></div>
                                        ) : (
                                            'Reject'
                                        )}
                                    </button>

                                    <button
                                        className="w-full py-3 bg-blue-700 rounded-xl text-white flex items-center justify-center"
                                        onClick={handleApprove}
                                        disabled={approving}
                                    >
                                        {approving ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                                        ) : (
                                            'Approve'
                                        )}
                                    </button>

                                </div>
                        }
                    </div>
                )}
            </BottomSheet>
        </div>
    );
};

export default SubmittedTask;
