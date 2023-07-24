import { useState } from 'react';
const SearchForm = ({ onSearch }) => {
  //states
  const [searchStr, setSearchStr] = useState('');
  const [searchOptions, setSearchOptions] = useState('shows');

  // callback for the input
  const onSearchInputChange = e => {
    setSearchStr(e.target.value);
  };

  //callback for the radio buttons
  const onRadioChange = e => {
    setSearchOptions(e.target.value);
    console.log(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const options = {
      q: searchStr,
      searchOp: searchOptions,
    };
    onSearch(options);
  };
  //jsx
  return (
    <form onSubmit={onSubmit}>
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
  );
};

export default SearchForm;
