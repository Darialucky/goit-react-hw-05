import { useState, useEffect } from "react";
import { getMovies } from "../movies-api";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Section } from "../components/Section/Section";
import { Container } from "../components/Container/Container";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { results } = await getMovies();
        setMovies(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Section>
      <Container>
        <div>
          <h1>Trending today</h1>
          {isLoading && <Loader />}
          {error && <ErrorMessage>❌ Something went wrong</ErrorMessage>}
          <MovieList movies={movies} />
        </div>
      </Container>
    </Section>
  );
};

export default HomePage;
