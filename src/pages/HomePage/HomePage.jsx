import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import s from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const fetchedTrendingMovies = await fetchTrendingMovies();
        setTrendingMovies(fetchedTrendingMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending Today</h1>
      <MovieList movies={trendingMovies} from="home"/>
    </div>
  );
}
