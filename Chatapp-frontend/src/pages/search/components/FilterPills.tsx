import React from 'react';
import { FiX } from "react-icons/fi";
import { type OptionSelectedType } from '../components/filterDataTypes'; 

interface FilterPillsProps {
  activeFilters: OptionSelectedType;
  sortOption: string;
  removeFilter: (category: string, label: string) => void;
}

const FilterPills: React.FC<FilterPillsProps> = ({ activeFilters, sortOption, removeFilter }) => {
 
  const allActivePills: { category: string; label: string; isSortPill?: boolean }[] = [];

  Object.entries(activeFilters).flatMap(([category, labels]) =>
    labels.map((label) => allActivePills.push({ category, label }))
  );

  
  if (sortOption && sortOption !== 'Newest') {
    allActivePills.push({ category: "Sort By", label: sortOption, isSortPill: true });
  }

  return (
    <div className='flex w-full items-center justify-center'>
      <div className="flex flex-wrap gap-2 mb-6 w-[50rem] max-w-[full] mx-8 ">
        {allActivePills.map((pill, index) => (
          <div
            key={`${pill.category}-${pill.label}-${index}`}
            className="flex items-center justify-center gap-3 px-2 py-2 text-sm
                       rounded-[5px] border bg-transparent border-gray-500 text-gray-500"
          >
            {pill.label}
            <button
              className="cursor-pointer text-xl text-gray-400 hover:text-purple-500"
              onClick={() => removeFilter(pill.category, pill.label)}
              aria-label={`Remove ${pill.label}`}
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterPills;