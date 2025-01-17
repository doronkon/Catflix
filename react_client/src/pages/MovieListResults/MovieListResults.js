import MovieItem from "../MovieItem/MovieItem";

function MovieListResults({ movies, onMovieClick }) {
    const movieList = Array.isArray(movies) 
        ? movies.map((movie, key) => (
            <MovieItem {...movie} key={key} onClick={onMovieClick} />
        ))
        : <p>No movies available</p>;

    return (
        <div className="row gx-3">
            <p>a movie is here</p>
            {movieList}
        </div>
    );
}

export default MovieListResults;