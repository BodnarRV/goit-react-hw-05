import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import s from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const fetchedDetails = await fetchMovieDetails(movieId);
        setDetails(fetchedDetails);
      } catch (error) {
        console.log("Failed to fetch movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <button className={s.backBtn} onClick={handleGoBack}>
        Go back
      </button>
      <div className={s.container}>
        <img
          src={
            details.poster_path
              ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
              : "/path/to/placeholder.jpg"
          }
          alt={details.title || "Movie poster"}
          className={s.poster}
        />
        <div className={s.details}>
          <h2 className={s.title}>
            {details.title} (
            {details.release_date
              ? details.release_date.substring(0, 4)
              : ""}
            )
          </h2>
          <p className={s.score}>
            User Score:{" "}
            {details.vote_average
              ? (details.vote_average * 10).toFixed(1) + "%"
              : ""}
          </p>
          <h3>Overview</h3>
          <p className={s.overview}>
            {details.overview || "No overview available"}
          </p>
          <h3>Genres</h3>
          <p className={s.genres}>
            {details.genres
              ? details.genres.map((genre) => genre.name).join(", ")
              : "No genres available"}
          </p>
        </div>
      </div>

      <div className={s.additional}>
        <h3>Additional information</h3>
        <ul>
          <li className={s.more}>
            <Link to="cast" className={s.movie}>
              Cast
            </Link>
          </li>
          <li className={s.more}>
            <Link to="reviews" className={s.movie}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
