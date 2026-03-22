import React, { useState } from 'react';
// import { Img as Image } from 'react-image';
import Button from '../../../components/Button';
// import { top_opp_cards } from '../../../data/top_oppurtunities';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { PiArrowLeftFill } from "react-icons/pi";
// import { RiArrowDropDownFill } from "react-icons/ri";
import { useEffect } from 'react';
import { API_URL } from '../../../confiq';


const RecentJobs: React.FC = () => {
  interface Job {
    _id: string;
    type: string;
    jobTitle?: string;
    description?: string;
    companyDescription?: string;
    tags?: string[];
    func?: string[];
    avatar?: string;
    postedAt: string;
  }

  const [jobs, setJobs] = useState<Job[]>([]); // Replace 'any' with your Job type if available
  const token = localStorage.getItem("token"); // or however you store it

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/user_discover/all_jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        console.log(data)
        if (res.ok) {
          setJobs(data.topJobs);
        } else {
          console.error(data.message || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching recent jobs:", error);
      }
    };

    fetchJobs();
  }, []);


  function timeAgo(dateString: string): string {
    const now = new Date();
    const postedDate = new Date(dateString);
    const secondsAgo = Math.floor((now.getTime() - postedDate.getTime()) / 1000);

    const minutes = Math.floor(secondsAgo / 60);
    const hours = Math.floor(secondsAgo / 3600);
    const days = Math.floor(secondsAgo / 86400);

    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  const location = useLocation();
  const pathname = location.pathname;
  const recent_jobs_loca = pathname.includes('recent-jobs');
  const navigate = useNavigate();


  const [visibleJobs, setvisibleJobs] = useState(4);
  const handleLoadMore = () => {
    setvisibleJobs(prevCount => prevCount + 4);
  };

  const [visibleMainJobs, setvisibleMainJobs] = useState(3);
  const handleLoadMoreMain = () => {
    setvisibleMainJobs(prevCount => prevCount + 3);
  };

  return (
    <>
      {recent_jobs_loca ? (
        <div className="p-3 relative pt-1 pb-15">
          <div className='absolute top-0 left-0 w-full space-y-2'>

            <div className='flex space-x-4 h-[80px] px-3 text-xl items-center bg-[#181A1D]'>
              <PiArrowLeftFill className='text-gray-300 cursor-pointer' onClick={() => navigate(-1)} />
              <h2>Recent Jobs</h2>
            </div>

            {/* Job count */}
            {/* <div className='flex justify-between px-3 items-center text-gray-00'>
              <p>{recentJobs.length}</p>
              <span className='flex justify-center items-center mx-3 bg-[#181A1D] rounded-xl'>
                <p className='pl-3'>All</p> <RiArrowDropDownFill className='text-5xl m-[-6px]'/>
              </span>
            </div> */}
          </div>
          <div className='mt-24'>


            {jobs.slice(0, visibleJobs).map((card, index) => (

              (<Link to={`/discover/recent-jobs/${card._id}`} key={index}>

                <div className="px-2 mb-4  cursor-pointer">
                  <div className={`${card.type === 'Job' ? "min-h-[250px]" : "h-fit"} w-full flex flex-col justify-beten rounded-lg p-4 border border-neutral-800 text-white bg-[#181A1D]`}>
                    <div className='flex flex-row-reverse justify-between items-baseline-last'>
                      <p className={`text-secondary-main text-sm px-2 py-1 rounded-full`}>
                        {timeAgo(card.postedAt)}
                      </p>

                      <div className="flex items-center space-x-3 mb-2">
                        {/* <Image src={card.avatar} alt={card.name} width={40} height={40} className="rounded-full" /> */}
                        <div>
                          <p className="font-bold text-lg max-w-[250px] truncate">{card.jobTitle}</p>
                          {/* <p className="text-sm text-gray-400">{card.handle}</p> */}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col mt-1 mb-4 justify- space-y-24 flex-1">
                      <p className="text-md mt-2  text-gray-400 line-clamp-6">
                        {card.description || card.companyDescription || ""}
                      </p>
                    </div>

                    <div className='flex text-sm flex-wrap gap-2 mt-3'>
                      {Array.isArray(card.tags) && card.tags.map((skill: string, i: number) => (
                        <p key={i} className="bg-[#34384080] p-3 rounded-xl text-gray-300">
                          {skill}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>)

            ))}
          </div>

          {/* Load More button */}
          {visibleJobs < jobs.length && (
            <div onClick={handleLoadMore} className='flex justify-center mb-4'>
              <button className="transition-colors ease-in duration-150 text-gray-300 text-md bg-zinc-900 p-2 px-6 hover:bg-blue-main rounded-lg cursor-pointer">
                Load More Jobs
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-3 mt- p-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-300">🔥Recent Jobs</h2>
            <Link to={'/discover/recent-jobs'}>
              <Button text="View all" bg={false} />
            </Link>
          </div>


          {jobs.slice(0, visibleMainJobs).map((card, index) => (
            <div key={index} onClick={() => navigate(`/discover/recent-jobs/${card._id}`)} className=" mb-4 cursor-pointer">
              <div className={`min-h-[300px] w-full flex flex-col justify-beten rounded-lg p-4 border border-neutral-800 text-white bg-[#181A1D]`}>
                <div className='flex flex-row-reverse justify-between items-baseline-last'>
                  <p className={`text-secondary-main text-sm px-2 py-1 rounded-full`}>
                    {timeAgo(card.postedAt)}
                  </p>

                  <div className="flex items-center space-x-3 mb-2">
                    {/* <Image src={card.avatar} alt={card.name} width={40} height={40} className="rounded-full" /> */}
                    <div>
                      <p className="font-bold text-lg max-w-[250px] truncate">{card.jobTitle}</p>
                      {/* <p className="text-sm text-gray-400">{card.handle}</p> */}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-1 mb-4 justify- space-y-24 flex-1">
                  <p className="text-md mt-2  text-gray-400 line-clamp-6">
                    {card.description || card.companyDescription || ""}
                  </p>
                </div>

                <div className='flex text-sm flex-wrap gap-2 mt-3'>
                  {Array.isArray(card.tags) && card.tags.map((skill: string, i: number) => (
                    <p key={i} className="bg-[#34384080] p-3 py-1.5 text-sm rounded-xl text-gray-300">
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* Load More button */}
          {visibleMainJobs < jobs.length && (
            <div
              onClick={handleLoadMoreMain}
              className='flex justify-center mb-20'
            >
              <button className="transition-colors ease-in duration-150 text-gray-300 text-md bg-zinc-900 p-2 px-6 hover:bg-blue-main rounded-lg cursor-pointer">
                Load More Jobs
              </button>
            </div>
          )}

        </div>
      )}
    </>
  );
};

export default RecentJobs;
