import React from 'react';
import './MovieItem.css'; // Link to the external CSS file for styling

function MovieItem({ name, category, published, director, actors, length, description, catflixOriginal, minimalAge, thumbnail }) {
    const pathToThumbnail = "http://localhost:8080/media/movieThumbnails/" + thumbnail;
    return (
        <div className="movieItem">
            <div className="movieItem_contents">
                <h2 className="movieTitle">{name}</h2>
                <img src={pathToThumbnail}/>
            </div>
        </div>
    );
}

export default MovieItem;
