import React from 'react';
import { PiXLight } from 'react-icons/pi';

interface HostsModalProps {
  title: string;
  hosts: { name: string; avatar: string }[];
  isOpen: boolean;
  onClose: () => void;
}

const HostsModal: React.FC<HostsModalProps> = ({ title, hosts, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-20 flex justify-center items-end z-51" onClick={onClose}>
      <div className=" bg-neutral-900 rounded-xl w-full min-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        <div className="w-full p-5 border-b border-gray-700 flex justify-between items-start">
          <h2 className="text-white font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-300 bg-zinc-600 rounded-full p-1 hover:text-white transition-colors duration-200">
           <PiXLight size={13}/>
          </button>
        </div>
        <div className="p-5 grid grid-cols-4 gap-4">
          {hosts.map((host, index) => (
            <div key={index} className="flex flex-col items-center p-2 rounded-2xl bg-zinc-900">
              <img
                src={host.avatar}
                alt={host.name}
                className="w-10 h-10 rounded-full border-2 border-gray-700 mb-2"
              />
              <p className="text-white text-sm font-medium text-center truncate w-full">
                {host.name}
              </p>
              <p className="text-gray-400 text-xs mt-1">Host</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostsModal;