import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../movies-api";
import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { cast } = await getMovieCredits(movieId);
        setCasts(cast);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {casts.length > 0 && (
        <ul className={css.castList}>
          {casts.map(({ id, profile_path, character, original_name }) => (
            <li key={id} className={css.castItem}>
              {
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200${profile_path}}`
                      : defaultImg
                  }
                  alt={original_name}
                  width={200}
                  height={300}
                />
              }

              <h3>{original_name}</h3>
              <p>Character:{character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
