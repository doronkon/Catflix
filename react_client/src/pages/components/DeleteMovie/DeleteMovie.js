import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const DeleteMovie = ({logout}) => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        setError('');
        setLoading(true); // Show loading state



        try {
            const response = await fetch('http://localhost:8080/api/movies/'+id, {
                method: 'DELETE',
                headers: {
                    'user': localStorage.getItem('Token'), 
                    'Content-Type': 'application/json',  // Set the correct content type header
                  },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    logout();
                    return
                  }
                const errorResponse = await response.json(); // Parse error details from response
                console.log(errorResponse.errors)
                setError(errorResponse.errors);
                return;
            }
            setLoading(false);
            navigate('/')
            // Additional logic after successful login can be added here
        } catch (error) {
            throw new Error("Server not running!")
        } 
    };
    if (loading) return <p>Loading...</p>;

    return (
        <div>

            <form onSubmit={handleSubmit}>
               <button type="submit">Delete Movie</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}

        </div>

    );
};



export default DeleteMovie;
