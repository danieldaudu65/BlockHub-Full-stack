import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

  const pageNumbers: number[] = [];
  const maxVisiblePages = 3;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-1 mt-6 flex-wrap text-xs sm:text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 border rounded text-white bg-gray-700 disabled:opacity-30"
      >
        <FaChevronLeft size={12} />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-2 py-1 border rounded text-gray-300"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-400 px-1">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 border rounded ${page === currentPage
            ? 'bg-blue-600 text-white'
            : 'text-gray-300'
            }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-400 px-1">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-2 py-1 border rounded text-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 border rounded text-white bg-gray-700 disabled:opacity-30"
      >
        <FaChevronRight size={12} />
      </button>
    </div>
  );
};

export default Pagination;
