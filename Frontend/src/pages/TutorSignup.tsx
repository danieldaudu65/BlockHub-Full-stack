import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { logo } from '../assets';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/apiRequest';
import toast from 'react-hot-toast';
import { useUser } from '../Context/UserContext';

const TutorSignup: React.FC = () => {
  const [tutorId, setTutorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const { setIsAdmin, setTutorToken } = useUser();


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!tutorId.trim()) {
      toast('Please enter your Tutor Identity Number');
      return;
    }

    setBtnLoading(true);

    const { success, data } = await apiRequest('/tutor_auth/login-tutor', {
      method: 'POST',
      body: { tutorCode: tutorId },
      showSuccess: true,
    });

    setBtnLoading(false);

    if (!success) return;

    localStorage.setItem('tutorToken', data.token);
    localStorage.setItem('tutorInfo', JSON.stringify(data.tutor));
    localStorage.setItem('tutorCourses', JSON.stringify(data.allCourses));

    // Store token in context
    setTutorToken(data.token);

    // Decode JWT
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    setIsAdmin(payload.admin || false);

    // Navigate normally — no need to pass state
    navigate('/dashboard/academy-management');
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen relative overflow-hidden px-6 md:px-12 lg:px-20">
        <div className="absolute inset-0 opacity-30 animate-[pulse_4s_ease-in-out_infinite]
          bg-[radial-gradient(circle_at_20%_30%,rgba(72,255,117,0.4),transparent_40%),
               radial-gradient(circle_at_80%_70%,rgba(72,255,117,0.3),transparent_40%)]"
        />

        <div className="relative min-h-screen flex justify-center items-start pt-20">
          <div className="max-w-6xl w-full space-y-10">

            <div className="space-y-4">
              <div className="h-6 w-40 md:w-56 rounded bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-shimmer" />
              <div className="h-4 w-60 md:w-80 rounded bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer" />
            </div>



            {/* Responsive skeleton cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative h-40 md:h-44 rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>
              ))}
            </div>



            <div className="mt-16 space-y-3">
              <div className="text-green-400 text-xs md:text-sm tracking-widest animate-pulse">
                INITIALIZING ACADEMY MODULES...
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-progress rounded-full" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <div className="flex-1 flex justify-center items-center px-6 sm:px-10 md:px-20 lg:px-40 py-12">

        <div className="bg-black/70  sm:p-8 md:p-10 w-full max-w-md md:max-w-lg text-white shadow-2xl rounded-2xl">

          <div className="flex justify-center mb-6 md:mb-8">
            <img src={logo} alt="Logo" className="w-20 sm:w-24 md:w-28" />
          </div>

          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
            Enter Tutor Identity Number
          </h2>

          <input
            type="text"
            value={tutorId}
            onChange={(e) => setTutorId(e.target.value)}
            placeholder="Tutor Identity Number"
            className="w-full px-5 py-3 md:px-6 md:py-4 rounded-lg bg-black border border-green-500  mb-6 text-base md:text-lg"
          />

          <button
            onClick={handleSubmit}
            disabled={btnLoading}
            className={`w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 md:py-4 rounded-lg transition duration-200 flex justify-center items-center gap-3 ${btnLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >




            {btnLoading && (
              <span className="w-5 h-5 border-2 border-black border-t-transparent border-l-transparent rounded-full animate-spin" />
            )}

            {btnLoading ? 'Loading...' : 'Enter'}
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorSignup;