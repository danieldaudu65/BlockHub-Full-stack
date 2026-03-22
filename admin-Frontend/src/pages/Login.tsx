import React, { useState } from 'react';
import { logo } from '../assets';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_URL } from '../confiq';
import { ClipLoader } from 'react-spinners';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin_auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          credentials: 'include', // 👈 important

        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Login failed');
      }

      localStorage.setItem('admin_token', data.token);
      toast.success('Login successful');
      navigate('verify-otp', { state: { email } });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // ✅ Always stop loading, success or error
    }
  };


  return (
    <div className='bg-[#181819] h-[100vh] flex justify-center'>
      <div className='flex flex-col shadow-2xl border w-full max-w-md p-4'>
        <div className='text-center rounded-2xl m-3 flex items-center flex-col justify-center text-white'>
          <img src={logo} alt="logo" />
          <p>Welcome back, Admin</p>
          <p className='text-gray-500 text-sm mt-1'>Enter your details to login</p>
        </div>

        <div className='w-full my-12 p-2'>
          <div className='flex flex-col'>
            <label className='text-white'>Email</label>
            <input
              type="text"
              autoComplete="off"
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-500 rounded-md my-2 px-3 text-gray-400 py-3 outline-none text-sm'
            />
          </div>
          <div className='flex mt-4 flex-col'>
            <label className='text-white'>Password</label>
            <input
              type="password"
              autoComplete="new-password"
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-gray-500 rounded-md my-2 px-3 text-gray-400 py-3 outline-none text-sm'
            />
          </div>

          <button
            onClick={handleLogin}
            className='text-white w-full py-3 justify-center rounded-md my-4 flex items-center gap-2 bg-blue-main'
            disabled={loading}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
