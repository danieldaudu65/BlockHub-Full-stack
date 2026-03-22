import React from 'react';
import filterData from '../../../data/filterdata';
import { FiLock } from "react-icons/fi";
import { type OptionSelectedType, type FilterCategory } from './filterDataTypes';
    
type FilterModalProps = {
  openFilter: boolean;
  toggleFilter: () => void;
  activeFilters: OptionSelectedType;
  setActiveFilters: React.Dispatch<React.SetStateAction<OptionSelectedType>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

export default function FilterModal({ openFilter, toggleFilter, activeFilters, setActiveFilters, sortOption, setSortOption }: FilterModalProps) {

  const [tempActiveFilters, setTempActiveFilters] = React.useState<OptionSelectedType>(activeFilters);

  const [tempSortOption, setTempSortOption] = React.useState<string>(sortOption);

  React.useEffect(() => {
    if (openFilter) {
      setTempActiveFilters(activeFilters);
      setTempSortOption(sortOption);
    }
  }, [openFilter, activeFilters, sortOption]);

  const toggleSelection = (category: string, label: string) => {
    const categoryMeta = filterData.find(item => item.category === category);

    if (categoryMeta?.isSortBy) {
      setTempSortOption(label);
    } else {
      setTempActiveFilters(prev => {
        const currentSelections = prev[category] || [];
        const isSelected = currentSelections.includes(label);

        const updated = isSelected
          ? currentSelections.filter((l) => l !== label)
          : [...currentSelections, label];

        const newState = { ...prev, [category]: updated };
        if (newState[category].length === 0) {
          delete newState[category];
        }
        return newState;
      });
    }
  };

  const handleReset = () => {
    setActiveFilters({}); 
    setSortOption('Newest');
    toggleFilter();
  };

  const handleApply = () => {
    setActiveFilters(tempActiveFilters); 
    setSortOption(tempSortOption);
    toggleFilter();
  };

  const handleCancel = () => {
    toggleFilter();
  };

  const anyFiltersSelectedTemp = Object.values(tempActiveFilters).some(arr => arr.length > 0);

  const isSortOptionNonDefaultTemp = tempSortOption !== 'Newest';

  const canApply = anyFiltersSelectedTemp || isSortOptionNonDefaultTemp;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black bg-opacity-50
            ${openFilter ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            transition-opacity duration-300 ease-in-out`}
      onClick={handleCancel}
    >
      <div
        className='bg-background overflow-y-auto max-h-[88vh] flex flex-col items-center w-[100%] md:w-full px-5 py-2 mb-0 lg:px-10 rounded-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-[100%] md:w-[50rem] max-w-[full] flex justify-between items-center md:px-12 mb-10 md:mb-15 mt-10 md:mt-15'>
          <h2 className='text-md md:text-lg'>Filters</h2>
          <h3
            className='text-sm sm:text-md cursor-pointer hover:underline px-3 sm:px-10'
            onClick={handleReset}
          >
            Reset
          </h3>
        </div>

        <div>
          {filterData.map((item: FilterCategory, index: number) => (
            <div key={index} className='mb-7'>
              <h3 className='text-sm sm:text-md mb-2 sm:mb-3'>{item.category}</h3>
              <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                {item.subItems.map((sub, subIndex) => {
                  let selected = false;
                  if (item.isSortBy) {
                    selected = tempSortOption === sub.label;
                  } else {
                    selected = tempActiveFilters[item.category]?.includes(sub.label);
                  }

                  return (
                    <button
                      key={subIndex}
                      onClick={() => toggleSelection(item.category, sub.label)}
                      className={`flex justify-center items-center gap-1 md:gap-3 px-8 py-[7px] text-sm sm:text-md md:text-[.9rem] rounded-[5px] border cursor-pointer
                                transition-all ${selected ? "bg-purple-400/10 text-white border-purple-600"
                          : "bg-transparent border-gray-500 text-gray-500 hover:bg-purple-400/40 hover:text-white"
                        }`}
                    >
                      {sub.label}{sub.locked ? <FiLock /> : ""}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-start w-full md:w-[44.5rem]'>
          <div className='flex gap-2 md:gap-10 items-center mb-3 mt-3 md:mt-7'>
            <button
              className='rounded-[5px] py-[10px] md:py-3 px-15 md:px-18 text-sm md:text-md bg-gray-900 hover:bg-[#9747FF] cursor-pointer'
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`rounded-[5px] py-[10px] md:py-3 px-15 md:px-18 text-sm md:text-md transition-colors
                                ${canApply ? "bg-blue-main text-white cursor-pointer hover:bg-[#9747FF]"
                  : "bg-gray-700 text-gray-400"}`}
              onClick={canApply ? handleApply : undefined}
              disabled={!canApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}