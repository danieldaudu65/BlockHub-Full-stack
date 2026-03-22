import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { arrow, one, profile, score, tasks, three, two, X } from '../assets';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_URL } from '../confiq';
import Pagination from './Pagination';


type Overview = {
  totalAmbassadors: number;
  totalTasks: number;
};

type SubmittedTask = {
  ambassadorName: string;
  ambassadorImage?: string;
  taskTitle: string;
  status: string;
  taskPoints: number;
};

type Ambassador = {
  _id: string;
  name: string;
  img?: string;
  image?: string;
  username?: string;
  twitter_handle?: string;
  total_points: number;
  total_tweets?: number;
};

const Dashboard: React.FC = () => {

  const [overview, setOverview] = useState<Overview>({ totalAmbassadors: 0, totalTasks: 0 });
  const [submittedTasks, setSubmittedTasks] = useState<SubmittedTask[]>([]);
  const [topAmbassadors, setTopAmbassadors] = useState<Ambassador[]>([]);
  const navigate = useNavigate()

  const [currentTaskPage, setCurrentTaskPage] = useState(1);
  const [currentAmbassadorPage, setCurrentAmbassadorPage] = useState(1);

  const itemsPerPage = 10;

  const paginatedTasks = submittedTasks.slice(
    (currentTaskPage - 1) * itemsPerPage,
    currentTaskPage * itemsPerPage
  );

  const paginatedAmbassadors = topAmbassadors.slice(
    (currentAmbassadorPage - 1) * itemsPerPage,
    currentAmbassadorPage * itemsPerPage
  );
  useEffect(() => {
    const token = localStorage.getItem("admin_token"); // Or however you store your admin token

    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    const fetchOverview = async () => {
      try {
        const res = await fetch(`${API_URL}/admin_dashboard/get-overview`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setOverview(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch overview");
      }
    };

    const fetchTopAmbassadors = async () => {
      const token = localStorage.getItem("admin_token");

      try {
        const res = await fetch(`${API_URL}/admin_dashboard/top-ambassador`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);
        console.log("Top Ambassadors:", data); // This will be sorted from highest to lowest
        setTopAmbassadors(data); // if you have a state
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch top ambassadors");
      }
    };

    const fetchSubmittedTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/admin_dashboard/submitted-tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        // console.log(data);

        if (!res.ok) throw new Error(data.message);
        setSubmittedTasks(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch submitted tasks");
      }
    };

    fetchOverview();
    fetchSubmittedTasks();
    fetchTopAmbassadors();
  }, []);
  const dashboard = [
    {
      label: 'Total Ambassador',
      icon: profile,
      number: overview.totalAmbassadors.toLocaleString()
    },
    {
      label: 'Total Task',
      icon: tasks,
      number: overview.totalTasks.toLocaleString()
    },
  ];

  return (
    <div>
      <p className='flex items-center gap-2 text-xl tec'>Dashboard <span className=' flex items-center  gap-2 text-[#A28AE8]'> <FaChevronRight className='text-[10px]' /> <p>Overview</p> </span></p>
      <div className='lg:flex gap-6'>
        {
          dashboard.map((item, index) => (
            <div className='h-28 relative py-8 rounded-2xl w-full flex gap-4 items-center  bg-[#232323] my-6 px-4' key={index}>
              <div className='bg-[#181819] w-fit p-3 rounded-xl'>
                <img src={item.icon} alt="" className='' />
              </div>
              <div className='flex gap-2  flex-col'>
                <h3 className='text-gray-300 text-xl'>{item.label}</h3>
                <h3 className='text-2xl  font-bold mt-'>{item.number}</h3>
              </div>

              {
                index === 1 ? <p className='text-[#A28AE8] text-sm  absolute  right-4' onClick={() => navigate('/home/task/overview')}>Create new task</p> : <></>
              }
            </div>
          ))
        }
      </div>
      <div>

      </div>
      <div className='lg:flex'>


        <div className='mt-10 lg:w-[60%]'>
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

          <div className="w-full overflow-x-auto">
            <table className="w-full mt-6 text-left text-sm">
              <thead className="bg-[#1B1B1C] text-gray-400 rounded-xl">
                <tr className="rounded-xl">
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
                {paginatedTasks.map((item, index) => (
                  <tr key={index} className="border-b border-[#2C2C2C]">
                    <th className="py-2 px-2">
                      <input
                        type="checkbox"
                        className="appearance-none w-4 h-4 border border-gray-400 rounded-md bg-transparent checked:bg-white checked:border-white focus:outline-none"
                      />
                    </th>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.ambassadorImage}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <p className="text-white text-sm mr-18 whitespace-nowrap">
                          {item.ambassadorName}
                        </p>
                      </div>
                    </td>
                    <td className="py-2 px-2 max-w-[250px]">
                      <p className="text-sm text-white truncate">{item.taskTitle}</p>
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">{item.taskPoints}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`text-xs w- flex justify-center items-center px-3 py-2 rounded-md ${item.status === "approved"
                          ? "bg-transap border border-green-800 text-green-300"
                          : "border-[#F17B2B] border text-[#F17B2B]  text-yellow-300"
                          }`}
                      >
                        {item.status === "approved" ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentTaskPage}
            totalItems={submittedTasks.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentTaskPage(page)}
          />
        </div>
        <div>
          <h3 className="text-white text-lg  mt-16  font-semibold">Top Ambassadors</h3>
          <div className='text-gray-400 l  text-xs '>
            {paginatedAmbassadors.map((board: Ambassador, index: number) => (
              <div
                className='flex lg:px-6 lg:py-3 px-[12px] my-4  py-3 rounded-2xl border border-blue-main items-center justify-between'
                key={`${board.twitter_handle || board.username}-${index}`}
              >
                <div className='flex lg:gap-8 items-center gap-2'>


                  {/* Rank */}
                  <p className='text-white w-7 lg:w-12 flex justify-center'>
                    {index === 0 ? (
                      <img src={one} alt='1st' className='w-6 lg:w-6' />
                    ) : index === 1 ? (
                      <img src={two} alt='2nd' className='w-7 lg:w-6' />
                    ) : index === 2 ? (
                      <img src={three} alt='3rd' className='w-6 lg:w-6' />
                    ) : (
                      index + 1
                    )}
                  </p>

                  <img src={board.img} className='rounded-full mr-2 w-8 lg:w-12' alt='user' />

                  <div className='flex gap-2  flex-col items-start'>
                    <div className='flex gap-2 items-center'>
                      <p className='text-white truncate max-w-[50px] lg:text-[18px]'>{board.name}</p>
                      <span>&bull;</span>
                      <a target='_blank' href={`https://x.com/${board.twitter_handle}`} className='underline lg:text-[22px] truncate max-w-[50px] cursor-pointer'>@{board.twitter_handle || board.username}</a>
                    </div>
                    <div className='flex lg:text-[18px] gap-4 items-center'>
                      <div className='flex items-center'>
                        <img src={score} alt='score' />
                        <p>Score : {board.total_points || 0}</p>
                      </div>
                      <div className='flex items-center'>
                        <img src={X} alt='tweet' />
                        <p>Tweets : {board.total_tweets || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-white text-[12px] lg:text-[20px] ml-6 '>{board.total_points || 0} pts</p>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentAmbassadorPage}
            totalItems={topAmbassadors.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentAmbassadorPage(page)}
          />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
