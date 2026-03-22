import React, { useState } from 'react';
import { type JobPosting } from '../../../../data/activitiesData';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { pfp } from '../../../../assets';
import { API_URL } from '../../../../confiq';
import toast from 'react-hot-toast';

interface JobPostingItemProps {
  job: JobPosting;
}

const JobPostingItem: React.FC<JobPostingItemProps> = ({ job }) => {
const [isActive, setIsActive] = useState(job.status === 'open');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleJobClick = () => {
    navigate(`/applicants/${job._id}`); // Navigate to the applicants page
  };





  const getDaysLeft = (endDate: string): string => {
    const end = new Date(endDate);
    const today = new Date();

    const diffInMs = end.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Last day';

    return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
  };


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

  return (
    <div
      className="bg-[#181A1D] rounded-xl p-4 shadow-lg flex flex-col space-y-3 cursor-pointer"
      onClick={handleJobClick}
    >
      <div className='flex justify-between items-center'>
        <h3 className="text-white text-lg">{job.jobTitle}</h3>
        <div
          onClick={async (e) => {
            e.stopPropagation();

            try {
              const token = localStorage.getItem('token');
              if (!token) return console.error('No token found');

              const response = await fetch(`${API_URL}/user_activity/toggle_job_status`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token,
                  jobId: job._id,
                }),
              });

              const data = await response.json();
              console.log(data);


              if (response.ok) {
                setIsActive(data.updatedStatus === 'open');
                toast.success(data.message)
              } else {
                console.error(data.message);
              }
            } catch (err) {
              console.error('Failed to toggle job status:', err);
            }
          }}
          className={`w-12 h-7 flex items-center p-1 rounded-full cursor-pointer transition-colors duration-200 ${isActive ? 'bg-green-500' : 'bg-gray-600'
            }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${isActive ? 'translate-x-5' : 'translate-x-0'
              }`}
          ></div>
        </div>
      </div>
      <div className='px-5 py-4 flex justify-between items-center bg-neutral-950 rounded-2xl'>
        <div className="flex-1 pr-4">
          <div className="flex items-center my-1">
            <div className="flex -space-x-5 mr-2">
              {job.applicants.map((applicant, index) => (
                <img
                  key={index}
                  src={applicant.user.profileImage || pfp}
                  alt="Applicant"
                  className="w-8 h-8 rounded-full border-2 border-[#181A1D]"
                />
              ))}
            </div>
            <p className='mr-1'>{job.applicants.length}</p>
            <span className="text-gray-300 text-sm">{job.applicantCount} Applicants</span>
          </div>
          {/* <p className="text-gray-400 text-xs">
            {job.postedDate} | {job.daysLeft} days left
          </p> */}

          <p className="text-xs text-[#E4E5E8] mt-2">
            Posted {timeAgo(job.postedAt)} | {getDaysLeft(job.applicationEnd)}
          </p>
        </div>
        <span className="text-white font-bold">$100/Wk</span>
      </div>
    </div>
  );
};

export default JobPostingItem;