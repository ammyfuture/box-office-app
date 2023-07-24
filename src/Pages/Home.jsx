import { useState } from 'react';
const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const onSearchInputChange = e => {
    setSearchStr(e.target.value);
  };

  const onSearch = async e => {
    e.preventDefault();
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchStr}`
    );
    const body = await response.json();
    console.log(body);
  };
  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" onChange={onSearchInputChange} value={searchStr} />
        <button type="submit">Update </button>
      </form>
    </div>
  );
};
export default Home;
