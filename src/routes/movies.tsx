import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

type Movie = {
  id: number;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary?: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
};

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const client = useApolloClient();
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              id
              title
            }
          }
        `,
      })
      .then((data) => setMovies(data.data.allMovies));
  }, [client]);

  return (
    <div>
      {movies.map((moive) => (
        <li key={moive.id}>{moive.title}</li>
      ))}
    </div>
  );
}

export default Movies;
