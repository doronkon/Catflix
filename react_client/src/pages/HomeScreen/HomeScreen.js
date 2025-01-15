import './HomeScreen.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../SlideShow/SlidShow';
import NavBar from '../NavBar/NavBar';
import Search from '../Search/Search';
import movies from '../MovieItem/movies'

const Movies = () => {
  const [movieList, setMovieList] = useState('movies');
  const [recommendedMovies, setMovies] = useState([]);
  const [alreadyWatchedMovies, setAlreadyWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const doSearch = function(q){
    setMovieList(movies.filter((movie) => movie.title.includes(q)));
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies', {
          method: 'GET',
          headers: {
            'user': '6788015b5663cd3ac3605751',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
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
      <Search doSearch={doSearch}/>
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
          <MovieListResult movies = {movieList}/>
      </section>

      <footer>
        <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Movies;
