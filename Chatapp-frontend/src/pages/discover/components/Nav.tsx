import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Img as Image } from 'react-image';
import { bell, shop } from '../../../assets';
import { API_URL } from '../../../confiq';

const Nav: React.FC = () => {
  const [userImage, setUserImage] = useState('');
  const [name, setName] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [paidBundle, setPaidBundle] = useState(false);

  useEffect(() => {
    const image = localStorage.getItem('user_image');
    const name = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id');
    const paidbundle = localStorage.getItem('paidbundle'); // comes as "true"/"false"

    if (image) setUserImage(image);
    if (name) setName(name);
    if (paidbundle === 'true') setPaidBundle(true);

    if (userId) {
      fetch(`${API_URL}/user_discover/notifications_unread-count`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
        .then(res => res.json())
        .then(data => setUnreadCount(data.unreadCount || 0))
        .catch(err => console.error('Failed to fetch unread notifications', err));
    }
  }, []);

  return (
    <div className='flex justify-between p-2 pt-3 w-full items-center'>
      <div className='flex items-center'>
        <Image
          src={userImage || '/default-avatar.png'}
          alt='Profile'
          className='w-10 h-10 rounded-full ml-3 object-cover mr-3'
        />
        <div>
          <p className='text-gray-200'>{name}</p>
          <div className='flex items-center gap-2 text-white-main'>
            <p className='text-[#A4A6AA] text-sm'>Explore Tier</p>
            <button className='bg-faded-gray text-[#C2C3C6] p-1 text-xs rounded-xl px-2'>Free</button>
          </div>
        </div>
      </div>

      <div className='flex gap-3'>
        {/* Notifications */}
        <Link
          to={'/discover-activities'}
          className='relative bg-zinc-900 p-3 rounded-xl cursor-pointer hover:bg-zinc-700 transition-colors ease-in-out duration-100'
        >
          <img src={bell} alt="Notifications" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 inline-block px-1 bg-blue-main text-[8px] p-[2px] rounded-full border-black">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Bundle (only if paid) */}
        {paidBundle && (
          <Link
            to={'/bundle'}
            className='relative bg-zinc-900 mr-3 p-3 rounded-xl cursor-pointer hover:bg-zinc-700 transition-colors ease-in-out duration-100'
          >
            <img src={shop} alt="Shop" />
            <span className="absolute top-0 right-0 px-1 py-[1px] text-[7px] font-bold text-white bg-red-600 rounded-full border border-black animate-pulse">
              NEW
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
