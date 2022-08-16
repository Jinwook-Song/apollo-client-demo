import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IMovieResponse } from '../interface/movie';

interface ImageProps {
  bg?: string;
}

const MOVIE_DETAIL = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client # Local only field
    }
  }
`;

function Moive() {
  const { id: movieId } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery<IMovieResponse>(MOVIE_DETAIL, {
    variables: {
      movieId,
    },
  });

  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${movieId}`,
      fragment: gql`
        fragment MoiveFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data?.movie.isLiked,
      },
    });
  };

  if (loading) {
    return <h2>Fetching Moive</h2>;
  }

  return (
    <Container>
      <Column>
        <Title>{loading ? 'Loading...' : `${data?.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClick}>
          {data?.movie.isLiked ? 'Unlike' : 'Like'}
        </button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}

export default Moive;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div<ImageProps>`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;
