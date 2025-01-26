import { useState, useMemo } from 'react';
import { Launch, FilterState } from '../types';

export const UseFilteredLaunches = (
  launches: Launch[], 
  currentPage: number, 
  itemsPerPage: number
) => {
  const [filters, setFilters] = useState<FilterState>({});

  const filteredLaunches = useMemo(() => {
    return launches.filter(launch => {
      const yearMatch = !filters.launch_year || 
        launch.launch_year === filters.launch_year;
      
      const launchSuccessMatch = filters.launch_success === undefined || 
        launch.launch_success === filters.launch_success;
      
      const landSuccessMatch = filters.land_success === undefined || 
        launch.rocket.first_stage.cores.some(
          core => core.land_success === filters.land_success
        );

      return yearMatch && launchSuccessMatch && landSuccessMatch;
    });
  }, [launches, filters]);

  const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage);
  
  const paginatedLaunches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLaunches.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLaunches, currentPage, itemsPerPage]);

  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return {
    paginatedLaunches,
    totalPages,
    applyFilters,
  };
};