import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
// import { top_opp_cards } from "../../../../data/top_oppurtunities";
import { Img as Image } from 'react-image';
import { save } from "../../../../assets";
import ShareModal from '../../components/ShareModal';
import { RiShareForwardFill } from "react-icons/ri";
import ApplyModal from '../../components/ApplyModal';
import ApplicationSuccess from '../../components/ApplicationSuccess';
import { API_URL } from '../../../../confiq';
import toast from 'react-hot-toast';



interface Cv {
  name: string;
  url: string;
}

interface Job {
  id: string;
  jobTitle: string;
  postedAt: string;
  applicationEnd: string;
  skills?: string[];
  companyDescription?: string;
  candidateRole?: string;
  compensation: string;
  benefit?: string;
  [key: string]: any;
}

interface User {
  cv: Cv;
}


const IdPage: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const originalActionsRef = useRef<HTMLDivElement | null>(null);
  const [showStickyHeaderAndFooter, setShowStickyHeaderAndFooter] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);



  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/user_discover/view_job`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, jobId: _id })
        });

        const data = await res.json();
        if (res.ok) {
          setJob(data.Ajob);
        } else {
          console.error('Failed to load job:', data.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (_id) fetchJob();
  }, [_id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyHeaderAndFooter(!entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: '0px 0px -100px 0px' }
    );
    if (originalActionsRef.current) observer.observe(originalActionsRef.current);
    return () => observer.disconnect();
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;
  if (!job) return <div className="text-red-500 p-4">Job not found</div>;

  const handleApply = () => {
    setTimeout(() => {
      setIsApplied(true);
      setIsApplyModalOpen(false);
    }, 500);
  };
  const handleSave = async () => {
    const token = localStorage.getItem('token');

    if (!token) return toast.error('Login required to save jobs');

    setIsSaving(true);
    toast.loading('Saving...', { id: 'saveJob' });

    try {
      const res = await fetch(`${API_URL}/user_discover/save_job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, jobId: _id }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Job saved!', { id: 'saveJob' });
      } else {
        toast.error(data.message || 'Failed to save job', { id: 'saveJob' });
      }
    } catch (err) {
      toast.error('Server error', { id: 'saveJob' });
    } finally {
      setIsSaving(false);
    }
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

  const currentUser: User = {
    cv: { name: 'my_cv.pdf', url: 'http://example.com/cv.pdf' },
  };

  if (isApplied) return <ApplicationSuccess opportunity={job as any} />;

  const fixedHeaderHeight = 70;
  const fixedFooterHeight = 80;

  const getDaysLeft = (endDate: string): string => {
    const end = new Date(endDate);
    const today = new Date();

    const diffInMs = end.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Last day';

    return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
  };


  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d0d] text-white">
      <div
        className="fixed top-0 left-0 right-0 z-20 bg-[#181A1D] px-6 py-4 border-b border-neutral-800 shadow-lg
                     flex items-center justify-between transition-all duration-300 ease-in-out text-gray-200"
        style={{ height: `${fixedHeaderHeight}px` }}
      >
        <div className="flex gap-4 items-center cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeft className="text-2xl cursor-pointer hover:opacity-70 transition-opacity" />
        </div>

        {/* Sticky Title/Handle within the Fixed Header */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 flex flex-col items-center
                      ${showStickyHeaderAndFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ top: showStickyHeaderAndFooter ? '.9rem' : '' }}
        >
          <h2 className="text-md font-semibold">{job.jobTitle}</h2>
          {/* <p className="text-xs text-gray-400">@{job.handle}</p> */}
        </div>

        <button onClick={() => setIsShareModalOpen(true)} className="text-xl cursor-pointer hover:opacity-70 transition-opacity ">
          <RiShareForwardFill />
        </button>
      </div>

      <div
        className="flex-grow p-4"
        style={{ paddingTop: `${fixedHeaderHeight + 20}px`, paddingBottom: `${fixedFooterHeight + 20}px` }}
      >
        <div className='bg-[#181A1D] p-4 mt- rounded-xl leading-6'>
          <div className="mb-4 flex items-center gap-4">
            {/* <Image
              src={opportunity.avatar}
              alt={opportunity.name}
              width={45}
              height={45}
              className="rounded-full"
            /> */}
            <div>
              <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
              {/* <p className="text-sm text-gray-400">@{opportunity.handle}</p> */}
            </div>
          </div>

          <div className="flex gap-2 my-6 flex-wrap">
            {job.tags?.map((tag: any, index: number) => (
              <span
                key={index}
                className="bg-[#34384080] text-gray-300 px-4 py-3 text-xs rounded-xl"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center rounded-md justify-between bg-zinc-900 py-1 px-3 my-4 mb-6">
            <div>
              {/* <div className="flex items-center gap-2 text-md">
                <div className='flex'>
                  {[opportunity.avatar, tp2, opportunity.avatar].map((i, x) => (
                    <Image
                      alt=""
                      src={i}
                      key={x}
                      className={`w-9 rounded-full border border-black ${x !== 0 ? '-ml-4' : ''}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-[#E4E5E8]">10 Applicants</p>
              </div> */}
              <p className="text-xs text-[#E4E5E8] mt-2">  Posted {timeAgo(job.postedAt)} | {getDaysLeft(job.applicationEnd)}
              </p>
            </div>
            <div className="text-lg font-bold">
              {job.compensation}
            </div>
          </div>

          {/* ORIGINAL Save/Apply Buttons */}
          <div ref={originalActionsRef} className="flex w-full gap-4 my-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#282C32] gap-2 px-2 w-[40%] items-center justify-center py-3 rounded-xl flex cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Image src={save} alt="" />
              <p>{isSaving ? 'Saving...' : 'Save'}</p>
            </button>
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="bg-blue-main w-full items-center justify-center py-3 rounded-xl flex cursor-pointer hover:opacity-70 transition-opacity"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Job Description etc. */}
        <div>
          <div className="bg-[#181A1D] my-4 p-4 rounded-xl leading-6">
            <div>
              <p className="text-[#EBECED]">Job Description</p>
            </div>
            <p className="text-md mt-2 text-[#C2C3C6] text-[14px]">
              {job.companyDescription}
            </p>
          </div>
          <div className="bg-[#181A1D] my-4 p-4 rounded-xl leading-6">
            <p className="text-[#EBECED] font-semibold">Your Role</p>
            <ul className="list-disc text-[#C2C3C6] mt-3 pl-6 text-[14px] space-y-2">

              <li>{job.candidateRole}</li>
            </ul>
          </div>

          <div className="bg-[#181A1D] my-4 p-4 rounded-xl leading-6">
            <p className="text-[#EBECED] font-semibold">Skills & Requirements</p>
            <ul className="list-disc text-[#C2C3C6] mt-3 pl-6 text-[14px] space-y-2">

              {job.skills?.map((tag, index) => (
                <li
                  key={index}
                  className="b text-gray-300 px-4 py-3 text-xs rounded-xl"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#181A1D] my-4 p-4 rounded-xl leading-6">
            <p className="text-[#EBECED] font-semibold">Benefits</p>
            <ul className=" list-disc text-[#C2C3C6] mt-3 pl-6 text-[14px] space-y-2">
              <li>  {job.benefit}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* STICKY DUPLICATE of Save/Apply Buttons (Footer) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 bg-[#181A1D] px-6 py-3 border-t border-neutral-800 transition-opacity duration-300
                     ${showStickyHeaderAndFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ height: `${fixedFooterHeight}px` }}
      >
        <div className="flex w-full gap-4">
          <button className="bg-[#282C32] gap-2 w-[40%] items-center justify-center py-3 rounded-xl flex cursor-pointer hover:opacity-70 transition-opacity">
            <Image src={save} alt="" />
            <p>Save</p>
          </button>
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="bg-blue-main w-full items-center justify-center py-3 rounded-xl flex cursor-pointer hover:opacity-70 transition-opacity"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} opportunity={job} />
      )}
      {/* Apply Modal */}
      {isApplyModalOpen && (
        <ApplyModal
          onClose={() => setIsApplyModalOpen(false)}
          onApply={handleApply}
          user={currentUser}
          opportunity={job}
        />
      )}
    </div>
  );
};

export default IdPage;





