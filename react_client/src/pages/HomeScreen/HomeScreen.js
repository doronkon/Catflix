import './HomeScreen.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../SlideShow/SlidShow';
import NavBar from '../NavBar/NavBar';
import VideoBanner from '../VideoBanner/VideoBanner';

const Movies = ({ currentUser }) => {
  const [recommendedMovies, setMovies] = useState([]);
  const [alreadyWatchedMovies, setAlreadyWatchedMovies] = useState([]);
  const [randomMovieForBanner, setRandomMovieForBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies', {
          method: 'GET',
          headers: {
            user: localStorage.getItem('Token'),
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const flattenedMovies = data.promotedMovies.flatMap(
          (category) => category.movies
        );
        setMovies(flattenedMovies);

        // Calculate the random movie AFTER movies are set
        const randomNum = Math.floor(Math.random() * flattenedMovies.length);
        setRandomMovieForBanner(flattenedMovies[randomNum]);

        setAlreadyWatchedMovies(data.alreadyWatched);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId, currentUser) => {
    navigate(`/movie/${movieId}`, { state: { currentUser } }); // Navigate to the movie detail page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="moviesContainer">
      <header>
        <NavBar />
      </header>

      <section className="movieRow">
        {recommendedMovies && <VideoBanner randomMovie={randomMovieForBanner} handleMovieClick={handleMovieClick} currentUser={currentUser} />}
        <h2>We recommend</h2>
        <div className="movieRow_posters">
          {/* Slideshow for Recommended Movies */}
          <Slideshow
            currentUser={currentUser}
            movies={recommendedMovies}
            onMovieClick={handleMovieClick}
          />
        </div>
      </section>

      <section className="movieRow">
        <h2>Watch again!</h2>
        <div className="movieRow_posters">
          {/* Slideshow for Already Watched Movies */}
          <Slideshow
            currentUser={currentUser}
            movies={alreadyWatchedMovies}
            onMovieClick={handleMovieClick}
          />
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Movies;
