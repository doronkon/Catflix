import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const MovieList = ({ setMovie, logout, setName }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [mapMovie, setMapMovie] = useState({}); // Fixed variable name

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies/index/all', {
          method: 'GET',
          headers: {
            'user': localStorage.getItem('Token'),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            logout();
            return;
          }
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const moviesNames = data.map((movie) => movie.name);
        const movieMapping = data.reduce((acc, movie) => {
          acc[movie.name] = movie._id;
          return acc;
        }, {});

        setMovies(moviesNames);
        setMapMovie(movieMapping);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Loading/>;
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Fixed error display
  }

  const handleMovieChange = (e) => {
    const selectedName = e.target.value;
    setSelectedMovie(selectedName);
    setName(selectedName);
    setMovie(mapMovie[selectedName]);
  };

  return (
    <div>
      <label htmlFor="movie-select">Select a movie:</label>
      <select
        id="movie-select"
        value={selectedMovie}
        onChange={handleMovieChange}
      >
        <option value="" disabled>
          -- Select a Movie --
        </option>
        {movies.map((movie, index) => ( // Fixed movies variable
          <option key={index} value={movie}>
            {movie}
          </option>
        ))}
      </select>
      {selectedMovie && <p>You selected: {selectedMovie}</p>}
    </div>
  );
};

export default MovieList;
