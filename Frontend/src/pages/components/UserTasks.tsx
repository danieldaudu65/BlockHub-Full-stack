import { arrow } from '../../assets';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { API_URL } from '../../confiq';
import type { Task } from '../../types/Task';


interface UserTaskProps {
  tasks: Task[];
  projectId: any;
  preview?: boolean;
  onTaskSubmitted?: () => void; // ✅ new prop

}

const UserTasks: React.FC<UserTaskProps> = ({ projectId, tasks = [], preview = false, onTaskSubmitted }) => {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [proofImages, setProofImages] = useState<Record<number, File[]>>({});
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  // const [timeLeftMap] = useState<Record<string, string>>({});

  const isTwitterLink = (url: string): boolean => {
    const pattern = /^https?:\/\/(www\.)?(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d{19}$/;
    return pattern.test(url);
  };


  const isWalletAddress = (input: string) => /^0x[a-fA-F0-9]{40}$/.test(input) || /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(input);

  const isTwitterProfile = (url: string) => /^https?:\/\/(www\.)?(x|twitter)\.com\/[A-Za-z0-9_]+$/.test(url);

  useEffect(() => {
    if (tasks.length > 0) {
      setLocalTasks(tasks);
      setLoading(false);
    }
  }, [tasks]);


  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/ambassador_tasks/pending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("ambassador_token"),
          projectId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.tasks) {
        setLocalTasks(data.tasks);
      }
    } catch (err) {
      console.error("Error fetching updated tasks:", err);
    }
  };

  useEffect(() => {
    if (preview) {
      const now = new Date().toISOString();
      setLocalTasks([
        {
          _id: "1",
          title: "Preview Task",
          description: "Add “BlockHub Ambassador” or blockhub.xyz in your X bio",
          points: 20,
          hashtags: "#demoHash",
          status: "not_submitted",
          important: false,
          createdAt: now,
        },
      ]);
      setLoading(false);
      return;
    }

    // ✅ Always stop loading once tasks are passed down
    setLocalTasks(tasks);
    setLoading(false);
  }, [tasks, preview]);

  const handleInputChange = (index: number, value: string) => {
    setInputs(prev => ({ ...prev, [index]: value }));
  };
  const handleSubmit = async (index: number, taskId: string) => {
    const proof = inputs[index];
    const task = localTasks[index];
    const files = proofImages[index] || [];

    if (!proof && files.length === 0) {
      toast.error("Please provide a link or upload an image");
      return;
    }

    if (task.important) {
      const isValid =
        isTwitterLink(proof) ||
        isTwitterProfile(proof) ||
        isWalletAddress(proof);

      if (!isValid && files.length === 0) {
        toast.error("Please provide a valid proof (link or image)");
        return;
      }
    }

    setLoadingIndex(index);

    try {
      const formData = new FormData();
      formData.append("taskId", taskId);
      formData.append("proof", proof || "");
      formData.append("token", localStorage.getItem("ambassador_token") || "");
      formData.append("projectId", projectId);
      formData.append("hashtag", task.hashtags || "");

      // append images
      files.forEach((file) => {
        formData.append("proofImages", file);
      });

      const res = await fetch(`${API_URL}/ambassador_tasks/submit`, {
        method: "POST",
        body: formData, // ✅ no need for headers here — browser sets boundary
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        if (onTaskSubmitted) onTaskSubmitted();

        setLocalTasks((prev) =>
          prev.map((t, i) =>
            i === index ? { ...t, status: "pending" } : t
          )
        );

        fetchTasks();

        setInputs((prev) => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });

        setProofImages((prev) => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });

        setActiveIndex(null);
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting task");
    } finally {
      setLoadingIndex(null);
    }
  };



  return (
    <div className={`m- mt-10 lg:px-65 text-gray-400 ${preview ? "opacity-50 pointer-events-none" : ""}`}>
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
                task.status === 'rejected' ||
                task.status === 'approved'
              )
              .sort((a, b) => {
                const aHasTimer = 'expires_at' in a;
                const bHasTimer = 'expires_at' in b;

                // Tasks with timers first
                if (aHasTimer && !bHasTimer) return -1;
                if (!aHasTimer && bHasTimer) return 1;
                return 0; // leave order unchanged otherwise
              })
              .slice(0, 20)
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
                      {/* <div className='space-y-2.5 text-[8px]'> */}

                      {/* <p className='w-[100%] lg:text-lg text-sm'>{x.description}</p> */}
                      <div className='flex items-center  w-full justify-between gap-2'>
                        <p className='w- text-white lg:text-lg text-sm'>{x.hashtags || x.description}</p>

                        <p className='bg-[#29204B] w-fit lg:text-2xl lg:p-4 flex items-center text-gray-200 text-xs p-2 rounded-md px-3'>
                          {x.points} pts
                        </p>
                        {/* <p className='bg-[#29204B] flex items-center gap-1 lg:text-2xl lg:p-4 text-gray-200 text-xs p-2 rounded-md px-3'>
                            <img src={clock} alt="" />
                            {timeLeftMap[x._id] || '...'}
                          </p> */}
                      </div>
                      {/* </div> */}
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
                          {/* Image Upload Section */}
                          <div className="flex items-center gap-2 mt-3">
                            <label
                              htmlFor={`proofImages-${index}`}
                              className="cursor-pointer bg-[#29204B] text-gray-300 px-3 py-2 rounded-2xl flex item-center justify-center text-sm hover:bg-[#3b2b63] transition"
                            >
                              +
                            </label>
                            <input
                              id={`proofImages-${index}`}
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                setProofImages((prev) => ({ ...prev, [index]: files }));
                              }}
                            />
                            {proofImages[index]?.length > 0 && (
                              <p className="text-xs text-green-400">{proofImages[index].length}</p>
                            )}
                          </div>

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

export default UserTasks;
