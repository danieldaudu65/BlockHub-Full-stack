import React, { useState } from 'react';
import { logo } from '../assets';
import { useLocation, useNavigate } from 'react-router-dom';
import OTPInput from '../components/OTPInput';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { API_URL } from '../confiq';

const Verify: React.FC = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email;

    const [loading, setLoading] = useState(false);

    const handleOTPComplete = async (otp: string) => {
        if (!email) {
            toast.error('No email found. Please go back and login.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/admin_auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Failed to verify');
            } else {
                toast.success('OTP verified!');
                navigate('/home');
            }
        } catch (err) {
            toast.error('Server error');
        } finally {
            setLoading(false);
        }
    }; return (


        <div className='bg-[#181819] h-[100vh] flex justify-center '>
            <div className='bg-[] flex flex-col   shadow-2xl border w-full items- p-4'>
                <div className='text-center rounded-2xl m-3 flex items-center  flex-col justify-center text-white'>
                    <img src={logo} alt="" />
                    <p>Welcome back , Admin</p>
                    <p className='text-gray-500 text-sm mt-'>Enter the otp send to your mail</p>
                </div>

                <div className='w-full my-12 p-2'>
                    <OTPInput onComplete={handleOTPComplete} />

                    <button
                        onClick={() => { }}
                        disabled={true}
                        className='text-white w-full py-3 justify-center rounded-md my-6 flex items-center bg-blue-main'
                    >
                        {loading ? <ClipLoader color="#fff" size={20} /> : 'Waiting for OTP...'}
                    </button>  </div>
            </div>
        </div>
    );
}

export default Verify;
