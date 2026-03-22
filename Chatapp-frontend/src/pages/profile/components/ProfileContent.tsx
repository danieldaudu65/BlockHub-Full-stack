import React, { useEffect, useState } from 'react';
import { pfp } from '../../../assets';
import { Img as Image } from 'react-image';
import { HiFolderOpen } from 'react-icons/hi2';
import { GoCheckCircleFill } from 'react-icons/go';
import { RiDeleteBinLine } from "react-icons/ri";
import { BsBoxArrowLeft, BsFillLightningFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../confiq';

type User = {
  cvs?: { name: string; id: number; url: string }[];
}

type ProfileContentProps = {
  user: User;
  handleEditPortfolio: () => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({  handleEditPortfolio }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('BlockHub Brain');
  const [profileImage, setProfileImage] = useState(pfp);
  const [twitterHandle, setTwitterHandle] = useState('@Wanted_heroshe');
  const [userInterest, setUserInterest] = useState<string[]>([]);
  const [portfolioName, setPortfolioName] = useState<string | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    const storedImage = localStorage.getItem('user_image');
    const storedHandle = localStorage.getItem('user_username');

    if (storedName) setUserName(storedName);
    if (storedImage) setProfileImage(storedImage);
    if (storedHandle) setTwitterHandle(storedHandle.startsWith('@') ? storedHandle : '@' + storedHandle);

    const token = localStorage.getItem('token');
    if (!token) return;

    // Fetch interests
    fetch(`${API_URL}/user_profile/get_user_interest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.interests)) {
          setUserInterest(data.interests);
        }
      })
      .catch(err => {
        console.error('Error fetching interests:', err);
      });

    // Fetch portfolio from backend (Cloudinary URL)
    fetch(`${API_URL}/user_profile/get_portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.portfolios) && data.portfolios.length > 0) {
          // Pick first portfolio (or handle multiple later if needed)
          const firstPortfolio = data.portfolios[0];
          setPortfolioUrl(firstPortfolio.url || null);
          setPortfolioName(firstPortfolio.name || 'Portfolio');
        }
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err);
      });

  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleEditInterest = () => {
    navigate('/select-interest', { state: { from: 'profile' } });
  };

  return (
    <div className='m-6'>
      {/* User Handle */}
      <div className='flex justify-between items-center bg-zinc-900 rounded-2xl mb-5'>
        <div className='flex items-center'>
          <Image src={profileImage} alt='Profile picture' className='rounded-full mr-4' />
          <div>
            <p className='text-white mb-[3px]'>{userName}</p>
            <div className='flex items-end gap-2 text-xs text-white-main'>
              <p className='text-[#A4A6AA]'>{twitterHandle}</p>
            </div>
          </div>
        </div>
        <span className='flex items-center text-gray-300 text-xs rounded-lg p-1 px-2 bg-zinc-800'>
          <BsFillLightningFill />
          <p>Silver</p>
        </span>
      </div>

      {/* Interest Area */}
      <div className="bg-zinc-900 rounded-2xl p-2 mb-5">
        <div className='flex justify-between text-sm mb-5'>
          <label className="text-sm font-medium text-gray-200 mb-2">Interest</label>
          <button onClick={handleEditInterest} className='cursor-pointer text-secondary-main'>
            Edit
          </button>
        </div>
        <div className="bg-zinc-800 p-4 rounded-2xl mb-3 flex flex-wrap items-center gap-2">
          {userInterest.length > 0 ? (
            userInterest.slice(0, 5).map((interest, index) => (
              <button
                key={index}
                className="transition-colors ease-in-out duration-200 p-3 text-xs rounded-xl bg-neutral-900 text-gray-300"
                type="button"
              >
                {interest}
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-xs">No interests set yet.</p>
          )}
        </div>
      </div>

      {/* Portfolio Display */}
      <div className="text-sm mb-5 p-2 bg-zinc-900 rounded-2xl">
        <div className='flex justify-between text-sm mb-5'>
          <label className="font-medium text-gray-200 mb-2">Portfolios</label>
          <button onClick={handleEditPortfolio} className='cursor-pointer text-secondary-main' type="button">
            Edit
          </button>
        </div>
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 rounded-lg border-2 border-dashed border-secondary-main">
          <span className="flex items-center text-gray-300 truncate space-x-5">
            <HiFolderOpen size={50} />
            <span>
              {portfolioName ?? 'No portfolio uploaded'}
              {portfolioUrl && (
                <p className='mt-2'>
                  <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className='text-secondary-main underline'>
                    View / Download
                  </a>
                </p>
              )}
            </span>
          </span>
          {portfolioUrl ? (
            <span className="text-secondary-main"><GoCheckCircleFill size={20} /></span>
          ) : null}
        </div>
      </div>

      {/* Actions */}
      <div className="text-sm mb-5 p-2 flex flex-col space-y-2 bg-zinc-900 rounded-2xl">
        <label className="font-medium text-gray-200">Actions</label>
        <div
          className="flex items-center justify-between px-4 py-3 mb-2 bg-neutral-900 rounded-full cursor-pointer"
          onClick={handleLogout}
        >
          <span className="flex items-end text-gray-400 space-x-2">
            <RiDeleteBinLine size={20} />
            <p className='mt-2'>Log out</p>
          </span>
        </div>
        <div
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer"
          onClick={() => { /* delete account handler */ }}
        >
          <span className="flex items-end text-gray-400 space-x-2">
            <BsBoxArrowLeft size={20} />
            <p className='mt-2'>Delete</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
