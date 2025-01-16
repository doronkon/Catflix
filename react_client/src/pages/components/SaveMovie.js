import React, { useState } from 'react';

const SaveMovie = ({setMovie}) => {
    const [movie, setMovie2] = useState('');

const handleSubmit = async (e) => {
    

    try {
        const response = await fetch('http://localhost:8080/api/movies', {
            method: 'POST',
            headers: {
                'user': localStorage.getItem('Token'), 
                'Content-Type': 'application/json',  // Set the correct content type header
              },
              body: JSON.stringify({ 
                name : "stam",
                category:'67881611dc9bf54c07843cd4',
                pathToMovie: movie,
              }),
        });

        if (!response.ok) {
            return ;
        }

        const data = await response.json();
        console.log(data)


        // Additional logic after successful login can be added here
    } catch (error) {
        throw new Error("Server not running!")
    } 
};


    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                //setMovie(reader.result);
                setMovie2(reader.result)
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <button onClick={handleSubmit}> wow</button>
            <div>
            <input type="file" accept="video/*" onChange={handleFileSelect} />

            </div>
        </div>
    );
};

export default SaveMovie;
