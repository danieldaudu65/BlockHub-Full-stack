import React, { useEffect, useRef, useState } from 'react';
import { Img as Image } from 'react-image';
import { verifiedCheck } from '../../../assets';
import type { Job } from '../../../types/job';


const appIcons = [
  { name: 'WhatsApp', icon: 'https://via.placeholder.com/40/25D366/FFFFFF?text=WA' },
  { name: 'Telegram', icon: 'https://via.placeholder.com/40/0088CC/FFFFFF?text=TG' },
  { name: 'X (Twitter)', icon: 'https://via.placeholder.com/40/1DA1F2/FFFFFF?text=X' },
  { name: 'Facebook', icon: 'https://via.placeholder.com/40/4267B2/FFFFFF?text=FB' },
  { name: 'LinkedIn', icon: 'https://via.placeholder.com/40/0A66C2/FFFFFF?text=LI' },
  { name: 'Email', icon: 'https://via.placeholder.com/40/D44638/FFFFFF?text=ML' },
  { name: 'SMS', icon: 'https://via.placeholder.com/40/6C757D/FFFFFF?text=SMS' },
  { name: 'Reddit', icon: 'https://via.placeholder.com/40/FF4500/FFFFFF?text=RD' },
];

interface ShareModalProps {
  onClose: () => void;
  opportunity: Job;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [appClicked, setAppClicked] = useState<{ [key: string]: boolean }>({});

  const currentPath = window.location.pathname;
  const shareLink = `${window.location.origin}${currentPath}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000); 
    }).catch(err => {
      setCopySuccess('Failed to copy!');
      console.error('Failed to copy link: ', err);
    });
  };

  const handleAppCheck = (name: string) => {
    setAppClicked({ [name]: true });
    // setTimeout(() => setAppClicked({}), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50">
      <div
        ref={modalRef}
        className="bg-[#181A1D] w-full max-w-lg p-6 rounded-t-xl shadow-lg
                   transform translate-y-0 transition-transform duration-700 ease-out min-h-1/3"
      >

        {/* Share Link Section */}
        <div className="mb-6">
          
          <div className="flex-grow flex items-center bg-zinc-900   rounded-xl overflow-hidden">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="w-full px-4 py-3 bg-transparent text-gray-300 text-sm focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="bg-blue-main text-gray-300 px-4 py-2 mx-3 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {copySuccess || 'Copy Link'}
            </button>
          </div>
        </div>

        <div className='border-t pt-4 border-neutral-800'>
          <div className="grid grid-cols-4 gap-4">
            {appIcons.map((app) => (
              <div key={app.name} className='flex flex-col items-center'>
                <div
                  onClick={() => handleAppCheck(app.name)}
                  className="rounded-lg bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition-colors w-20 h-20"
                  
                >
                  <Image
                    src={app.icon}
                    alt={app.name}
                    className="w-10 h-10 rounded-full mb-1 object-cover"
                  />
                  {appClicked[app.name] && (<Image
                    src={verifiedCheck}
                    alt={`${app.name}-verifiedCheck`}
                    className="w-7 h-7 rounded-full object-cover transform translate-x-12 translate-y-10"
                  />)}
                </div>
                <span className="text-xs text-gray-200 text-center mt-1">{app.name}</span>
              </div>
            ))};
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;