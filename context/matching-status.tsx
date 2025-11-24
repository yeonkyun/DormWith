import { createContext, ReactNode, useContext, useState } from 'react';

type MatchingStatusContextValue = {
  matchingOn: boolean;
  setMatchingOn: (value: boolean) => void;
};

const MatchingStatusContext = createContext<MatchingStatusContextValue | null>(null);

export function MatchingStatusProvider({ children }: { children: ReactNode }) {
  const [matchingOn, setMatchingOn] = useState(true);

  return (
    <MatchingStatusContext.Provider value={{ matchingOn, setMatchingOn }}>
      {children}
    </MatchingStatusContext.Provider>
  );
}

export function useMatchingStatus() {
  const ctx = useContext(MatchingStatusContext);
  if (!ctx) {
    throw new Error('useMatchingStatus must be used within MatchingStatusProvider');
  }
  return ctx;
}
