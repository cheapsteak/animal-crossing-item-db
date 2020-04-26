import React, { useState } from 'react';
import { Hemisphere } from './types';

const useGlobalState = () => {
  const [hemisphere, setHemisphere] = useState<Hemisphere>('northern');
  return {
    hemisphere,
    setHemisphere,
  };
};

const GlobalStateContext = React.createContext<ReturnType<
  typeof useGlobalState
> | null>(null);

export const GlobalStateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const globalState = useGlobalState();
  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalStateContext = () => {
  const context = React.useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'useGlobalStateContext must be used within a GlobalStateProvider',
    );
  }
  return context;
};
