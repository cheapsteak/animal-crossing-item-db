import ky from 'ky';
import { useQuery } from 'react-query';
import { Furniture, Bug, Fish, Hemisphere } from './types';

const fetchFurniture = (): Promise<Furniture[]> => {
  console.log('fetchFurniture');
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
  console.log('fetchFish');
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

export const useItemsData = ({ hemisphere }: { hemisphere: Hemisphere }) => {
  const furnitureResponse = useQuery('furniture', fetchFurniture, {
    suspense: true,
    staleTime: ITEM_DATA_STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const fishResponse = useQuery(['fish', hemisphere], fetchFish, {
    suspense: true,
    staleTime: ITEM_DATA_STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const bugsResponse = useQuery(['bugs', hemisphere], fetchBugs, {
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
