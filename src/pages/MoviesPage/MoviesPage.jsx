import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import s from "./MoviesPage.module.css";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query") || "";
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
      localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/movies?query=${searchTerm.trim()}`);
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
      <MovieList movies={movies} isSearchActive={true} />
    </div>
  );
}
