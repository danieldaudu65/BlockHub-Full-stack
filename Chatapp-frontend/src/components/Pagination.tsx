import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  // calculate "Showing X to Y of Z"
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="w-full text-xs lg:text-md items-center justify-between flex mt-8">
      {/* Left side info */}
        <div className="flex items-center gap-2 text-[#AAAAAA]">
        <p>
          Showing {start} to {end} of {totalItems}
        </p>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded ${
            currentPage === 1 ? "text-gray-400" : "text-[#868C98] bg-[#1D1C1F] p-2  hover:text-green-400"
          }`}
        >
          <FaChevronLeft />
        </button>

        <p className="text-xs text-gray-300">
          <span className="text-[#96FF96]">
             {currentPage} </span> .... 
             
             <span className="text-[##868C98]">{totalPages}</span>
        </p>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${
            currentPage === totalPages
              ? "text-gray-400"
              : "text-[#868C98] hover:text-green-40 bg-[#1D1C1F] p-2"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
