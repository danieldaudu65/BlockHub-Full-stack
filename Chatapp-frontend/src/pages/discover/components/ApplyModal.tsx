import React, { useState } from 'react';
import { HiFolderOpen } from 'react-icons/hi2';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import { GoCheckCircleFill } from 'react-icons/go';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../../confiq';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';


// Define prop types
type CvFile = {
  name: string;
  url: string;
};

type User = {
  cv: CvFile;
};

type Opportunity = {
  id: string;
  [key: string]: any; // If you have more fields, define them explicitly
};

type ApplyModalProps = {
  onClose: () => void;
  onApply: (applicationData: {
    coverLetter: string;
    cv: CvFile;
    experiences: string[];
    opportunityId: string;
  }) => void;
  user: User;
  opportunity: Opportunity;
};

const ApplyModal: React.FC<ApplyModalProps> = ({ onClose, user, opportunity }) => {
  const [selectedCv, setSelectedCv] = useState<CvFile>(user.cv);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [experiences, setExperiences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  // const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setSelectedCv({ name: file.name, url: URL.createObjectURL(file) });
  //   }
  // };

  const handleExperienceChange = (index: number, value: string) => {
    const newExperiences = [...experiences];
    newExperiences[index] = value;
    setExperiences(newExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, '']);
  };


  React.useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${API_URL}/user_discover/get_portfolio`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok && data.portfolio) {
          setSelectedCv({ name: data.portfolio.publicId || "Portfolio", url: data.portfolio.url });
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      }
    };

    fetchPortfolio();
  }, []);

  const handleApply = async () => {
    setLoading(true);
    const toastId = toast.loading('Submitting application...');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to apply.');
        return;
      }

      const res = await fetch(`${API_URL}/user_discover/apply_job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          jobId: opportunity._id,
          message: coverLetter,
          resumeUrl: selectedCv?.url,
          experiences,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong', { id: toastId });
        setLoading(false);
        return;
      }

      toast.success('Application submitted successfully!', { id: toastId });

      // ✅ Redirect user to the job's Twitter link after successful apply
      // if (data.twitterLink) {
      //   window.location.href = data.twitterLink; // replaces current page
      // }

      onClose(); // close modal
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (


    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex justify-center items-end z-50"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-[#181A1D] w-full max-w-lg p-6 rounded-t-xl shadow-lg transform translate-y-0 transition-transform duration-700 ease-out min-h-1/3 flex flex-col max-h-screen"
        ></motion.div>
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50">
          <div className="bg-[#181A1D] w-full max-w-lg p-6 rounded-t-xl shadow-lg transform translate-y-0 transition-transform duration-700 ease-out min-h-1/3 flex flex-col max-h-screen">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-100">Apply</h2>
              <button onClick={onClose} className="cursor-pointer text-gray-400 p-[1px] bg-zinc-600 rounded-full hover:text-gray-200">
                <IoIosClose size={20} />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto modal-content-scrollable pr-4">
              {/* Cover Letter */}
              <div className="mb-6">
                <label className="block text-md font-medium text-gray-200 mb-2">Cover letter</label>
                <textarea
                  className="w-full h-35 p-3 bg-neutral-900 text-gray-300 rounded-lg border border-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-blue-main"
                  placeholder="Add a cover letter to support your application"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>

              {/* CV Preview */}
              <div className="mb-6">
                <label className="block text-md font-medium text-gray-200 mb-2">Portfolio</label>
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 rounded-lg border-2 border-dashed border-secondary-main">
                  <span className="flex items-center text-gray-300 truncate space-x-5">
                    <HiFolderOpen size={50} />
                    <span className="max-w-[100px] truncate">
                      {selectedCv ? (
                        <a
                          href={selectedCv.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text--400 underline hover:underline"
                        >
                          {selectedCv.name}
                        </a>
                      ) : (
                        "No CV uploaded"
                      )}
                      {selectedCv ? " " : <p className="mt-2">2 Page • 5 MB</p>}
                    </span>
                  </span>
                  <span className="text-secondary-main">
                    <GoCheckCircleFill size={25} />
                  </span>
                </div>
              </div>

              {/* Experiences */}
              <div className="mb-16">
                <div className="flex items-center mb-2 space-x-1">
                  <button onClick={handleAddExperience} className="text-white hover:text-gray-400">
                    <IoIosAdd size={35} />
                  </button>
                  <label className="block text-md text-gray-200">Add experience</label>
                </div>
                {experiences.map((experience, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-full p-3 bg-zinc-900 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-main mb-2"
                    placeholder={`Experience #${index + 1}`}
                    value={experience}
                    onChange={(e) => handleExperienceChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>

            {/* FOOTER BUTTON */}
            <div className="w-full p-4 fixed bottom-0 left-0 bg-neutral-900 border-zinc-900">
              <button
                onClick={handleApply}
                disabled={loading}
                className="w-full bg-blue-main text-white py-4 rounded-2xl font-medium text-lg cursor-pointer hover:opacity-70 transition-opacity"
              >
                {loading ? (
                  <ClipLoader size={20} color="#ffffff" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence >
  );
};

export default ApplyModal;
