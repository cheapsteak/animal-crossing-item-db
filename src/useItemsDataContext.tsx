import ky from 'ky';
import React from 'react';
import { useQuery } from 'react-query';
import { Furniture, Bug, Fish, Hemisphere } from './types';
import { useFiltersContext, Filters } from './useFiltersContext';

const fetchFurniture = (): Promise<Furniture[]> => {
  return ky
    .get('/data/furniture.json')
    .json()
    .then((data: any) =>
      (data as Furniture[]).map((x) => ({ ...x, type: 'furniture' })),
    );
};

const fetchBugs = (
  _queryKey: string,
  hemisphere: Hemisphere,
): Promise<Bug[]> => {
  console.log('fetchBugs');
  return ky
    .get(
      hemisphere === 'northern'
        ? '/data/northernHemisphereBugs.json'
        : '/data/southernHemisphereBugs.json',
    )
    .json()
    .then((data: any) => (data as Bug[]).map((x) => ({ ...x, type: 'bug' })));
};

const fetchFish = (
  _queryKey: 'fish',
  hemisphere: Hemisphere,
): Promise<Fish[]> => {
  return ky
    .get(
      hemisphere === 'northern'
        ? '/data/northernHemisphereFish.json'
        : '/data/southernHemisphereFish.json',
    )
    .json()
    .then((data: any) => (data as Bug[]).map((x) => ({ ...x, type: 'fish' })));
};

const ITEM_DATA_STALE_TIME = 24 * 60 * 60 * 1000; // 24 hours

const useItemsData = ({ hemisphere, bugs, fish, furniture }: Filters) => {
  const furnitureResponse = useQuery(furniture && 'furniture', fetchFurniture, {
    suspense: true,
    staleTime: ITEM_DATA_STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const fishResponse = useQuery(fish && ['fish', hemisphere], fetchFish, {
    suspense: true,
    staleTime: ITEM_DATA_STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const bugsResponse = useQuery(bugs && ['bugs', hemisphere], fetchBugs, {
    suspense: true,
    staleTime: ITEM_DATA_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  return {
    furniture: furnitureResponse.data || [],
    fish: fishResponse.data || [],
    bugs: bugsResponse.data || [],
  };
};

const ItemsDataContext = React.createContext<ReturnType<
  typeof useItemsData
> | null>(null);

export const ItemsDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { filters } = useFiltersContext();
  const itemData = useItemsData(filters);
  return (
    <ItemsDataContext.Provider value={itemData}>
      {children}
    </ItemsDataContext.Provider>
  );
};

export const useItemsDataContext = () => {
  const context = React.useContext(ItemsDataContext);
  if (!context) {
    throw new Error(
      'useGlobalStateContext must be used within a GlobalStateProvider',
    );
  }
  return context;
};
