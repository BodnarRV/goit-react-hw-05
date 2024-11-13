import s from "./MovieList.module.css";
import { Link } from "react-router-dom";

export default function MovieList({ movies = [], from, searchTerm }) {
  return (
    <div>
      <ul className={s.list}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} className={s.movie} state={{ from, query: searchTerm }}>
                {movie.title}
              </Link>
            </li>
          ))
        ) : (<></>)}
      </ul>
    </div>
  );
}
