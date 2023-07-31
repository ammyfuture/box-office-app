import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';
import ShowMainData from '../Components/Shows/ShowMainData';
import Details from '../Components/Shows/Details';
import Seasons from '../Components/Shows/Seasons';
import Cast from '../Components/Shows/Cast';
import { styled } from 'styled-components';
import { TextCenter } from '../Components/common/TextCenter';

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
    return <TextCenter>We have an error: {showError.message}</TextCenter>;
  }

  if (showData) {
    return (
      <ShowPageWrapper>
        {/* <button type="button" onClick={onGoBack}>
          Go back to home
        </button> */}
        <BackHomeWrapper>
          <Link to="/">Go back to home</Link>
        </BackHomeWrapper>
        {console.log(showData)}
        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />
        <InfoBlock>
          <h2>Details</h2>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </InfoBlock>

        <InfoBlock>
          <h2>Seasons</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </InfoBlock>

        <InfoBlock>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </InfoBlock>
      </ShowPageWrapper>
    );
  }
  return <TextCenter>Data is Loading</TextCenter>;
};

export default Show;

const BackHomeWrapper = styled.div`
  margin-bottom: 30px;
  text-align: left;
  a {
    padding: 10px;
    color: ${({ theme }) => theme.mainColors.dark};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ShowPageWrapper = styled.div`
  margin: auto;
  @media only screen and (min-width: 768px) {
    max-width: 700px;
  }
  @media only screen and (min-width: 992px) {
    max-width: 900px;
  }
`;

const InfoBlock = styled.div`
  margin-bottom: 40px;
  h2 {
    margin: 0;
    margin-bottom: 30px;
    font-size: 22px;
  }
`;
