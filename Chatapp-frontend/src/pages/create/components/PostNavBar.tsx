import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";


interface PostNavbarProps {
  step: number;
  setStep: (step: number) => void;
  steps: string[];
  title?: string;
}

const PostNavbar: React.FC<PostNavbarProps> = ({
  step,
  setStep,
  steps,
  title = 'Post a Job',
}) => {
  const goToStep = (targetStep: number) => {
    if (targetStep <= step) {
      setStep(targetStep);
    }
  };

  const navigate = useNavigate();

  return (
    <nav className="flex gap-8 flex-col justify-between bg-zinc-900 px-6 pt-8 pb-4 rounded-md">
     
      <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="cursor-pointer text-white text-2xl hover:text-purple-400 transition-colors duration-300"
          >
            <FaArrowLeftLong  className='text-[1.3rem]'/>
          </button>
        <h1 className="text-white text-lg">{title}</h1>
      </div>

      {/* Step buttons */}
      <div className="flex justify-center">
        {steps.map((label, idx) => {
          const currentStep = idx + 1;
          const isActive = step === currentStep;

          return (
            <div key={label} className='flex items-center'>
              <button
                onClick={() => goToStep(currentStep)}
                className={`
                  text-[.75rem] font-medium px-2 py-1 rounded-full
                  transition-colors duration-300
                  ${isActive ? 'font-bold bg-secondary-main' : 'bg-zinc-800 text-gray-400'}
                  ${currentStep > step ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                disabled={currentStep > step}
                aria-current={isActive ? 'step' : undefined}
              >
                {label}
            </button>
            {
              currentStep === 3? " ": <div className={`w-8 h-1 ${isActive ? 'font-bold bg-secondary-main' : 'bg-zinc-800'}`}></div>
            }
            </div>

          );
        })}
      </div>
    </nav>
  );
};

export default PostNavbar;
