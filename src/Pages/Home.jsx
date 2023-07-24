import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import SearchForm from '../Components/SearchForm';

const Home = () => {
  //the states
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

  //callback for the form that gets the data from api
  const onSearch = async ({ searchOp, q }) => {
    try {
      setApiDataError(null);
      let result;

      if (searchOp === 'shows') {
        result = await searchForShows(q);
      } else {
        result = await searchForPeople(q);
      }
      setApiData(result);
    } catch (error) {
      setApiDataError(error);
      console.log(error);
    }
  };

  // rendering the data on the page function
  const renderApiData = () => {
    if (apiDataError) {
      return <div> Error Occured: {apiDataError.message}</div>;
    }
    if (apiData) {
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}> {data.show.name} </div>)
        : apiData.map(data => (
            <div key={data.person.id}> {data.person.name} </div>
          ));
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
