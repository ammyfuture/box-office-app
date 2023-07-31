import { useEffect, useState } from 'react';
const usePresistedState = (initalState, sessionStorageKey) => {
  const [state, setState] = useState(() => {
    const presistedValue = sessionStorage.getItem(sessionStorageKey);
    return presistedValue ? JSON.parse(presistedValue) : initalState;
  });

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
  }, [state, sessionStorageKey]);

  return [state, setState];
};

export const useSearchStr = () => {
  return usePresistedState('', 'searchStr');
};
