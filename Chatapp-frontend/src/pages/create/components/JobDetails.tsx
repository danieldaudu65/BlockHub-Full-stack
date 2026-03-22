import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import FormButton from './FormButton';

interface JobDetailsProps {
  formData: {
    jobTitle: string;
    jobType: string;
    companyDescription: string;
    compensation: string;
    candidateRole: string;
    benefit?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    jobTitle: string;
    jobType: string;
    companyDescription: string;
    compensation: string;
    candidateRole: string;
    benefit?: string;
  }>>;
  errors: {
    jobTitle?: string;
    jobType?: string;
    companyDescription?: string;
    compensation?: string;  // <-- make this optional
    candidateRole?: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<{
    jobTitle?: string;
    jobType?: string;
    companyDescription?: string;
    compensation?: string; // <-- optional here too
    candidateRole?: string;
  }>>;
  goToNextStep: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  goToNextStep
}) => {
  const update = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    const newErrors: Partial<typeof errors> = {};

    if (!(formData.jobTitle || '').trim())
      newErrors.jobTitle = "Don’t leave this blank. Give your job a title.";

    if (!(formData.jobType || '').trim())
      newErrors.jobType = 'Don’t leave this blank. Select a job type.';

    if (!(formData.companyDescription || '').trim())
      newErrors.companyDescription = "Don’t leave this blank. Tell us about your company and why you're hiring.";

    if (!(formData.compensation || '').trim())
      newErrors.compensation = "Don’t leave this blank. Tell us what is the compensation for the Job.";

    if (!(formData.candidateRole || '').trim())
      newErrors.candidateRole = "Don’t leave this blank. Describe the applicant's role.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      goToNextStep();
    }
  };

  const isFormComplete = !!(
    formData.jobTitle.trim() &&
    formData.jobType &&
    formData.companyDescription.trim() &&
    formData.compensation.trim() &&
    formData.candidateRole.trim()
  );

  return (
    <div className="px-4 pb-24 text-white bg-neutral-900">

      {/* Job Title */}
      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          placeholder="e.g ui/ux designer, Solidity Developer"
          value={formData.jobTitle}
          onChange={(e) => update(e.target.name as keyof typeof formData, e.target.value)}
          className="text-gray-200 bg-faded-gray p-3 px-4 rounded-2xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main"
        />
        {errors.jobTitle && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.jobTitle}
          </p>
        )}
      </div>

      {/* Job Type */}
      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="jobType">Job type</label>
        <select
          name="jobType"
          id="jobType"
          value={formData.jobType}
          onChange={(e) => update(e.target.name as keyof typeof formData, e.target.value)}
          className="text-gray-200 bg-faded-gray p-3 px-4 rounded-xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main"
        >
          <option value="" disabled hidden>
            Select...
          </option>
          <option value="fullTime">Full time</option>
          <option value="partTime">Part time</option>
          <option value="contractFreelance">Contract/Freelance</option>
          <option value="internship">Internship</option>
          <option value="volunteer">Volunteer</option>
          <option value="bounty">Bounty</option>
          <option value="temporary">Temporary</option>
          <option value="apprenticeship">Apprenticeship</option>
          <option value="collaboration">Collaboration</option>
        </select>
        {errors.jobType && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.jobType}
          </p>
        )}
      </div>

      {/* Why Hiring */}
      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="companyDescription">What is the company about and why you're hiring?</label>
        <textarea
          name="companyDescription"
          id="companyDescription"
          rows={5}
          placeholder="Enter company description"
          value={formData.companyDescription}
          onChange={(e) => update(e.target.name as keyof typeof formData, e.target.value)}
          className="text-gray-200 bg-faded-gray p-3 px-4 rounded-2xl ring-gray-700 ring-1 resize-none focus:outline-none focus:ring-1 focus:ring-blue-main"
        />
        {errors.companyDescription && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.companyDescription}
          </p>
        )}
      </div>

      {/* Candidate Role */}
      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="candidateRole">Candidate role</label>
        <textarea
          name="candidateRole"
          id="candidateRole"
          rows={5}
          placeholder="Describe role duty"
          value={formData.candidateRole}
          onChange={(e) => update(e.target.name as keyof typeof formData, e.target.value)}
          className="text-gray-200 bg-faded-gray p-3 px-4 rounded-2xl ring-gray-700 ring-1 resize-none focus:outline-none focus:ring-1 focus:ring-blue-main"
        />
        {errors.candidateRole && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.candidateRole}
          </p>
        )}
      </div>

      {/* Benefit (optional) */}
      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="benefit">Benefit <span className='text-gray-400'>(optional)</span></label>
        <textarea
          id="benefit"
          rows={4}
          placeholder="Describe role benefits"
          value={formData.benefit || ''}
          onChange={(e) => update('benefit', e.target.value)}
          className="text-gray-200 bg-faded-gray p-3 px-4 rounded-2xl ring-gray-700 ring-1 resize-none focus:outline-none focus:ring-1 focus:ring-blue-main"
        />
      </div>

      {/* Compensation Fiels */}
      <div className="flex flex-col gap-2 text-sm mb-7">
        <label htmlFor="compensation">Compensation <span className='text-gray-400'>(e.g. $60,000/year, Negotiable)</span></label>
        <input
          id="compensation"
          type="text"
          placeholder="Enter compensation details"
          value={formData.compensation}
          onChange={(e) => update('compensation', e.target.value)}
          className="text-gray-200 bg-faded-gray p-3 px-4 rounded-2xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main"
        />
        {errors.compensation && (
          <p className="text-red-400 flex items-center gap-1 text-sm mt-1">
            <RiErrorWarningFill /> {errors.compensation}
          </p>
        )}
      </div>

      <FormButton onClick={handleNext} isFormComplete={isFormComplete} text='Continue' />
    </div>
  );
};

export default JobDetails;
