import React from 'react';

interface BottomSheetProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ show, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        show ? 'backdrop-blur-xs visible' : 'invisible'
      }`}
      onClick={onClose}
    >
      {/* Mobile: bottom sheet | Desktop: right side sheet */}
      <div
        className={`
          fixed bg-[#1B1B1C] p-5 transition-transform duration-300
          rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none
          w-full sm:w-[40%] 
          h-fit sm:h-full
          left-0 right-0 sm:right-0 sm:left-auto 
          bottom-0 sm:bottom-auto sm:top-0
          transform
          ${show ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Show drag indicator only on mobile */}
        <div className="h-1 w-12 bg-gray-500 mx-auto rounded-full mb-4 sm:hidden" />
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
