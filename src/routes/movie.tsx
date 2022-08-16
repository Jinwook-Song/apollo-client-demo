import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { IMovieResponse } from '../interface/movie';

const MOVIE_DETAIL = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

function Moive() {
  const { id: movieId } = useParams();
  const { data, loading } = useQuery<IMovieResponse>(MOVIE_DETAIL, {
    variables: {
      movieId,
    },
  });

  console.log(data);

  if (loading) {
    return <h2>Fetching Moive</h2>;
  }
  return <div>{data?.movie.title}</div>;
}

export default Moive;
