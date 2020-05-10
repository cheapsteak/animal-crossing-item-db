/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Suspense, PropsWithChildren } from 'react';
import { BrowserRouter, useLocation, matchPath } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import * as routes from './routes';
import { HomePage } from './HomePage';
import { ItemDetails } from './ItemDetails';
import { ItemsDataProvider } from './useItemsDataContext';
import { ItemDetailsWrapper } from './ItemDetailsWrapper';
import { ReactQueryConfigProvider } from 'react-query';
import { FiltersContextProvider } from './useFiltersContext';

const GlobalSuspenseFallback = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      `}
    >
      Loading...
    </div>
  );
};

const Providers: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ReactQueryConfigProvider config={{ refetchAllOnWindowFocus: false }}>
      <BrowserRouter>
        <FiltersContextProvider>
          <ItemsDataProvider>{children}</ItemsDataProvider>
        </FiltersContextProvider>
      </BrowserRouter>
    </ReactQueryConfigProvider>
  );
};

const ItemDetailsRoute = () => {
  const location = useLocation();
  const match = matchPath<{
    itemType: 'furniture' | 'bug' | 'fish';
    itemSlug: string;
  }>(location.pathname, {
    path: routes.itemDetailsRoute(),
    exact: true,
  });
  return (
    <AnimatePresence>
      {match && (
        <ItemDetailsWrapper>
          <ItemDetails
            itemType={match.params.itemType}
            itemSlug={match.params.itemSlug}
          />
        </ItemDetailsWrapper>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<GlobalSuspenseFallback />}>
        <Providers>
          <HomePage />
          <ItemDetailsRoute />
        </Providers>
      </Suspense>
    </div>
  );
}

export default App;
