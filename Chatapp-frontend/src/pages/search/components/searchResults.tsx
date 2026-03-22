// src/components/Search/components/searchResults.tsx
import React, { useState } from 'react';
import { Img as Image } from 'react-image';
import { Link } from 'react-router-dom';
import { type Card } from './filterDataTypes';


interface SearchResultsProps {
  searchTerm: string;
  results: Card[];
  searchHistory: string[];
  isInputFocused: boolean;
  onClearHistory: () => void;
  onHistoryItemClick: (term: string) => void;
  onRemoveHistoryItem: (term: string) => void; 
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchTerm,
  results,
  searchHistory,
  isInputFocused,
  onClearHistory,
  onHistoryItemClick,
  onRemoveHistoryItem
}) => {

  const [visibleResults, setVisibleResults] = useState(6);

  const handleLoadMore = () => {
    setVisibleResults(prevCount => prevCount + 6);
  };

  const shouldShowHistory = isInputFocused && searchTerm.length === 0;
  const shouldShowSearchResults = searchTerm.length > 0 || (results.length > 0 && !isInputFocused);
  const shouldShowNoResultsMessage = searchTerm.length > 0 && results.length === 0;

  return (
    <div>
      {(shouldShowHistory || shouldShowSearchResults) ? (
        <div className="p-3 relative py-1">
          <div className='absolute top-0 left-0 w-full space-y-2'>
            <div className='text-sm flex justify-between px items-center'>
              <p className='mx-7'>Recently search</p>
              
              {/* Conditional display for "Clear All" vs "Active Jobs" */}
              {shouldShowHistory ? (
                searchHistory.length > 0 && (
                  <p className='text-secondary-main mx-7 text-right cursor-pointer min-w-[120px]' onClick={onClearHistory}>
                    Clear All
                  </p>
                )
              ) : (
                <p className='text-secondary-main mx-7 text-right min-w-[120px]'>{results.length} Active Jobs</p>
              )}
            </div>
          </div>

          {/* Conditional content: Search History or Search Results */}
          {shouldShowHistory ? (
            <div className="pt-10">
              {searchHistory.length > 0 ? (
                searchHistory.map((term, index) => (
                  <div
                    key={index}
                    className='text-white px-3 py-2 cursor-pointer flex justify-between items-center'
                    onClick={() => onHistoryItemClick(term)}
                  >
                    <span>{term}</span>
                    <button
                      className='text-gray-400 hover:text-white ml-2 p-1 rounded-full' 
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveHistoryItem(term);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))
              ) : (
                <p className='text-center text-gray-500 my-10'>No recent searches.</p>
              )}
            </div>
          ) : (
            // Content for Search Results
            results.length !== 0 ? (
              <div className="pt-10">
                {results.slice(0, visibleResults).map((card, index) => (
                  <Link to={`/discover/top-opp/${card.id}`} key={index}>
                    <div className="pr-3 mb-4 cursor-pointer">
                      <div className={`${card.type === 'Job' ? "min-h-[250px]" : "h-fit"} w-full flex flex-col justify-beten rounded-lg p-4 border border-neutral-800 text-white bg-[#181A1D]`}>
                        <div className='flex flex-row-reverse justify-between items-baseline-last'>
                          <p className='bg-blue-main text-xs px-2 py-1 text-white rounded-full'>
                            {card.type}
                          </p>
                          <div className="flex items-center space-x-3 mb-2">
                            <Image src={card.avatar} alt={card.name} width={40} height={40} className="rounded-full" />
                            <div>
                              <p className="font-medium text-lg">{card.type === 'Project' ? card.name : card.title}</p>
                              <p className="text-sm text-gray-400">{card.handle}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-1 justify- space-y-24 flex-1">
                          <p className="text-md mt-2 text-gray-400">
                            {card.description.split(" ").slice(0, 150).join(" ")}...
                          </p>
                        </div>
                        <div className='flex text-sm flex-wrap gap-2 mt-3'>
                          {card.type === 'Job' && card.func && card.func.map((f, i) => (
                            <p key={i} className='bg-[#34384080] p-3 rounded-xl text-gray-300'>{f}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              shouldShowNoResultsMessage && (
                <div className="shadow-md p-4 rounded mt-10 mx-5">
                  <h2 className="text-white">Search Result</h2>
                  <p className='text-center text-gray-500 my-20'>Tweak your search to find your next gig.</p>
                </div>
              )
            )
          )}

          {/* Load More button */}
          {(!shouldShowHistory && visibleResults < results.length) && (
            <div
              onClick={handleLoadMore}
              className='flex justify-center mb-4'
            >
              <button className="transition-colors ease-in duration-150 text-gray-300 text-md bg-zinc-900 mb-5 p-2 px-6 hover:bg-blue-main rounded-lg cursor-pointer">
                Load More
              </button>
            </div>
          )}
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default SearchResults;