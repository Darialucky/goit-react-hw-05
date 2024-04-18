import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieByID } from "../movies-api";
import { useEffect, useRef, useState } from "react";
import css from "../components/Style/style.module.css";
import { GoBackBtn } from "../components/GoBackBtn/GoBackBtn";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Container } from "../components/Container/Container";
import { Section } from "../components/Section/Section";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location?.state ?? "/");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieByID(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
        <GoBackBtn path={backLink.current}>Go back</GoBackBtn>
        <div className={css.cont}>
          {movie.poster_path && (
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}  alt=${movie.original_title}}`
                  : defaultImg
              }
              alt={movie.original_title}
              width={250}
            />
          )}
          <div className={css.wrapper}>
            <h2>{movie.original_title}</h2>
            {movie.release_date ? (
              <p className={css.text}>({movie.release_date.slice(0, 4)})</p>
            ) : null}
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul className={css.genresList}>
              {movie.genres?.map(({ id, name }) => (
                <li key={id}>
                  <p>{name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <h3>Additional information</h3>
        <div className={css.details}>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </div>
        <Outlet />
      </Container>
    </Section>
  );
};

export default MovieDetailsPage;
