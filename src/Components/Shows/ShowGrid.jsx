import { useEffect, useReducer } from 'react';
import ShowCards from './ShowCards';

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

const starredShowReducer = (currentStarred, action) => {
  switch (action.type) {
    case 'STAR':
      return currentStarred.concat(action.showId);
    case 'UNSTAR':
      return currentStarred.filter(showId => showId !== action.showId);
  }
};
const ShowGrid = ({ shows }) => {
  const [starredShow, dispatchStarredShow] = usePresistedReducer(
    starredShowReducer,
    [],
    'starredShows'
  );
  console.log({ starredShow });
  const onStarMeClick = showId => {
    const isStarred = starredShow.includes(showId);

    if (isStarred) {
      dispatchStarredShow({ type: 'UNSTAR', showId });
    } else {
      dispatchStarredShow({ type: 'STAR', showId });
    }
  };

  return (
    <div>
      {shows.map(data => (
        <ShowCards
          key={data.show.id}
          name={data.show.name}
          image={
            data.show.image ? data.show.image.medium : '/not-found-img.png'
          }
          summary={data.show.summary}
          id={data.show.id}
          onStarMeClick={onStarMeClick}
        />
      ))}
    </div>
  );
};

export default ShowGrid;
