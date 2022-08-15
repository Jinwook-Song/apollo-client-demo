# Apollo Client

| 프로젝트 기간 | 22.08.15 ~ 22.08.15                          |
| ------------- | -------------------------------------------- |
| 프로젝트 목적 | How to use apollo client with react, graphql |
| Github        | ‣                                            |

---

Introduction to Apollo Client

Apollo Client는 GraphQL을 사용하여 로컬 및 원격 데이터를 모두 관리할 수 있는 JavaScript용 상태 관리 라이브러리입니다. UI를 자동으로 업데이트하면서 애플리케이션 데이터를 가져오고, 캐시하고, 수정하는 데 사용합니다.

https://www.apollographql.com/docs/react

특징

1. 데이터 fetching
2. 우수한 개발 경험 (TypeScript, devtools 등 유용한 도구 사용 가능)
3. 모던 React용으로 설계 (훅과 같은 최신 React 기능을 활용 가능)
4. 범용 호환 (모든 빌드 셋업 및 GraphQL API를 사용)

---

## Setup

`npx create-react-app apollo-client-demo --template=typescript`

`npm i @apollo/client graphql react-router-dom`

```tsx
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      {
        allMovies {
          title
        }
      }
    `,
  })
  .then((data) => console.log(data));

export default client;
```

---

### Provider

app내에서 apollo client를 사용 가능하도록 해줌

```tsx
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
```

---

### useQuery

```tsx
import { gql, useQuery } from '@apollo/client';

type Movie = {
  allMovies: {
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
  }[];
};

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery<Movie>(ALL_MOVIES);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  return (
    <ul>
      <h1>Movies</h1>
      {data?.allMovies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}
```
