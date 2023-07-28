import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';
import ShowMainData from '../Components/Shows/ShowMainData';
import Details from '../Components/Shows/Details';
import Seasons from '../Components/Shows/Seasons';
import Cast from '../Components/Shows/Cast';

const Show = () => {
  const { showId } = useParams();
  // const [showData, setShowData] = useState(null);
  // const [showError, setShowError] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await getShowById(showId);
  //       setShowData(data);
  //       console.log(data);
  //     } catch (err) {
  //       setShowError(err);
  //     }
  //   }

  //   fetchData();
  // }, [showId]);
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
    refetchOnWindowFocus: false,
  });
  //need to import useNavigate to use this code
  // const navigateTo = useNavigate();
  // const onGoBack = () => {
  //   navigateTo('/');
  // };
  if (showError) {
    return <div>We have an error: {showError.message}</div>;
  }

  if (showData) {
    return (
      <div>
        {/* <button type="button" onClick={onGoBack}>
          Go back to home
        </button> */}
        <Link to="/">Go back to home</Link>
        {console.log(showData)}
        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />
        <div>
          <h2>Details</h2>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </div>

        <div>
          <h2>Seasons</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </div>

        <div>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </div>
      </div>
    );
  }
  return <div>Data is Loading</div>;
};

export default Show;
