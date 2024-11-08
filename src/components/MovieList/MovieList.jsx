import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import s from "./MovieList.module.css";
import { Link } from "react-router-dom";

export default function MovieList({ movies = [], isSearchActive = false }) {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    if (isSearchActive) return;
    const getTrendingMovies = async () => {
      try {
        const fetchedTrendingMovies = await fetchTrendingMovies();
        setTrendingMovies(fetchedTrendingMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };

    getTrendingMovies();
  }, [isSearchActive]);

  const displayMovies = movies.length > 0 ? movies : trendingMovies;

  return (
    <div>
      {!isSearchActive && <h1 className={s.title}>Trending Today</h1>}
      <ul className={s.list}>
        {displayMovies.length > 0 ? (
          displayMovies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={isSearchActive ? { from: "movies", query: new URLSearchParams(window.location.search).get("query") } : { from: "trending" }}
                className={s.movie}
              >
                {movie.title}
              </Link>
            </li>
          ))
        ) : (
          !isSearchActive && <li>No movies found.</li>
        )}
      </ul>
    </div>
  );
}
