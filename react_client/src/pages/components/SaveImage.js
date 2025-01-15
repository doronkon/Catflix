import React, { useState } from 'react';




const SaveImage = ({setImage}) => {
    const [filePath, setFilePath] = useState(''); // Relative path to save

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePath = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/6787c9462e439331e3d77dca', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    user : '6787c9462e439331e3d77dca'
                },
                //currently saves the name of the picture
                body: JSON.stringify({image: filePath }), // Send relative path to server
            });

            if (!response.ok) {
                throw new Error('Failed to save path');
            }

            console.log('Path saved successfully');
        } catch (error) {
            console.error('Error saving path:', error);
        }
    };

    return (
        <div>
            <h2>Save Image Locally</h2>
            <input type="file" accept="image/*" onChange={handleFileSelect} />
            <button onClick={handleSavePath}>Save Path</button>
        </div>
    );
};

export default SaveImage;
