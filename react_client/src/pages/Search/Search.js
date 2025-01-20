import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import MovieListResults from '../MovieListResults/MovieListResults';
import './Search.css';
import SlideshowSearch from '../SlideShowSearch/SlideShowSearch';

function Search({ currentUser }) {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');
    const [showSearch, setShowSearch] = useState(true); // Ensure the search box is open on load
    const navigate = useNavigate();

    const doSearch = async (q) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/movies/search/' + q, {
                method: 'GET',
                headers: {
                    'user': localStorage.getItem('Token'),
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMovieList(data.concat(data.concat(data)));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleMovieClick = (movieId, currentUser) => {
        navigate(`/movie/${movieId}`, { state: { currentUser } });
    };

    useEffect(() => {
        setShowSearch(true); // Ensure the search box is open on component load
    }, []);

    return (
        <div className="home-container-search">
            <div className="row bg-white justify-content-center">
                <div className="moviesContainer">
                    <header>
                        <NavBar doSearch={doSearch} showSearch={showSearch} setShowSearch={setShowSearch} />
                    </header>
                        <div class='slideshow-search'>
                            <SlideshowSearch
                                currentUser={currentUser}
                                movies={movieList}
                                onMovieClick={handleMovieClick}
                                />
                        </div>
                    </div>
                        <footer>
                            <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
                        </footer>
                </div>
            </div>
    );
}

export default Search;