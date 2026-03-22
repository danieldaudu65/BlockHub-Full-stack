import React from 'react';
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { RiFilter3Fill } from "react-icons/ri";


interface SearchNavProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  toggleFilter: () => void;
  onFocus: () => void;
  onBlur: () => void
}

const SearchNav: React.FC<SearchNavProps> = ({ searchTerm, setSearchTerm, toggleFilter, onFocus, onBlur  }) => {
  return (
    <nav className='flex w-full items-center justify-center'>
      <div className='flex items-center w-[50rem] max-w-[full] justify-center gap-3 mt-15 mb-5 mx-7 p-3 rounded-xl border-1 border-blue-main'>
        <span className='text-2xl text-gray-500'><PiMagnifyingGlassThin /></span>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-[84%] text-left border-0 focus:outline-0 text-gray-500'
          type='text'
          placeholder='Search jobs or projects'
          onFocus={onFocus}
          onBlur={onBlur}   
        />
        <span
          className='text-2xl bg-gray-600 text-gray-400 rounded-sm cursor-pointer'
          onClick={toggleFilter}
        >
          <RiFilter3Fill />
        </span>
      </div>
    </nav>
  );
}

export default SearchNav;