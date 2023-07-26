import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';

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
  });

  if (showError) {
    return <div>We have an error: {showError.message}</div>;
  }

  if (showData) {
    return <div>Got show data: {showData.name}</div>;
  }
  return <div>Data is Loading</div>;
};

export default Show;
