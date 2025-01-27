import React, { useState } from 'react';

const SaveImage = ({setImage}) => {
    const [preview, setPreview] = useState(null);


    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result); // Set the preview URL
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileSelect} />
            {preview && (
                <div style={{ marginTop: '10px' }}>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}
                    />
                </div>)}
        </div>
    );
};

export default SaveImage;
