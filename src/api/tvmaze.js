const BASE_URL = 'https://api.tvmaze.com';
const getApi = async queryString => {
  const response = await fetch(`${BASE_URL}${queryString}`);
  const body = await response.json();
  return body;
};

export const searchForShows = query => getApi(`/search/shows?q=${query}`);
export const searchForPeople = query => getApi(`/search/people?q=${query}`);

export const getShowById = showId =>
  getApi(`/shows/${showId}?embed[]=seasons&embed[]=cast`);

export const getShowByIds = async showIds => {
  const promises = showIds.map(showId => getApi(`/shows/${showId}`));
  return await Promise.all(promises);
};
