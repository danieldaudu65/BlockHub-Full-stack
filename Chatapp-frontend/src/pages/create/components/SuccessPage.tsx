import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { verifiedCheck} from "../../../assets";
import { Img as Image } from 'react-image';
import FormButton from './FormButton';

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const formData = location.state as any;
  const navigate = useNavigate();

  if (!formData) {
    return (
      <div className="text-white bg-neutral-900 p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">No data found</h1>
        <p>Return to the form to post a job.</p>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify text-white bg-neutral-900 p-6 min-h-screen">
      
        <Image
            src={verifiedCheck}
            alt="Verified check"
            className="w-50 pt-10"
        />
        <div className='text-center mb-5'>
            <h1 className="text-xl mb-3">Job Posted Successfully!</h1>
            <p className="text-gray-300 text-lg">You have successfully created a new job</p>
        </div>
      
        <div className="bg-zinc-900 p-5 rounded-lg shadow-lg w-full ring-1 ring-gray-600">
            <h2 className="text-lg mb-3">{formData.jobTitle}s</h2>
            <p className='text-gray-200 text-md mb-3'>{formData.candidateRole}</p>
        
            <div className='flex flex-wrap space-x-2'>{formData.tags.map((skill: string, idx: number) => (
                <span key={idx} className='bg-zinc-800 p-2 rounded-xl text-sm text-gray-200'>
                    {skill}
                </span>
                ))}
            </div>
        
      </div>
      <Link to="/" className="mt-8 inline-block text-blue-main hover:underline">
        <FormButton text='Back to form' onClick={() => navigate(-1)} isFormComplete={true} />
      </Link>
    </div>
  );
};

export default SuccessPage;