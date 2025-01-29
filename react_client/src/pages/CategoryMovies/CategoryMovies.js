import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import SlideshowSearch from '../SlideShowSearch/SlideShowSearch';

function CategoryMovies({ currentUser, logout, isAdmin }) {
    const [movieList, setMovieList] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const categoryName = location.state?.categoryName || "Category";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/categories/movies/${id}`, {
                    method: 'GET',
                    headers: {
                        'user': localStorage.getItem('Token'),
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        logout();
                        return;
                    }
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMovieList(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchMovies();
    }, [id, logout]); 

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`, { state: { currentUser } });
    };

    return (
        <div id='screen-page'>
            <div className="home-container-search">
                <title>Catflix</title>
                <div className="row bg-white justify-content-center">
                    <div className="moviesContainer">
                        <header>
                            <NavBar isAdmin={isAdmin} currentUser={currentUser} logout={logout} />
                        </header>
                        <h2>{categoryName}:</h2>
                        <div className="slideshow-search">
                            <SlideshowSearch
                                currentUser={currentUser}
                                movies={movieList}
                                onMovieClick={handleMovieClick}
                            />
                        </div>
                    </div>
                    <div id='search-footer'>
                        <footer>
                            <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryMovies;
