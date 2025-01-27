import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import MovieListResults from '../MovieListResults/MovieListResults';
import './Search.css';
import SlideshowSearch from '../SlideShowSearch/SlideShowSearch';

function Search({ currentUser, logout,isAdmin }) {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const doSearch = async (q) => {
        setSearchQuery(q)
        if(q==="")
        {
            setMovieList([])
            return
        }
        try {
            const response = await fetch('http://localhost:8080/api/movies/search/' + q, {
                method: 'GET',
                headers: {
                    'user': localStorage.getItem('Token'),
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                if (response.status === 403) {
                    logout();
                    return
                  }
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMovieList(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    

    const handleMovieClick = (movieId, currentUser) => {
        navigate(`/movie/${movieId}`, { state: { currentUser } });
    };


    return (
    <div id='screen-page'>
        <div className="home-container-search">
            <title>Catflix</title>
            <div className="row bg-white justify-content-center">
                <div className="moviesContainer">
                    <header>
                        <NavBar isAdmin={isAdmin} currentUser = {currentUser} logout={logout} />
                        
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => doSearch(e.target.value)}
                        />
                
                    </header>
                        <div class='slideshow-search'>
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

export default Search;