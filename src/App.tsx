/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Suspense, PropsWithChildren } from 'react';
import { BrowserRouter, useLocation, matchPath } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import * as routes from './routes';
import { HomePage } from './HomePage';
import { ItemDetails, ItemDetailsWrapper } from './ItemDetails';
import { GlobalStateProvider } from './useGlobalStateContext';
import { ItemsDataProvider } from './useItemsDataContext';

const GlobalSuspenseFallback = () => {
  return <div>Loading...</div>;
};

const Providers: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <ItemsDataProvider>{children}</ItemsDataProvider>
      </GlobalStateProvider>
    </BrowserRouter>
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
