import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ doSearch, showSearch, setShowSearch, isAdmin, logout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('Mode') === 'dark');
  const navigate = useNavigate();

  // Apply the initial theme based on localStorage
  useEffect(() => {
    const mode = localStorage.getItem('Mode') || 'dark'; // Default to dark
    document.querySelector('header')?.classList.add(mode);
  }, []);

  const toggleTheme = () => {
    const currentMode = localStorage.getItem('Mode');
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('Mode', newMode);
  
    // Apply the class to the root element (body)
    const root = document.body;
    root.classList.remove('dark', 'light'); // Remove existing theme classes
    root.classList.add(newMode); // Add the new theme class
  
    setIsDarkMode(newMode === 'dark'); // Update state for button text
  };
  

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
    <header className={isDarkMode ? 'dark' : 'light'}>
      <div className="bar-container">
        <nav>
          <div id="nav-logo">
            <a href="/">
              <img src="/assets/img/catflix-logo.png" alt="logo" />
            </a>
          </div>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          {isAdmin && (
            <div className="admin-dropdown">
              <button id="admin-button" onClick={toggleDropdown} className="dropdown-button">
                Admin
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/UploadMovie" className="admin-text">Upload Movie</Link>
                  <Link to="/UploadCategory" className="admin-text">Upload Category</Link>
                  <Link to="/UpdateCategory" className="admin-text">Update Category</Link>
                  <Link to="/DeleteCategory" className="admin-text">Delete Category</Link>
                </div>
              )}
            </div>
          )}
          <button id="search-button" className="buttons-container" onClick={handleSearchToggle}>
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
          <button onClick={toggleTheme} className="toggle-button">
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
          <button onClick={logout} id="logout-button" className="buttons-container">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;