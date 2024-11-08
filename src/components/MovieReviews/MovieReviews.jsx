import { useState, useEffect } from "react";
import s from "./MovieReviews.module.css";
import { fetchMovieReviews } from "../../api";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviews = await fetchMovieReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        console.log(error);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
