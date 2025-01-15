import './App.css';
import React, { useState, useEffect } from 'react';
import MovieItem from '../MovieItem/MovieItem'

const Movies = () => {
  const [recommendedMovies, setMovies] = useState([]);
  const [alreadyWatchedMovies, setAlreadyWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies', {
          method: 'GET',
          headers: {
            'user': '677a54356d967d3400baaf7f',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovies(data.alreadyWatched);
        setAlreadyWatchedMovies(data.alreadyWatched);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>We recommend</h2>
      <ul>
        {recommendedMovies.map((movie, index) => (
          <MovieItem key={index} {...movie} />
        ))}
      </ul>
      <h2>Watch again!</h2>
      <ul>
        {alreadyWatchedMovies.map((movie, index) => (
          <MovieItem key={index} {...movie} />
        ))}
      </ul>
    </div>
  );
};

export default Movies;

