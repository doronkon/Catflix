import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [showVideo, setShowVideo] = useState(false); // State to toggle video visibility
  const videoRef = useRef(null); // Reference to the video element

  const handlePlayClick = () => {
    setShowVideo(true); // Show the video

    // Wait for the video element to render before attempting fullscreen
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.requestFullscreen?.(); // Activate fullscreen (modern browsers)
        videoRef.current.webkitRequestFullscreen?.(); // Safari compatibility
        videoRef.current.msRequestFullscreen?.(); // IE compatibility
        videoRef.current.play(); // Start playing the video
      }
    }, 0);
  };

  return (
    <div className="video-container">
      <button onClick={handlePlayClick}>Play</button>
      {showVideo && (
        <video
          ref={videoRef}
          src={`http://localhost:8080/api/videoPlayer/${id}`}
          controls
          width="640"
          height="360"
          preload="auto"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
