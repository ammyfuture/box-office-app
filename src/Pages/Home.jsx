import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import SearchForm from '../Components/SearchForm';
import ShowsGrid from '../Components/Shows/ShowGrid';
import ActorsGrid from '../Components/Actors/ActorGrid';

const Home = () => {
  //the states
  const [filter, setFilter] = useState(null);

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOp === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  // const [apiData, setApiData] = useState(null);
  // const [apiDataError, setApiDataError] = useState(null);

  //callback for the form that gets the data from api
  const onSearch = async ({ searchOp, q }) => {
    setFilter({ searchOp, q });
    // try {
    //   setApiDataError(null);
    //   let result;

    //   if (searchOp === 'shows') {
    //     result = await searchForShows(q);
    //   } else {
    //     result = await searchForPeople(q);
    //   }
    //   setApiData(result);
    // } catch (error) {
    //   setApiDataError(error);
    //   console.log(error);
    // }
  };

  // rendering the data on the page function
  const renderApiData = () => {
    if (apiDataError) {
      return <div> Error Occured: {apiDataError.message}</div>;
    }

    if (apiData?.length === 0) {
      return <div>No results</div>;
    }
    if (apiData) {
      return apiData[0].show ? (
        <ShowsGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }
    return null;
  };
  // jsx
  return (
    <div>
      <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
};
export default Home;
