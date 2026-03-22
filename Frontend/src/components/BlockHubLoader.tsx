import React from 'react';
import { logo } from '../assets';

const BlockHubLoader:React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Logo with bounce animation */}
        <img
          src={logo}
          alt="BlockHub Logo"
          className="w-24 h-24 animate-bounce mb-4"
        />       
      </div>
    </div>
  );
};

export default BlockHubLoader;
