import React from 'react';
import './SlideShowSearch.css';
import MovieItem from '../MovieItem/MovieItem'; // Import your MovieItem component

function Slideshow({ currentUser, movies, onMovieClick }) {
  return (
    <div className="slideshow-search">
      <div className="slide">
        {movies.map((movie, idx) => (
          <MovieItem
            currentUser={currentUser}
            key={idx} // Use idx as key for each movie
            {...movie} // Spread movie props
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Slideshow;