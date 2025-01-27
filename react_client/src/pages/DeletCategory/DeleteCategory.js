import CategoryList from '../components/CategoryList';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './DeleteCategory.css';

const DeleteCategory = ({ logout }) => {
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        if(!category)
        {
            setError("please choose a category")
            return;
        }
        setError(''); // Show loading state

        try {
            const response = await fetch('http://localhost:8080/api/categories/' + category, {
                method: 'DELETE',
                headers: {
                    user: localStorage.getItem('Token'),
                    'Content-Type': 'application/json', // Set the correct content type header
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
            // Additional logic after successful login can be added here
        } catch (error) {
            throw new Error('Server not running!');
        }
    };

    return (
        <div>
            <NavBar logout={logout} />
            <div className="delete-category-container">
                <form onSubmit={handleSubmit}>
                    <div className="delete-category-input-container">
                        <CategoryList setCategory={setCategory} logout={logout} />
                        <button id="delete-category-button" type="submit">
                            Delete Category
                        </button>
                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteCategory;