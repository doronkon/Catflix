import './HomeScreen.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../SlideShow/SlidShow';
import NavBar from '../NavBar/NavBar';
import VideoBanner from '../VideoBanner/VideoBanner';

const Movies = ({ currentUser, isAdmin, logout }) => {
  const [promotedMovies, setPromotedMovies] = useState([]); // Store categories with movies
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
          if (response.status === 403) {
            logout();
            return
          }
          console.log(response);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPromotedMovies(data.promotedMovies); // Store all categories and their movies
        setAlreadyWatchedMovies(data.alreadyWatched);

        // Calculate a random movie from the flattened list of all promoted movies
        const allMovies = data.promotedMovies.flatMap(
          (category) => category.movies
        );
        const randomNum = Math.floor(Math.random() * allMovies.length);
        setRandomMovieForBanner(allMovies[randomNum]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);


  const handleMovieClick = (movieId, currentUser) => {
    navigate(`/movie/${movieId}`, { state: { currentUser } });
  };

  if (loading) return <p></p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
<div className="home-container">
  <div className="moviesContainer">
    <header>
    <NavBar
      doSearch={() => {}}
      showSearch={false}
      setShowSearch={() => {}}
      logout={logout} 
      isAdmin={isAdmin}
    />
    </header>
    <main className="content">
      <section className="movieRow" id='video-banner'>
        {/* Display the video banner */}
        {randomMovieForBanner && (
          <VideoBanner
            logout={logout}
            randomMovie={randomMovieForBanner}
            handleMovieClick={handleMovieClick}
            currentUser={currentUser}
          />
        )}
      </section>

      {/* Slideshow for each category in promotedMovies */}
      {promotedMovies.map((category, index) => (
        <section key={index} className="movieRow">
          <h2>{category.categoryName}</h2>
          <div className="movieRow_posters">
            <Slideshow
              currentUser={currentUser}
              movies={category.movies}
              onMovieClick={handleMovieClick}
            />
          </div>
        </section>
      ))}

      {/* Slideshow for already watched movies */}
      <section className="movieRow">
        <h2 className="home-categories-container">Watch again!</h2>
        <div className="movieRow_posters">
          <Slideshow
            currentUser={currentUser}
            movies={alreadyWatchedMovies}
            onMovieClick={handleMovieClick}
          />
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
    </footer>
  </div>
</div>
  );
};

export default Movies;
