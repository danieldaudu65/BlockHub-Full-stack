import  { useState, useEffect, useCallback } from 'react';
import Downbar from '../../components/Downbar';
import FilterModal from './components/filterModal';
import SearchResults from './components/searchResults';
import SearchNav from './components/SearchNav';
import { top_opp_cards } from '../../data/top_oppurtunities';
import { type OptionSelectedType, type Card } from './components/filterDataTypes';
import filterData from '../../data/filterdata';
import { applyCategoryFilter } from './components/filterUtils';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState<OptionSelectedType>({});
  const [sortOption, setSortOption] = useState<string>('Newest');
  const [hasClearedDefaults, setHasClearedDefaults] = useState(false);
  const [results, setResults] = useState<Card[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  
  useEffect(() => {
    if (openFilter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openFilter]);

 
  const addSearchToHistory = useCallback((term: string) => {
    if (term.trim() === '') return;

    setSearchHistory(prevHistory => {
      const lowerCaseTerm = term.toLowerCase();
      const filteredHistory = prevHistory.filter(
        (historyItem) => historyItem.toLowerCase() !== lowerCaseTerm
      );
      return [term, ...filteredHistory].slice(0, 5);
    });
  }, []);


  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

 
  const handleRemoveHistoryItem = useCallback((termToRemove: string) => {
    setSearchHistory(prevHistory =>
      prevHistory.filter(term => term.toLowerCase() !== termToRemove.toLowerCase())
    );
  }, []);

  const handleHistoryItemClick = useCallback((term: string) => {
    setSearchTerm(term);
    setIsInputFocused(false); 
  }, []);

  useEffect(() => {
    const filterAndSortResults = () => {
      let currentResults: Card[] = [];

      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        currentResults = top_opp_cards.filter(card =>
          card.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          card.title?.toLowerCase().includes(lowerCaseSearchTerm) ||
          card.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          card.handle.toLowerCase().includes(lowerCaseSearchTerm) ||
          card.type.toLowerCase().includes(lowerCaseSearchTerm) ||
          (card.func && card.func.some(f => f.toLowerCase().includes(lowerCaseSearchTerm)))
        );
      }

      const isFilterSelectionEmpty = Object.keys(activeFilters).length === 0;

      if (!isFilterSelectionEmpty) {
        currentResults = currentResults.filter(card => {
          return Object.entries(activeFilters).every(([category, labels]) => {
            const categoryMeta = filterData.find(item => item.category === category);

            if (categoryMeta?.isSortBy) return true;

            if (labels.length === 0) {
              return false;
            }

            const categoryConfig = categoryMeta?.filterConfig;

            if (!categoryConfig) {
              console.warn(`No filterConfig found for category: ${category}. Card will be excluded.`);
              return false;
            }

            return applyCategoryFilter(card, categoryConfig, labels);
          });
        });
      }

      currentResults.sort((a, b) => {
        switch (sortOption) {
          case "Newest":
            return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
          case "Popular":
            return (b.popularityScore || 0) - (a.popularityScore || 0);
          case "Ending soon":
            return (a.endsAt?.getTime() || Infinity) - (b.endsAt?.getTime() || Infinity);
          case "Most followed":
            return (b.followers || 0) - (a.followers || 0);
          default:
            return 0;
        }
      });

      setResults(currentResults);
    };

    filterAndSortResults();

    if (searchTerm.trim() !== '') {
      addSearchToHistory(searchTerm);
    }

  }, [searchTerm, activeFilters, sortOption, addSearchToHistory]);

  const toggleFilter = () => {
    if (!openFilter && !hasClearedDefaults) {
      setHasClearedDefaults(true);
    }
    setOpenFilter(prev => !prev);
  };

  return (
    <>
      <SearchNav
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleFilter={toggleFilter}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      <SearchResults
        searchTerm={searchTerm}
        results={results}
        searchHistory={searchHistory}
        isInputFocused={isInputFocused}
        onClearHistory={clearSearchHistory}
        onHistoryItemClick={handleHistoryItemClick}
        onRemoveHistoryItem={handleRemoveHistoryItem}
      />
      <FilterModal
        openFilter={openFilter}
        toggleFilter={toggleFilter}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <Downbar />
    </>
  );
}