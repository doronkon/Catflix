import React from 'react';

const SaveImage = ({setImage}) => {

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

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileSelect} />
        </div>
    );
};

export default SaveImage;
