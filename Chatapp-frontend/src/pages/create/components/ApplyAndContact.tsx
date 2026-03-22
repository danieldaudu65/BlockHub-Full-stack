import React, { useState } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
// import FormButton from './FormButton';
import DatePickerInput from '../../../components/DatePickerInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { API_URL } from '../../../confiq';



interface FormData {
  telegramLink: string;
  deadline: string;
  jobPoster: string
}

// interface Errors {
//   telegramLink?: string;
//   deadline?: string;
//   jobPoster?: string

// }

interface JobDetailsData {
  jobTitle: string;
  jobType: string;
  companyDescription: string;
  whyHiring: string;
  candidateRole: string;
  benefit: string;
  compensation: string;
  jobPoster: string;
}
interface SkillsData {
  skills: string[];
  experienceLevel: string;
  web3Area: string;
  web3AreaOther: string;
  tags: string[];
}

type JobDetailsErrors = Partial<Record<keyof JobDetailsData, string>>;
type SkillsErrors = Partial<Record<keyof SkillsData, string>>;
type ApplyErrors = Partial<Record<keyof ApplyData, string>>;

type AllErrors = JobDetailsErrors & SkillsErrors & ApplyErrors;


interface ApplyProps {
  formData: JobDetailsData & SkillsData & ApplyData; // merged full form
  setFormData: React.Dispatch<React.SetStateAction<ApplyData>>;
  jobDetails: JobDetailsData;
  skillsData: SkillsData;
  errors: AllErrors;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  goToPrevStep?: () => void;
}

interface ApplyData {
  telegramLink: string;
  deadline: string;
  jobPoster: string

}


const Apply: React.FC<ApplyProps> = ({
  formData,
  setFormData,
  jobDetails,
  skillsData,
  errors,
  setErrors,
  // goToPrevStep,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof FormData>(name: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: AllErrors) => ({ ...prev, [name]: '' }));
  };


  const handleDateChange = (date: Date | null) => {
    const dateString = date ? date.toISOString().split('T')[0] : '';
    update('deadline', dateString);
  };
  const handleSubmit = async () => {
    const newErrors: any = {};

    if (!jobDetails.jobTitle?.trim()) {
      newErrors.jobTitle = "Job title required.";
    }
    if (!skillsData.skills?.length) {
      newErrors.skills = "Skills required.";
    }
    if (!formData.telegramLink?.trim()) {
      newErrors.telegramLink = "Telegram link required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill out the required fields.');
      return;
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Missing token');
      const payload = {
        ...jobDetails,
        ...skillsData,
        ...formData,
        token: localStorage.getItem('token'),
        status: 'open',
        applicationStart: new Date().toISOString().split('T')[0],
        applicationEnd: formData.deadline || '',
      };

      const response = await fetch(`${API_URL}/user_create/post_job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to post job');
      }

      toast.success('Job posted successfully!');

      setTimeout(() => {
        setLoading(false);
        navigate('/success', { state: formData });
      }, 1800);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Something went wrong. Try again.');
      setLoading(false);
    }
  }


  const isFormComplete = !!(
    formData.telegramLink.trim() && formData.jobPoster
  );

  return (
    <div className="px-4 pb-24 min-h-[100vh] text-white bg-neutral-900">
      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="telegramLink">Link for Job Post</label>
        <input
          type="url"
          id="telegramLink"
          name="telegramLink"
          value={formData.telegramLink}
          placeholder="Insert Telegram link"
          onChange={(e) => update(e.target.name as keyof FormData, e.target.value)}
          className="text-gray-200 bg-zinc-900 p-3 px-4 rounded-2xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main"
        />
        {errors.telegramLink && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.telegramLink}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="deadline">When's the last day to apply? (Optional)</label>
        <DatePickerInput
          value={formData.deadline}
          onChange={handleDateChange}
          name="deadline"
          placeholderText="Select date"
        />
      </div>

      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="jobPoster">Who’s posting this job? (e.g., Founder, DAO Member, Hiring Lead)</label>
        <input
          id="jobPoster"
          name="jobPoster"
          type="text"
          placeholder="Enter role"
          value={formData.jobPoster}
          onChange={(e) => update(e.target.name as keyof FormData, e.target.value)}
          className="text-gray-200 bg-zinc-900 p-3 px-4 rounded-xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main"
        />
        {errors.jobPoster && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.jobPoster}
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !isFormComplete}
        className="w-full bg-blue-main text-white font-medium p-3 rounded-xl flex justify-center items-center disabled:opacity-50"
      >
        {loading ? <ClipLoader size={20} color="#fff" /> : 'Post'}
      </button>
    </div>
  );
};

export default Apply;
