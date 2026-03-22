import React, { useState } from 'react';
import JobDetails from '../components/JobDetails';
import Skills from '../components/SkillsAndExp';
import Apply from '../components/ApplyAndContact';
import PostNavbar from '../components/PostNavBar';

// Define interfaces for each step's form data and errors

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

interface JobDetailsErrors {
  jobTitle?: string;
  jobType?: string;
  companyDescription?: string;
  whyHiring?: string;
  candidateRole?: string;
  benefit?: string;
  compensation?: string;
  jobPoster?: string;
}

interface SkillsData {
  skills: string[];
  experienceLevel: string;
  web3Area: string;
  web3AreaOther: string;
  tags: string[];
}

interface SkillsErrors {
  skills?: string;
  experienceLevel?: string;
  web3Area?: string;
  web3AreaOther?: string;
  tags?: string;
}

interface ApplyData {
  telegramLink: string;
  deadline: string;
}

interface ApplyErrors {
  telegramLink?: string;
  deadline?: string;
}

const Post: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [jobDetails, setJobDetails] = useState<JobDetailsData>({
    jobTitle: "",
    jobType: "",
    companyDescription: "",
    whyHiring: "",
    candidateRole: "",
    benefit: "",
    compensation: "",
    jobPoster: ""
  });
  const [jobDetailsErrors, setJobDetailsErrors] = useState<JobDetailsErrors>({});

  const [skillsData, setSkillsData] = useState<SkillsData>({
    skills: [],
    experienceLevel: "",
    web3Area: "",
    web3AreaOther: "",
    tags: [],
  });
  const [skillsErrors, setSkillsErrors] = useState<SkillsErrors>({});

  const [applyData, setApplyData] = useState<ApplyData>({
    telegramLink: "",
    deadline: "",
  });
  const [applyErrors, setApplyErrors] = useState<ApplyErrors>({});
  // const allFormData = {
  //   ...jobDetails,
  //   ...skillsData,
  //   ...applyData,
  // };

  const steps: string[] = ['Job details', 'Skills & Experience', 'Apply & Contact'];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <JobDetails
            formData={jobDetails}
            setFormData={setJobDetails as any}
            errors={jobDetailsErrors}
            setErrors={setJobDetailsErrors}
            goToNextStep={() => setStep(2)}
          />
        );
      case 2:
        return (
          <Skills
            formData={skillsData}
            setFormData={setSkillsData}
            errors={skillsErrors}
            setErrors={setSkillsErrors}
            goToNextStep={() => setStep(3)}
            goToPrevStep={() => setStep(1)}
          />
        );
      case 3:
        return (
          <Apply
            formData={{ ...jobDetails, ...skillsData, ...applyData }}
            jobDetails={jobDetails}
            skillsData={skillsData}
            setFormData={setApplyData as React.Dispatch<React.SetStateAction<any>>}
            errors={applyErrors}
            setErrors={setApplyErrors}
            goToPrevStep={() => setStep(2)}
          />

        );
      default:
        return null;
    }
  };

  return (
    <section className="px-2 bg-neutral-900">
      <PostNavbar step={step} setStep={setStep} steps={steps} />
      <div className="mt-6 rounded-md">
        {renderStep()}
      </div>
    </section>
  );
};

export default Post;
