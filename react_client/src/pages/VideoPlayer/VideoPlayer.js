import React, { useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './VideoPlayer.css';

const VideoPlayer = ({ logout, onPlay }) => {
  const { id } = useParams();
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef(null);
  const location = useLocation();
  const { currentUser } = location.state || {};

  const handlePlayClick = async () => {
    setIsVideoVisible(true);

    if (onPlay) {
      onPlay();
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/${currentUser}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          user: localStorage.getItem('Token'),
        },
        body: JSON.stringify({
          movie: id,
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          logout();
        }
        return;
      }
    } catch (error) {
      throw new Error('Server not running!');
    }

    try {
      const response = await fetch(`http://localhost:8080/api/movies/${id}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          user: localStorage.getItem('Token'),
        },
      });
      if (!response.ok) {
        if (response.status === 403) {
          logout();
          return;
        }
        return;
      }
    } catch (error) {
      throw new Error('Server not running!');
    }

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.requestFullscreen?.();
        videoRef.current.webkitRequestFullscreen?.();
        videoRef.current.msRequestFullscreen?.();
        videoRef.current.play();
      }
    }, 0);
  };

  return (
    <div className="video-container">
      {!isVideoVisible && (
        <button id="play-button" onClick={handlePlayClick}>
          Play
        </button>
      )}
      {isVideoVisible && (
        <video
          ref={videoRef}
          src={`http://localhost:8080/api/videoPlayer/${id}`}
          controls
          preload="auto"
          className="video"
        />
      )}
    </div>
  );
};

export default VideoPlayer;