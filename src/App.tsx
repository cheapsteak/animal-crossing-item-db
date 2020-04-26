/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Suspense, PropsWithChildren } from 'react';

import { HomePage } from './HomePage';
import { GlobalStateProvider } from './useGlobalStateContext';
import { ItemsDataProvider } from './useItemsDataContext';

const GlobalSuspenseFallback = () => {
  return <div>Loading...</div>;
};

const Providers: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <GlobalStateProvider>
      <ItemsDataProvider>{children}</ItemsDataProvider>
    </GlobalStateProvider>
  );
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<GlobalSuspenseFallback />}>
        <Providers>
          <HomePage />
        </Providers>
      </Suspense>
    </div>
  );
}

export default App;
