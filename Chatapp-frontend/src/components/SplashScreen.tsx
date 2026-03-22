// src/components/SplashScreen.tsx
import React from 'react';
import { logoWhite } from '../assets';


const SplashScreen: React.FC = () => {
    return (
        <div className="animate-pulse fixed inset-0 bg-black flex items-center justify-center z-[9999]">
            <img
                src={logoWhite} 
                alt="Website Logo"
                className="w-7 h-auto"
            /><span className='text-xl'>lockHub</span>
        </div>
    );
};

export default SplashScreen;