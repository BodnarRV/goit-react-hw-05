import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { searchMovies, fetchTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    } 
  }, [queryParam]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    try {
      const searchedMovies = await searchMovies(query.trim());
      setMovies(searchedMovies);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: searchTerm.trim() });
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleFormSubmit} className={s.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search movies..."
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
      <MovieList
        movies={movies}
        from="movies"
        searchTerm={searchTerm}
      />
    </div>
  );
}
