import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Img as Image } from 'react-image';
import { verifiedCheck } from '../../../assets';
import FormButton from '../../create/components/FormButton';

// Define prop types for opportunity
interface Opportunity {
  title: string;
  description: string;
  func?: string[];
}

interface SuccessPageProps {
  opportunity?: Opportunity | null; // optional and can be null
}

const SuccessPage: React.FC<SuccessPageProps> = ({ opportunity }) => {
  const navigate = useNavigate();

  // Basic runtime check to avoid undefined errors
  if (!opportunity) {
    return (
      <div className="flex flex-col items-center justify-center text-white bg-neutral-900 p-6 h-screen">
        <p className="text-lg">No opportunity data available.</p>
        <FormButton text="Back to home" onClick={() => navigate('/discover')} isFormComplete={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start text-white bg-neutral-900 p-6 h-screen">
      <Image src={verifiedCheck} alt="Verified check" className="w-50 pt-7" />
      <div className="text-center mb-5">
        <h1 className="text-xl mb-3">Application Successful</h1>
        <p className="text-gray-300 text-lg">Your job application has been sent successfully.</p>
      </div>

      <div className="bg-zinc-900 px-5 py-4 mb-20 rounded-2xl shadow-lg w-full ring-1 ring-gray-600">
        <div className="mb-4 gap-4">
          <h2 className="text-xl font-semibold mb-3">{opportunity.title}</h2>
          <p className="text-md text-gray-400">{opportunity.description}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {opportunity.func?.map((tag, index) => (
            <span
              key={index}
              className="bg-[#34384080] text-gray-300 px-4 py-3 text-sm rounded-xl"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <FormButton text="Back to home" onClick={() => navigate('/discover')} isFormComplete={true} />
      </div>
    </div>
  );
};

export default SuccessPage;
