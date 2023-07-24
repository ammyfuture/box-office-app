import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOptions, setSearchOptions] = useState('shows');

  // console.log(searchStr, apiData, apiDataError);
  const onSearchInputChange = e => {
    setSearchStr(e.target.value);
  };
  const onRadioChange = e => {
    setSearchOptions(e.target.value);
    console.log(e.target.value);
  };

  const onSearch = async e => {
    e.preventDefault();

    try {
      setApiDataError(null);

      if (searchOptions === 'shows') {
        const result = await searchForShows(searchStr);
        setApiData(result);
      } else {
        const result = await searchForPeople(searchStr);
        setApiData(result);
      }
    } catch (error) {
      setApiDataError(error);
      console.log(error);
    }
  };

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

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" onChange={onSearchInputChange} value={searchStr} />

        <label>
          Shows
          <input
            type="radio"
            name="search-option"
            value="shows"
            onChange={onRadioChange}
            checked={searchOptions === 'shows'}
          />
        </label>

        <label>
          Actors
          <input
            type="radio"
            name="search-option"
            value="actors"
            onChange={onRadioChange}
            checked={searchOptions === 'actors'}
          />
        </label>

        <button type="submit">Search </button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
};
export default Home;
