import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';


type EventSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventData?: {
    title: string;
    eventField: string;
  } | null;
};

const EventSuccessModal: React.FC<EventSuccessModalProps> = ({ isOpen, onClose, eventData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-60">
      <div className="bg-[#181A1D] w-full max-w-lg p-6 rounded-t-xl shadow-lg transform translate-y-0 transition-transform duration-700 ease-out min-h-1/3 flex flex-col items-center text-center">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer text-gray-400 p-[1px] bg-zinc-600 rounded-full hover:text-gray-200">
          <IoIosClose size={20} />
        </button>

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center mb-6">
          <FaCheck size={30} className="text-white" />
        </div>

        {/* Success Message */}
        <h2 className="text-xl font-bold text-gray-100 mb-2">Event created successfully</h2>
        <p className="text-gray-400 mb-6">Your event has been created successfully.</p>

        {/* Event Details Card */}
        <div className="w-full p-4 bg-zinc-900 rounded-xl text-left">
          <h3 className="text-lg font-semibold text-gray-100 mb-2">{eventData?.title || 'Untitled Event'}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {eventData?.eventField && eventData?.eventField.split(',').map((tag: string, index: number) => (
              <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">{tag.trim()}</span>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            {/* Placeholder Host and Date */}
            <img src="path_to_host_avatar.jpg" alt="Host" className="w-6 h-6 rounded-full" />
            <span>Hiroshi (you)</span>
            <span>Host</span>
            <span>2 July, 2025 at 17:40</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSuccessModal;