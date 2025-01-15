import MovieItem from "../MovieItem/MovieItem";

function MovieListResults({movies}) {

    const movieList = movies.map((movie, key) => {
        return <MovieItem {...movie} key={key} />
    });

    return(
        <div className="row gx-3">
            {movieList}
        </div>
    );
}

export default MovieListResults;