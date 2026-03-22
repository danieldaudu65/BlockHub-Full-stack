import { arrow, clock } from '../assets';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { API_URL, getToken } from '../confiq';
interface Task {
  _id: string;
  title: string;
  description: string;
  points: number;
  status: 'not_submitted' | 'pending' | 'rejected';
  important: boolean;
  createdAt: string | Date; // <-- allow both string and Date for flexibility
}

interface TaskProps {
  preview?: boolean
}

const Tasks: React.FC<TaskProps> = ({ preview = false }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeftMap, setTimeLeftMap] = useState<Record<string, string>>({});


  const isTwitterLink = (url: string): boolean => {
    const pattern = /^https?:\/\/(www\.)?(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+/;
    return pattern.test(url);
  };

  const isWalletAddress = (input: string) => /^0x[a-fA-F0-9]{40}$/.test(input) || /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(input);

  const isTwitterProfile = (url: string) => /^https?:\/\/(www\.)?(x|twitter)\.com\/[A-Za-z0-9_]+$/.test(url);

  useEffect(() => {

    if (preview) {
      const now = new Date().toISOString(); // or use new Date()
      setTasks([
        {
          _id: "1",
          title: "Preview Task",
          description: "Add “BlockHub Ambassador” or blockhub.xyz in your X bio",
          points: 20,
          status: "not_submitted",
          important: false,
          createdAt: now,
        },
        {
          _id: "2",
          title: "Preview Task 2",
          description: "Create a Twitter thread (at least 3 tweets) about BlockHub",
          points: 10,
          status: "not_submitted",
          important: true,
          createdAt: now,
        },
      ]);
      setLoading(false);
      return;
    }
    const fetchTasks = async () => {

      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/tasks/pending`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching tasks");
        setTasks(data);
        console.log(data);

        const interval = setInterval(() => {
          const now = new Date().getTime();
          const updatedMap: Record<string, string> = {};

          data.forEach((task: Task & { expires_at?: string }) => {
            if (task.expires_at) {
              const diff = new Date(task.expires_at).getTime() - now;
              if (diff > 0) {
               const hours = Math.floor(diff / (1000 * 60 * 60));
const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

if (hours > 0) {
  updatedMap[task._id] = `${hours}h ${minutes}m left`;
} else {
  updatedMap[task._id] = `${minutes}m left`;
}
   } else {
                updatedMap[task._id] = 'Expired';
              }
            } else {
              updatedMap[task._id] = 'No deadline';
            }
          });

          setTimeLeftMap(updatedMap);
        }, 1000);

        return () => clearInterval(interval); // cleanup on unmount

      } catch (err: any) {
        toast.error(err.message || "Failed to fetch tasks");
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchTasks();
  }, []);


  const handleInputChange = (index: number, value: string) => {
    setInputs(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async (index: number, taskId: string) => {
    const proof = inputs[index];
    const task = tasks[index];
    if (!proof) {
      toast.error("Please paste a link before submitting");
      return;
    }

    if (task.important) {
      const isValid =
        isTwitterLink(proof) ||
        isTwitterProfile(proof) ||
        isWalletAddress(proof);

      if (!isValid) {
        toast.error("This task requires a valid Twitter link, profile, or wallet address");
        return;
      }
    } else {
      if (!isTwitterLink(proof)) {
        toast.error("Please submit a valid X (Twitter) post link");
        return;
      }
    }

    setLoadingIndex(index);
    try {
      const res = await fetch(`${API_URL}/tasks/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          proof,
          token: getToken()
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success(data.message);


        setTasks(prev =>
          prev.map((task, i) =>
            i === index ? { ...task, status: 'pending' } : task
          )
        );

        setInputs(prev => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });

        setActiveIndex(null);
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      toast.error("Error submitting task");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className={`m-4 mt-16 lg:px-65 text-gray-400 ${preview ? "opacity-50 pointer-events-none" : ""}`}>
      <Toaster position='top-right' />
      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) :
        (
          <>
            {tasks
  .filter(task =>
    task.status === 'not_submitted' ||
    task.status === 'pending' ||
    task.status === 'rejected'
  )
  .sort((a, b) => {
    const aHasTimer = 'expires_at' in a;
    const bHasTimer = 'expires_at' in b;

    // Tasks with timers first
    if (aHasTimer && !bHasTimer) return -1;
    if (!aHasTimer && bHasTimer) return 1;
    return 0; // leave order unchanged otherwise
  })
  .slice(0, 7)
              .map((x, index) => {
                const isOpen = activeIndex === index;

                return (
                  <div
                    key={x._id}
                    className='w-full border lg:px-12 -z-0 relative border-blue-main rounded-2xl my-4 overflow-hidden transition-all duration-300'
                  >
                    <div
                      className='flex p-3   items- justify-between cursor-pointer'
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                    >
                      <div className='space-y-2.5 text-[8px]'>

                        <p className='w-[100%] lg:text-lg text-sm'>{x.description}</p>
                        <div className='flex gap-2'>

                          <p className='bg-[#29204B] lg:text-2xl lg:p-4 flex items-center text-gray-200 text-xs p-2 rounded-md px-3'>
                            {x.points} pts
                          </p>
                          <p className='bg-[#29204B] flex items-center gap-1 lg:text-2xl lg:p-4 text-gray-200 text-xs p-2 rounded-md px-3'>
                            <img src={clock} alt="" />
                            {timeLeftMap[x._id] || '...'}
                          </p>
                        </div>
                      </div>
                      <div className='flex  gap-2 items-center'>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img alt='' src={arrow} />
                        </motion.div>
                      </div>
                      {
                        x.important === true ? <div className='w-3 h-3 bg-[#ff0000de] absolute top-0 right-0' />
                          :
                          <></>
                      }
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className='px-4 flex items-center gap-3 pb-4'
                        >
                          <input
                            type='text'
                            placeholder='Submit link'
                            value={inputs[index] || ''}
                            disabled={x.status === 'pending'}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className='w-full mt-3 py-2 border outline-none border-gray-600 px-2 rounded-md text-sm text-gray-400 bg-transparent'
                          />
                          <button
                            onClick={() => handleSubmit(index, x._id)}
                            className={`bg-blue-main text-sm py-2 text-gray-400 rounded-md px-4 flex justify-center items-center mt-3 disabled:opacity-50 disabled:cursor-not-allowed
                      ${x.status === 'rejected' ? 'border border-red-500' : ''}`} disabled={loadingIndex === index || x.status === 'pending'}
                          >
                            {loadingIndex === index ? (
                              <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                            ) : x.status === 'pending' ? (
                              'Pending...'
                            ) : x.status === 'rejected' ? (
                              'Rejected'
                            ) : (
                              'Submit'
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
          </>
        )}


    </div>
  );
};

export default Tasks;
