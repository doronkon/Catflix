import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './NavBar.css';
import '../Search/Search'

function NavBar({ doSearch, showSearch, setShowSearch, isAdmin, logout}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
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

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState);
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
                    <div id="nav-logo">
                        <a href="/">
                            <img src="/assets/img/catflix-logo.png" alt="logo" />
                        </a>
                    </div>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    {(
                        <div className="admin-dropdown">
                            <button id='admin-button' onClick={toggleDropdown} className="dropdown-button">
                            Admin
                            </button>
                            {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/UploadMovie" class='admin-text'>Upload Movie</Link>
                                <Link to="/UploadCategory" class='admin-text'>Upload Category</Link>
                                <Link to="/UpdateCategory"class='admin-text'>Update Category</Link>
                                <Link to="/DeleteCategory" class='admin-text'>Delete Category</Link>
                            </div>
                            )}
                        </div>
                        )}
                    <button id='search-button' class='buttons-container' onClick={handleSearchToggle}>
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
                    <button onClick={logout} id='logout-button' class='buttons-container'>logout</button>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
