import React, { useState } from 'react';
import EventCard from './components/EventCard';
import HostsModal from './components/HostsModal';
import AddEventModal from './components/AddEventModal';
import EventSuccessModal from './components/EventSuccessModal';
import { FaFilter, FaPlus } from "react-icons/fa6";
import { placeholderEvents } from '../../data/DownBarEvents';
import Downbar from '../../components/Downbar';


interface Host {
  name: string;
  avatar: string;
}

interface Event {
  id: number;
  title: string;
  listenerCount: number;
  hosts: Host[]; // use the Host interface you have (no id)
  hostName: string;
  isLive: boolean;
  schedule?: string;
}
interface CreatedEventData {
  title: string;
  eventField: string;
}

const EventScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'for_you' | 'your_events'>('for_you');
  const [isHostsModalOpen, setIsHostsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Type state with Event or null
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Replace any with a proper type, or keep unknown or null if you want to be safe
  const [createdEventData, setCreatedEventData] = useState<CreatedEventData | null>(null);

  const handleOpenHostsModal = (event: Event) => {
    setSelectedEvent(event);
    setIsHostsModalOpen(true);
  };

  const handleCloseHostsModal = () => {
    setIsHostsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenAddEventModal = () => {
    setIsAddEventModalOpen(true);
  };

  const handleCloseAddEventModal = () => {
    setIsAddEventModalOpen(false);
  };

  const handleCreateEventSuccess = (eventData: CreatedEventData) => {
    setCreatedEventData(eventData);
    setIsAddEventModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };


  // Placeholder data filtering
  const displayedEvents: Event[] = placeholderEvents.filter(event =>
    activeTab === 'for_you' || !event.isLive
  );
  return (
    <div className=" bg-[#181A1D] min-h-screen text-white ">
      <div className=" flex items-center justify-between m-4 py-3">
        <h1 className="text-xl font-bold">Event</h1>
        <FaFilter size={24} className="text-gray-400 cursor-pointer hover:text-gray-200 transition-colors ease-in-out duration-150" />
      </div>

      <div className='bg-[#121212] w-full p-4 pt-7 pb-24'>
        <div className="flex items-center space-x-6 mb-6">
          <button
            onClick={() => setActiveTab('for_you')}
            className={`text-md font-medium pb-2 relative transition-colors duration-200 ${activeTab === 'for_you' ? 'text-white' : 'text-gray-500'
              }`}
          >
            For you
            {activeTab === 'for_you' && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('your_events')}
            className={`text-md font-medium pb-2 relative transition-colors duration-200 ${activeTab === 'your_events' ? 'text-white' : 'text-gray-500'
              }`}
          >
            Your events
            {activeTab === 'your_events' && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-full"></div>
            )}
          </button>
        </div>

        <div className="space-y-4">
          {displayedEvents.map(event => (
            <div key={event.id} onClick={() => handleOpenHostsModal(event)}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      <HostsModal
        title={selectedEvent?.title || ''}
        hosts={selectedEvent?.hosts || []}
        isOpen={isHostsModalOpen}
        onClose={handleCloseHostsModal}
      />

      <AddEventModal isOpen={isAddEventModalOpen} onClose={handleCloseAddEventModal} onSuccess={handleCreateEventSuccess} />
      <EventSuccessModal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal} eventData={createdEventData} />

      {/* fixed add event button */}
      <span
        onClick={handleOpenAddEventModal}
        className='group cursor-pointer transition-opacity hover:opacity-70 fixed right-5 bottom-25 bg-blue-main p-2 rounded-xl text-gray-200'
      >
        <FaPlus size={18} />
        <div className="absolute bottom-full mb-2 hidden group-hover:block px-3 py-1 text-xs text-white bg-black rounded-md">
          Add event
        </div>
      </span>
      <Downbar />
    </div>
  );
};

export default EventScreen;