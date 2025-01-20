import MovieItem from "../MovieItem/MovieItem";
import React from 'react';
import './MovieListResults'

function MovieListResults({ movies, onMovieClick }) {
    const movieList = Array.isArray(movies) 
        ? movies.map((movie, key) => (
            <MovieItem {...movie} key={key} onClick={onMovieClick} />
        ))
        : <p>No movies available</p>;

    return (
        <div id='movielist-container'>
            {movieList}
        </div>
    );
}

export default MovieListResults;