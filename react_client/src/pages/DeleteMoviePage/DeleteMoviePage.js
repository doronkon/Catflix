import MovieList from '../components/MovieList';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import '../DeletCategory/DeleteCategory.css';
import './DeleteMoviePage.css'

const DeleteMoviePage = ({ logout }) => {
    const [movie, setMovie] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!movie) {
            setError("please choose a movie")
            return;
        }
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/movies/' + movie, {
                method: 'DELETE',
                headers: {
                    user: localStorage.getItem('Token'),
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    logout();
                    return;
                }
                return;
            }
            navigate('/')

        } catch (error) {
            throw new Error('Server not running!');
        }
    };

    const handleEditClick = (movieId, oldName) => {
        navigate(`/editMovie/${movieId}`, { state: { oldName } });
      };

    return (
        <div>
            <NavBar logout={logout} />
            <div className="delete-category-container">
                <form onSubmit={handleSubmit}>
                    <div className="delete-category-input-container">
                        <MovieList setMovie={setMovie} logout={logout} setName={setName}/>
                        <div class='delete-movie-buttons'>
                            <button id="delete-category-button" type="submit">
                                Delete Movie
                            </button>
                            <button type="button" id="edit-button" onClick={() => handleEditClick(movie, name)}>
                                Edit Movie
                            </button>
                        </div>
                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteMoviePage;