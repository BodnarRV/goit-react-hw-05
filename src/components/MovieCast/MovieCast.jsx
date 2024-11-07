import { useState, useEffect } from "react";
import s from "./MovieCast.module.css";
import { fetchMovieCredits } from "../../api";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCasts = async () => {
      try {
        const casts = await fetchMovieCredits(movieId);
        setCasts(casts);
      } catch (error) {
        console.log(error);
      }
    };

    getCasts();
  }, [movieId]);

  return (
    <div className={s.castList}>
      {casts.length > 0 ? (
        casts.map((cast) => (
          <div key={cast.cast_id} className={s.castItem}>
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                  : "path/to/placeholder.jpg"
              }
              alt={cast.original_name}
              className={s.poster}
            />
            <h3>{cast.original_name}</h3>
            <p>Character: {cast.character}</p>
          </div>
        ))
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
}
