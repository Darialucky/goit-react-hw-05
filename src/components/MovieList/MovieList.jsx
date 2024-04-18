import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {movies.map(({ id, original_title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={location}>
              {original_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
