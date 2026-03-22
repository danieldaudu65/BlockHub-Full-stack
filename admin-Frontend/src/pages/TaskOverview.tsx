import React, { useEffect, useState } from 'react';
import { active, arrow, clock, del, edit,  task2 } from '../assets';
import { FaChevronRight } from 'react-icons/fa';
import ModalWrapper from '../components/modalParent';
import Create_Task from '../components/Create_Task';
import Edit_Task from '../components/Edit_Task';
import Delete_Task from '../components/Delete_Task';
import toast from 'react-hot-toast';
import { API_URL } from '../confiq';

interface BackendTask {
    id: string;
    title: string;
    description: string;
    points: number;
    is_active: boolean;
}

interface TaskStats {
    totalTasks: number;
    activeTasks: number;
    pendingTasks: number;
}

const TaskOverview: React.FC = () => {
    const token = localStorage.getItem("admin_token"); // Or however you store your admin token

    const [modal, setModal] = useState<number>(0)
    const [selectedItem, setSelectedItem] = useState<BackendTask | null>(null);


    const [tasks, setTasks] = useState<BackendTask[]>([]);
    const [overviewdetail, setOverviewDetails] = useState<TaskStats>({
        totalTasks: 0,
        activeTasks: 0,
        pendingTasks: 0,
    });


    const refetchTasks = async () => {
        if (!token) return;
        try {
            const taskRes = await fetch(`${API_URL}/admin_tasks/get-all-tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            const taskData = await taskRes.json();
            if (!taskRes.ok) throw new Error(taskData.message);
            setTasks(taskData);

            const overviewRes = await fetch(`${API_URL}/admin_tasks/task-overview`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            const overviewData = await overviewRes.json();
            if (!overviewRes.ok) throw new Error(overviewData.message);
            setOverviewDetails(overviewData);
        } catch (err: any) {
            toast.error(err.message || "Failed to refetch data");
        }
    };


    useEffect(() => {


        if (!token) {
            toast.error("Authentication token not found");
            return;
        }

        const getOverview = async () => {
            try {
                const res = await fetch(`${API_URL}/admin_tasks/task-overview`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setOverviewDetails(data);
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch overview");
            }
        };

        const getTasks = async () => {
            try {
                const res = await fetch(`${API_URL}/admin_tasks/get-all-tasks`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });
                const data = await res.json();
                // console.log(data);

                if (!res.ok) throw new Error(data.message);
                setTasks(data);
            } catch (err: any) {
                toast.error(err.message || "Failed to fetch overview");

            }
        }

        getTasks();
        getOverview();
    }, []);

    const overview = [
        {
            label: 'Total Task',
            icon: task2,
            number: overviewdetail.totalTasks
        },
        {
            label: 'Active Task',
            icon: active,
            number: overviewdetail.activeTasks
        },
        {
            label: 'Pending Task',
            icon: clock,
            number: overviewdetail.pendingTasks
        },
    ]
    return (
        <div>
            <div className='flex justify-between'>
                <p className='flex items-center gap-2 text-xl tec'>Task <span className=' flex items-center  gap-2 text-[#A28AE8]'> <FaChevronRight className='text-[10px]' /> <p>Overview</p> </span></p>
                <button onClick={() => setModal(1)} className='bg-blue-main text-sm rounded-md px-3 p-2'>Create new task</button>
            </div>
            <div className='lg:flex gap-6'>
                {
                    overview.map((item, index) => (
                        <div className='h-28 relative py-8 rounded-2xl w-full flex gap-4 items-center  bg-[#232323] my-6 px-4' key={index}>
                            <div className='bg-[#181819] w-fit p-3 rounded-xl'>
                                <img src={item.icon} alt="" className='' />
                            </div>
                            <div className='flex gap-2  flex-col'>
                                <h3 className='text-[#C2C3C6] text-lg'>{item.label}</h3>
                                <h3 className='text-2xl  font-bold mt-'>{item.number}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='mt-10'>
                <div className='flex items-center text-md justify-between mb-4'>
                    <h3 className="text-white text-lg font-semibold">Submitted Tasks</h3>
                    <div className='flex items-center gap-4'>
                        <span className="text-gray-300">Filter</span>
                        <div className='flex bg-[#1B1B1C] rounded-xl px-3 p-2 items-center gap-2 text-white'>
                            <p>All</p>
                            <img src={arrow} alt="" />
                        </div>
                    </div>
                </div>
                <div className="w-full mb-12 overflow-x-auto">
                    <table className="w-full   mt-6 text-left text-sm">
                        <thead className="bg-[#1B1B1C] text-gray-400 rounded-xl">
                            <tr className="rounded-xl">

                                <th className="py-3 px-2">Task</th>
                                <th className="py-3 px-3">Point</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>

                        <tbody className="text-white">
                            {tasks.map((item, index) => (
                                <tr key={index} className="border-b border-[#2C2C2C]">


                                    <td className="py-3 px-4  ">
                                        <div className="flex items-center gap-2">

                                            <input
                                                type="checkbox"
                                                className="appearance-none w-4 h-4 border border-gray-400 rounded-md bg-transparent checked:bg-white checked:border-white focus:outline-none"
                                            />
                                            <p className="text-sm max-w-[200px] ml-2 text-white truncate">{item.description}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 whitespace-nowrap">{item.points}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`text-xs flex justify-center w-20 px-4 py-1 rounded-md ${item.is_active
                                                ? "bg-green-800 text-green-300"
                                                : "bg-transparent border border-gray-600 text-gray-300"
                                                }`}
                                        >
                                            {item.is_active ? "Active" : "Pending"}
                                        </span>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <div className='flex gap-3 text-xl'>


                                            <img
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setModal(3);
                                                }}
                                                src={edit}
                                                alt=""
                                            />

                                            <img src={del}
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setModal(4);
                                                }}
                                                alt=""
                                            />
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalWrapper onClose={() => setModal(0)} isOpen={modal === 1} >
                <Create_Task refresh={refetchTasks} onClose={() => setModal(0)} />
            </ModalWrapper>
            <ModalWrapper onClose={() => setModal(0)} isOpen={modal === 3} >
                <Edit_Task
                    onClose={() => setModal(0)}
                    item={selectedItem}
                    token={token}
                    refetchTasks={refetchTasks}
                />      </ModalWrapper>
            <ModalWrapper onClose={() => setModal(0)} isOpen={modal === 4} >
                <Delete_Task item={selectedItem} onClose={() => setModal(0)} refresh={refetchTasks} />

            </ModalWrapper>
        </div>
    );
}

export default TaskOverview;
