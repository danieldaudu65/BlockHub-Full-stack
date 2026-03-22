import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_URL } from '../confiq';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const RegisterProject: React.FC = () => {

  const handleTwitterConnect = () => {
    try {
      window.location.href = `${API_URL}/project_auth/project/twitter`;
    } catch (error: any) {
      console.error("Twitter connection error:", error);
      toast.error(error.message || "Unable to connect with Twitter. Please try again.");
    }
  };

  const navigate = useNavigate()

  return (
    <div className="bg-neutral-900 text-white">
      <Navbar />

      <div className="bg-neutral-900 min-h-[60vh] flex justify-center items-center">
        <Toaster position="top-right" reverseOrder={false} />

        <div className="flex flex-col  px-8 border-gray-800 shadow-2xl w-full max-w-2xl rounded-xl p-6">
          {/* Heading */}
          <div className="flex flex-col gap-4 items-center mt-10">
            <h2 className="text-[32px] lg:text-5xl text-center font-bold text-white">
              Register Your Project
            </h2>
            <p className="text-sm lg:text-lg text-gray-400 text-center px-4">
              Create and showcase your project with our ambassador program
            </p>
          </div>

          {/* Connect with Twitter (X) */}
          <div className="flex flex-col gap-6 w  justify-center mt-10">
            <button
              onClick={()=> navigate('/grindfi/signup/setup')}
              className="bg-blue-main cursor-pointer text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition"
            >
              Sign up as a Project
            </button>
            <div className='flex items-center gap-3'>
              <div className='w-full h-[1px] bg-white/20'> </div>
              <p>Or</p>
              <div className='w-full h-[1px] bg-white/20'> </div>
            </div>
            <button
              onClick={handleTwitterConnect}
              className="bg-blue-main cursor-pointer text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition"
            >
              Connect with X (Twitter)
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterProject;
