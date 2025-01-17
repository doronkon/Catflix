import React, { useState } from 'react';

const SaveMovie = ({setVideo}) => {



    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setVideo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div>
            <input type="file" accept="video/*" onChange={handleFileSelect} />
            </div>
        </div>
    );
};

export default SaveMovie;
