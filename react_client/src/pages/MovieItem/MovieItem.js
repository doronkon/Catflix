import React from 'react';
import './MovieItem.css'; // Import the CSS file

function MovieItem({ name, thumbnail }) {
    const pathToThumbnail = "http://localhost:8080/media/movieThumbnails/" + thumbnail;

    return (
        <div className="movieItem">
            <div
                className="movieItem_contents"
                style={{ backgroundImage: `url(${pathToThumbnail})` }} // Set the thumbnail as background
            >
                <h2 className="movieTitle">{name}</h2>
            </div>
        </div>
    );
}

export default MovieItem;
