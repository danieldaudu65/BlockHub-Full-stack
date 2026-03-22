import React from 'react';
import { FaRegCalendarDays } from "react-icons/fa6";
import { BsSoundwave } from "react-icons/bs";


interface EventCardProps {
  event: {
    title: string;
    listenerCount: number;
    hosts: { avatar: string }[];
    hostName: string;
    isLive: boolean;
    schedule?: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-[#181A1D] rounded-xl pt-4 pb-0 shadow-lg mb-4 cursor-pointer hover:bg-[#1f2227] transition-colors duration-200">
      <div className="flex flex-col ">
        <div className="flex-1 pr-4 mx-4">
          <h3 className="text-white text-lg mb-3">
            {event.title}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex -space-x-2 mr-2">
              {event.hosts.slice(0, 3).map((host, index) => (
                <img
                  key={index}
                  src={host.avatar}
                  alt="Host"
                  className="w-6 h-6 rounded-full border-2 border-[#181A1D]"
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              {event.listenerCount} listening
            </span>
          </div>
        </div>
        <div className='w-full flex justify-between items-center mt-3 bg-neutral-900 p-5 rounded-3xl'>
            <div className="flex items-center space-x-2">
                <img
                src={event.hosts[0].avatar}
                alt="Host"
                className="w-8 h-8 rounded-full"
                />
                <p className="text-white text-sm font-medium">
                {event.hostName}
                <span className="ml-2 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-lg">
                    Host
                </span>
                </p>
            </div>
            <div className="text-right flex flex-col">
            {event.isLive ? (
                <span className="text-purple-400 text-sm font-medium flex items-center">
                <BsSoundwave className="text-purple-400 mr-1 animate-pulse" />
                Live
                </span>
            ) : (
                <span className="text-gray-400 text-sm flex items-center gap-1">
                <FaRegCalendarDays /> {event.schedule}
                </span>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;