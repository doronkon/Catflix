import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './NavBar.css';
import '../Search/Search'

function NavBar({ doSearch, showSearch, setShowSearch, isAdmin, logout}) {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchToggle = () => {
        if (!showSearch) {
            setShowSearch(true);
            navigate('/search');
        } else {
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        doSearch(query);
    };

    return (
        <header>
            <div className="bar-container">
                <nav>
                <button onClick={logout}>logout</button>
                    <div id="nav-logo">
                        <a href="/">
                            <img src="/assets/img/catflix-logo.png" alt="logo" />
                        </a>
                    </div>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    {!isAdmin && <Link to ="/Admin">Admin</Link>}
                    <button className="search-button" onClick={handleSearchToggle}>
                        Search
                    </button>
                    {showSearch && (
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchInput}
                        />
                    )}
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
