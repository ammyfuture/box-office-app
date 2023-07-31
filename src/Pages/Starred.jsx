import ShowGrid from '../Components/Shows/ShowGrid';
import { useStarredShow } from '../lib/useStarredShows';
import { getShowByIds } from '../api/tvmaze';
import { useQuery } from '@tanstack/react-query';
import { TextCenter } from '../Components/common/TextCenter';
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

  if (starredShows?.length === 0) {
    return <TextCenter>No shows were starred</TextCenter>;
  }
  if (starredShows?.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }

  if (StarredShowsError) {
    return <TextCenter>Error Occured: {StarredShowsError.message}</TextCenter>;
  }

  return <TextCenter>Shows are loading</TextCenter>;
};
export default Starred;
