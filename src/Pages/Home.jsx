import { useState } from 'react';
import { searchForShows } from '../api/tvmaze';
const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  // console.log(searchStr, apiData, apiDataError);
  const onSearchInputChange = e => {
    setSearchStr(e.target.value);
  };

  const onSearch = async e => {
    e.preventDefault();

    try {
      setApiDataError(null);
      const result = await searchForShows(searchStr);
      setApiData(result);
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
      apiData.map(data => <div key={data.show.id}> {data.show.name} </div>);
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" onChange={onSearchInputChange} value={searchStr} />
        <button type="submit">Update </button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
};
export default Home;
