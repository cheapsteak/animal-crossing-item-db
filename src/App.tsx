/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Suspense } from 'react';

import { HomePage } from './HomePage';

const GlobalSuspenseFallback = () => {
  return <div>Loading...</div>;
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<GlobalSuspenseFallback />}>
        <HomePage />
      </Suspense>
    </div>
  );
}

export default App;
