// returns state and dispatch
import { useEffect, useReducer } from 'react';
const usePresistedReducer = (reducer, initalState, localStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initalState, inital => {
    const presistedValue = localStorage.getItem(localStorageKey);
    return presistedValue ? JSON.parse(presistedValue) : inital;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  return [state, dispatch];
};

//reducer
const starredShowReducer = (currentStarred, action) => {
  switch (action.type) {
    case 'STAR':
      return currentStarred.concat(action.showId);
    case 'UNSTAR':
      return currentStarred.filter(showId => showId !== action.showId);
  }
};

export const useStarredShow = () => {
  return usePresistedReducer(starredShowReducer, [], 'starredShows');
};
