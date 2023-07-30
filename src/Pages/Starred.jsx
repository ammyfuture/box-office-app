import ShowGrid from '../Components/Shows/ShowGrid';
import { useStarredShow } from '../lib/useStarredShows';
import { getShowByIds } from '../api/tvmaze';
import { useQuery } from '@tanstack/react-query';
const Starred = () => {
  const [starredShowIds] = useStarredShow();
  const { data: starredShows, error: StarredShowsError } = useQuery({
    queryKey: ['starred', starredShowIds],
    queryFn: () =>
      getShowByIds(starredShowIds).then(result =>
        result.map(show => ({ show }))
      ),
    refetchOnWindowFocus: false,
  });

  /*this part is confusing a little bit */
  // ({
  //   queryKey: ['starred', starredShowIds],
  //   queryFn: () => getShowByIds(starredShowIds).then(result => result.map((show) => ({show}))),
  //   refetchOnWindowFocus: false,
  // });

  if (starredShows.length === 0) {
    return <div>No shows were starred</div>;
  }
  if (starredShows?.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }

  if (StarredShowsError) {
    return <div>Error Occured: {StarredShowsError.message}</div>;
  }

  return <div>Shows are loading</div>;
};
export default Starred;
