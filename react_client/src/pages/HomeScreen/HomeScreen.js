import './HomeScreen.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../SlideShow/SlidShow';
import NavBar from '../NavBar/NavBar';
import Search from '../Search/Search';
import movis from '../MovieItem/movis'
import MovieListResults from '../MovieListResults/MovieListResults';

const Movies = () => {
  const [movieList, setMovieList] = useState('movis');
  const [recommendedMovies, setMovies] = useState([]);
  const [alreadyWatchedMovies, setAlreadyWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const doSearch = function(q){
    setMovieList(movis.filter((movie) => movie.title.includes(q)));
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies', {
          method: 'GET',
          headers: {
            'user': '67883e78ab6ce47b38adae1f',
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
        <MovieListResults movis = {movieList}/>
      </section>

      <footer>
        <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Movies;
