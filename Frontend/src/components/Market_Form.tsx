import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { API_URL } from '../confiq';
import { FaTimes } from 'react-icons/fa';

interface MarketFormProps {
  selectedItem: {
    id: string;
    title: string;
    description: string[];
    fileType: string;
    price: string;
    isCall?: boolean;  // ✅ include this
    originalPrice?: string;
  };
  onClose: () => void;
}
const MarketForm: React.FC<MarketFormProps> = ({ selectedItem, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!(window as any).PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const cleanPrice = () => {
    const numeric = selectedItem.price.replace(/[^\d.]/g, '');
    const amount = parseFloat(numeric);
    return isNaN(amount) ? 0 : amount;
  };

  const handlePayment = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    const amount = cleanPrice();
    if (amount <= 0) {
      toast.error('Invalid product price');
      return;
    }

    if (!(window as any).PaystackPop) {
      toast.error('Payment system not ready. Please wait and try again.');
      return;
    }

    try {
      setLoading(true);
      const saveRes = await fetch(`${API_URL}/user/create_payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          username,
          is_call_payment: selectedItem.isCall ?? false,
          product_id: selectedItem.id,
          product_title: selectedItem.title,
          product_price: amount,
        }),
      });

      const saveData = await saveRes.json();

      if (!saveRes.ok) {
        toast.error('Failed to save user info.');
        setLoading(false);
        return;
      }

      const paymentId = saveData.data._id; // 👈 Grab paymentId here

      const handler = (window as any).PaystackPop.setup({
        key: 'pk_live_83d1f3b1b376e3bf9f932ea9b3c30cc199ce273b',
        email,
        amount: amount * 100,
        currency: 'NGN',
        metadata: {
          email,
          product: selectedItem.title,
        },
        callback: (response: any) => {
          fetch(`${API_URL}/user/mark_as_paid`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              name,
              paymentId,
              reference: response.reference,
            }),
          })
            .then((res) => {
              if (res.ok) {
                toast.success('Payment successful! Check your email.');
                onClose();
              } else {
                toast.error('Payment completed, but finalizing failed.');
              }
            })
            .catch(() => {
              toast.error('Network error while finalizing payment');
            })
            .finally(() => {
              setLoading(false);
            });
        },
        onClose: () => {
          toast.error('Payment cancelled.');
          setLoading(false);
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong during payment.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg- bg-opacity-40">
      <Toaster position='top-right' />

      <div className="bg- relative p-6  bg-[#151718] rounded-md w-[90%] lg:max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Confirm Email</h2>

        <p className="text-sm text-gray-300">Provide an active email, which you would like to receive product</p>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-6 border placeholder:text-sm text-gray-300 py-3 border-gray-700 bg-[#181819] m px-3 p-2 rounded-lg outline-none"
        />
        <input
          type="text"
          placeholder="Enter your Twitter handle (@username)"
          value={username}
          onChange={(e) => setUsername(e.target.value.startsWith('@') ? e.target.value : '@' + e.target.value)}
          className="w-full mt-6 border placeholder:text-sm text-gray-300 py-3 border-gray-700 bg-[#181819] m px-3 p-2 rounded-lg outline-none"
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full my-6 border placeholder:text-sm text-gray-300 py-3 border-gray-700 bg-[#181819] m px-3 p-2 rounded-lg outline-none"
        />

        <div className="space-y-6 flex flex-col justify-center items-center">
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full cursor-pointer flex justify-center py-3 rounded-xl items-center bg-[#3401CC] text-gray-300 font-semibold ${loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : 'Proceed'}
          </button>
          <div className='flex w-full items-center gap-3'>
            <div className="w-full h-[1px] rounded-full bg-[#181819] border-[#232323] border" />
            <p className="text-gray-300">or</p>
            <div className="w-full h-[1px] rounded-full bg-[#181819] border-[#232323] border" />
          </div>
          <button
            className={`w-full flex justify-center rounded-xl items-center bg-transparent border border-[#232323] py-3 text-gray-400 font-semibold ${loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            Connect with Google
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-gray-500 cursor-pointer bg-[#939496] p-1.5 flex justify-center items-center right-2 absolute top-0 text-sm rounded-4xl"
          disabled={loading}
        >
          <FaTimes className="text-gray-300 text-[12px]" />
        </button>
      </div>
    </div>
  );
};

export default MarketForm;
