import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import { API_URL } from '../../../../confiq';

interface Applicant {
  id: string;
  profileImage: string;
  name: string;
  appliedAt: string;
  message?: string;
  portfolio?: {
    url: string;
    name: string;
  };
}

interface Job {
  jobTitle: string;
  applicants: Applicant[];
}

const ApplicantsPage: React.FC = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_URL}/user_activity/get_single_job_post`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, jobId: _id })
        });

        const data = await response.json();
        if (response.ok && data.job) {
          setJob(data.job); // applicants already include portfolio
        } else {
          toast.error(data.message || 'Could not fetch job');
        }
      } catch (err) {
        console.error(err);
        toast.error('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [_id]);

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

  const startChat = async (targetUserId: string) => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_URL}/user_activity/create_chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, userId2: targetUserId })
      });

      const chat = await res.json();
      navigate(`/chatroom/${chat._id}`); 
    } catch (err) {
      console.error(err);
      toast.error('Could not start chat');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-900">
        <ClipLoader size={32} color="#4F46E5" />
      </div>
    );
  }

  if (!job) {
    return <div className="p-6 text-red-500">Job posting not found.</div>;
  }

  return (
    <div className="flex flex-col bg-neutral-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 py-6 bg-[#181A1D]">
        <BsArrowLeft size={24} className="cursor-pointer" onClick={() => navigate(-1)} />
        <h2 className="text-lg ml-4">Applicants ~ {job.jobTitle}</h2>
      </div>

      {/* Applicants List */}
      <div className="flex-1 p-4 py-6 space-y-5">
        {job.applicants.map((applicant, index) => (
          <div key={index} className="bg-[#181A1D] rounded-xl p-4 shadow-lg flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className='flex gap-2 items-center'>
                <div className="flex items-center">
                  <img src={applicant.profileImage} alt={applicant.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <h3 className="text-white truncate max-w-[120px] font-semibold">{applicant.name}</h3>
                </div>
                <p onClick={() => startChat(applicant.id)} className='text-[12px] underline'>Chat me</p>
              </div>
              <span className="text-gray-400 text-sm">{timeAgo(applicant.appliedAt)}</span>
            </div>

            <div className='bg-zinc-800 rounded-xl p-4'>
              <div className="flex items-center space-x-4">
                <div className="bg-neutral-900 p-2 rounded-md">
                  <span className="text-gray-200 text-xs font-bold">PDF</span>
                </div>
                <span className="flex items-center text-gray-300 truncate space-x-5">
                  <span className="max-w-[100px] truncate">
                    {applicant.portfolio ? (
                      <a
                        href={applicant.portfolio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-200 underline hover:underline"
                      >
                        Portfolio
                      </a>
                    ) : (
                      "No CV uploaded"
                    )}
                  </span>
                </span>
              </div>
            </div>

            {applicant.message && (
              <div className='bg-zinc-900 rounded-xl'>
                <h4 className="text-white font-medium mb-2">Cover letter</h4>
                <p className="text-gray-400 text-sm max-w-fit leading-relaxed">{applicant.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsPage;
