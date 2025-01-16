import './HomeScreen.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../SlideShow/SlidShow';
import NavBar from '../NavBar/NavBar';

const Movies = ({currentUser}) => {
  const [recommendedMovies, setMovies] = useState([]);
  const [alreadyWatchedMovies, setAlreadyWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies', {
          method: 'GET',
          headers: {
            'user': '678819b6dc9bf54c07843e43',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.log(response)
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovies(data.promotedMovies.flatMap(category => category.movies));
        setAlreadyWatchedMovies(data.alreadyWatched);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to the movie detail page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="moviesContainer">
      <header>
      <NavBar />
      </header>

      <section className="movieRow">
        <h2>We recommend</h2>
        <div className="movieRow_posters">
          {/* Slideshow for Recommended Movies */}
          <Slideshow
           movies={recommendedMovies}
           onMovieClick={handleMovieClick} />
        </div>
      </section>

      <section className="movieRow">
        <h2>Watch again!</h2>
        <div className="movieRow_posters">
          {/* Slideshow for Already Watched Movies */}
          <Slideshow
          movies={alreadyWatchedMovies}
          onMovieClick={handleMovieClick}/>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Movies;
