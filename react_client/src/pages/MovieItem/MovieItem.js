import React from 'react';
import './MovieItem.css'; // Import the CSS file

function MovieItem({currentUser,_id, name, thumbnail, onClick }) {
    const pathToThumbnail = "http://localhost:8080/media/movieThumbnails/" + thumbnail;

    return (
        <div className="movieItem" onClick={() => onClick(_id,currentUser)}> {/* Use _id as movie ID */}
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
