import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './VideoBanner.css'; // Import external CSS file for styling

const VideoBanner = ({ randomMovie, handleMovieClick, currentUser,logout }) => {
  const [movieData, setMovieData] = useState(null); // State to store movie data

  const id = randomMovie._id;

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/`+id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Set the correct content type header
            'user': localStorage.getItem('Token'), // Add the token if required
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            logout();
            return
          }
          throw new Error('Failed to fetch movie data');
        }

        const data = await response.json(); // Parse the response JSON
        setMovieData(data); // Store the fetched data in the state
      } catch (err) {
        console.error(err);
        // You can show a fallback UI or handle the error here
      }
    };

    fetchMovieData(); // Call the function to fetch data
  }, [id]); // Re-run the effect if `id` changes

  if (!movieData) {
    return <div>Loading...</div>; // Show a loading indicator until data is available
  }

  return (
    <div className="video-banner-container">
      <video
        src={`http://localhost:8080/api/videoPlayer/`+id}
        autoPlay
        muted
        loop
        preload="auto"
        className="video-background"
      />
      <div className="text-overlay">
        <h2 className="movie-title">{movieData.name}</h2>
        <h3 className="movie-description">{movieData.description}</h3>
        <button
          onClick={() => handleMovieClick(movieData._id, currentUser)} // Pass currentUser from location.state
          className="play-button"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default VideoBanner;
