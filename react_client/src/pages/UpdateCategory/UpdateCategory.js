import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import NavBar from '../NavBar/NavBar';
import './UpdateCategory.css'

const UpdateCategory = ({logout}) => {
    const [name, setName] = useState('');
    const [promoted, setPromoted] = useState(false);
    const [category, setCategory] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        if(!category)
        {
            setError('Choose a category');
            return;
        }
        setError('');
        setLoading(true); // Show loading state



        try {
            const response = await fetch('http://localhost:8080/api/categories/'+category, {
                method: 'PATCH',
                headers: {
                    'user': localStorage.getItem('Token'), 
                    'Content-Type': 'application/json',  // Set the correct content type header
                  },
                  body: JSON.stringify({ 
                    name,
                    promoted,
                  }),
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

            const data = await response.json();
            console.log(data)


            // Additional logic after successful login can be added here
        } catch (error) {
            throw new Error("Server not running!")
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    if (loading) return <p>Loading...</p>;

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <NavBar logout={logout} />
                <div className="update-category-container">
                <div className="update-category-input-container">
                <CategoryList setCategory={setCategory} />
                    <label>Name:</label>
                    <br></br>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        required
                        />
                    <div className="input-group radio-group">
                        <div className="radio-options">
                            <label>Promoted:</label>
                            <input
                                type="radio"
                                name="Promoted"
                                value="true"
                                onChange={() => setPromoted(true)}
                                />
                            <label className="bool">True</label>
                            <input
                                type="radio"
                                name="Promoted"
                                value="false"
                                onChange={() => setPromoted(false)}
                                />
                            <label className="bool">False</label>
                        </div>
                    </div>
                    <button id="update-category-button" type="submit">Update Category</button>
                </div>
        </div>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
                                </div>
    );
};



export default UpdateCategory;
