import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
    const { id } = useParams();


    return (
        <div className="video-container">
            <button>Play</button>
            <video
                src={`http://localhost:8080/api/videoPlayer/${id}`}
                controls
                width="640"
                height="360"
            />
        </div>
    );
};

export default VideoPlayer;
