import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react';
import { Hemisphere } from './types';

export interface Filters {
  fish: boolean;
  bugs: boolean;
  furniture: boolean;
  hemisphere: Hemisphere;
}

const defaultFilters: Filters = {
  fish: true,
  bugs: true,
  furniture: false,
  hemisphere: 'northern',
};

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  return { filters, setFilters };
};

const FiltersContext = createContext<ReturnType<typeof useFilters> | null>(
  null,
);

export const FiltersContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <FiltersContext.Provider value={useFilters()}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersContext');
  }
  return context;
};
