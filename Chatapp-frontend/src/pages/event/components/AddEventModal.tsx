import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

// import { FaCheck } from 'react-icons/fa';
// import { GoCheckCircleFill } from 'react-icons/go';

type AddEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (eventData: any) => void;
};

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<'Schedule' | 'Instant'>('Schedule');
  const [eventDate, setEventDate] = useState('');
  const [eventField, setEventField] = useState('');
  const [link, setLink] = useState('');

  const handleCreateEvent = () => {
    
    const eventData = {
      title,
      eventType,
      eventDate,
      eventField,
      link,
    };
    onSuccess(eventData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-60">
      <div className="bg-[#181A1D] w-full max-w-lg p-6 rounded-t-xl shadow-lg transform translate-y-0 transition-transform duration-700 ease-out min-h-1/3 flex flex-col max-h-screen">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-gray-100">Create event</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-400 p-[1px] bg-zinc-600 rounded-full hover:text-gray-200">
            <IoIosClose size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto modal-content-scrollable">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="w-full p-3 bg-zinc-900 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-main"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-medium mb-1">Event Type</label>
            <div className="flex space-x-4">
                
              <button
                onClick={() => setEventType('Schedule')}
                className={`flex-1 p-3 rounded-lg border-1 transition-all ${
                  eventType === 'Schedule'
                    ? 'border-purple-500 bg-zinc-900'
                    : 'border-gray-700 bg-transparent'
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => setEventType('Instant')}
                className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                  eventType === 'Instant'
                    ? 'border-purple-500 bg-zinc-900'
                    : 'border-gray-700 bg-transparent'
                }`}
              >
                Instant
              </button>
            </div>
          </div>
          {eventType === 'Schedule' && (
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-medium mb-1">Event date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-3 bg-zinc-900 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-main"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-medium mb-1">Event field</label>
            <input
              type="text"
              value={eventField}
              onChange={(e) => setEventField(e.target.value)}
              placeholder="Enter event field"
              className="w-full p-3 bg-zinc-900 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-main"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-medium mb-1">Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter event link"
              className="w-full p-3 bg-zinc-900 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-main"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-auto pt-4">
          <button
            onClick={handleCreateEvent}
            className="w-full bg-blue-main text-white py-4 rounded-xl font-medium cursor-pointer hover:opacity-70 transition-opacity"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;