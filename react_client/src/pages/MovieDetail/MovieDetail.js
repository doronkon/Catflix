import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
          method: 'GET', // Set the method (GET by default)
          headers: {
            'Content-Type': 'application/json',
            'user': '677a54356d967d3400baaf7f', 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data); // Set the fetched movie data in the state
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-detail">
      <h1>{movie.name}</h1>
      <img src={`http://localhost:8080/media/movieThumbnails/${movie.thumbnail}`} alt={movie.name} />
      <p>{movie.description}</p>
      <p>Category: {movie.category}</p>
      <p>Director: {movie.director}</p>
      <p>Actors: {movie.actors.join(', ')}</p>
      <p>Duration: {movie.length} mins</p>
      {/* Add other movie details as necessary */}
    </div>
  );
};

export default MovieDetail;
