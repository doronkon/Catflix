import Movies from "../HomeScreen/App";
import MovieItem from "../MovieItem/MovieItem";

function MovieListResults({videos}) {

    const movieList = Movies.map((movie, key) => {
        return <MovieItem {...movie} key={key} />
    });

    return(
        <div className="row gx-3">
            {movieList}
        </div>
    );
}

export default VideoListResults