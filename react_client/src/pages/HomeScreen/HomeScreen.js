import './HomeScreen.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../SlideShow/SlidShow';
import NavBar from '../NavBar/NavBar';
import Search from '../Search/Search';
import MovieListResults from '../MovieListResults/MovieListResults';

const Movies = ({currentUser}) => {
  const [recommendedMovies, setMovies] = useState([]);
  const [alreadyWatchedMovies, setAlreadyWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const doSearch = function(q){
      const fetchMovies = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/movies/search/' + q, {
            method: 'GET',
            headers: {
              'user': localStorage.getItem('Token'), 
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
        setMovieList(data);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies', {
          method: 'GET',
          headers: {
            'user': localStorage.getItem('Token'), 
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

  const handleMovieClick = (movieId,currentUser) => {
    navigate(`/movie/${movieId}`, { state: { currentUser } }); // Navigate to the movie detail page
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
          currentUser = {currentUser}
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
        <MovieListResults movies={movieList} onMovieClick={handleMovieClick}/>
      </section>

      <footer>
        <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Movies;
