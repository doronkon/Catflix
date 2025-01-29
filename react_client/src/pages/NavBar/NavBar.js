import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isAdmin, logout }) {
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('Mode') === 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            user: localStorage.getItem('Token'),
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const mode = localStorage.getItem('Mode') || 'dark';
    document.querySelector('header')?.classList.add(mode);
  }, []);

  const toggleTheme = () => {
    const currentMode = localStorage.getItem('Mode');
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('Mode', newMode);

    document.body.classList.remove('dark', 'light');
    document.body.classList.add(newMode);

    setIsDarkMode(newMode === 'dark');
  };

  const toggleAdminDropdown = () => {
    setShowAdminDropdown((prev) => !prev);
    setShowCategoriesDropdown(false);
  };

  const toggleCategoriesDropdown = () => {
    setShowCategoriesDropdown((prev) => !prev);
    setShowAdminDropdown(false);
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

          {/* Categories Dropdown */}
          <div className="admin-dropdown">
            <button id="admin-button" className="dropdown-button" onClick={toggleCategoriesDropdown}>
              Categories
            </button>
            {showCategoriesDropdown && (
              <div className="dropdown-menu">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category._id}
                      to={`/category/${category._id}`}
                      state={{ categoryName: category.name }}
                      className="category-item"
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <p className="category-item">No categories available</p>
                )}
              </div>
            )}
          </div>

          {!isAdmin && (
            <div className="admin-dropdown">
              <button id="admin-button" onClick={toggleAdminDropdown} className="dropdown-button">
                Admin
              </button>
              {showAdminDropdown && (
                <div className="dropdown-menu">
                  <Link to="/UploadMovie" className="admin-text">Upload Movie</Link>
                  <Link to="/UploadCategory" className="admin-text">Upload Category</Link>
                  <Link to="/UpdateCategory" className="admin-text">Update Category</Link>
                  <Link to="/DeleteCategory" className="admin-text">Delete Category</Link>
                </div>
              )}
            </div>
          )}

          <Link to="/search">Search</Link>
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
