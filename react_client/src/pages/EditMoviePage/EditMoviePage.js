import React, { useState } from 'react';
import SaveImage from '../components/SaveImage';  // Import the new component
import SaveMovie from '../components/SaveMovie';  // Import the new component
import NavBar from '../NavBar/NavBar';
import CategoryList from '../components/CategoryList';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const EditMoviePage = ({ logout }) => {
    const { id } = useParams(); // Get the movie ID from the URL
    const location = useLocation();
    const { oldName } = location.state || {};
    const [name, setName] = useState('');
    const [director, setDirector] = useState('');
    const [actors, setActors] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [minimalAge, setMinimalAge] = useState('');
    const [catflixOriginal, setCatflixOriginal] = useState(null);
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // For success popup

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError('');
        setSuccessMessage(''); // Reset success message
        setLoading(true); // Show loading state

        try {
            const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
                method: 'PATCH',
                headers: {
                    'user': localStorage.getItem('Token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    category,
                    thumbnail: image,
                    pathToMovie: video,
                    director,
                    actors,
                    description,
                    minimalAge,
                    catflixOriginal,
                }),
            });

            if (!response.ok) {
                if (response.status === 403) {
                    logout();
                    return;
                }
                const errorResponse = await response.json();
                setError(errorResponse.errors);
                return;
            }

            const data = await response.json();
            console.log(data);

            // Show success message
            setSuccessMessage('Edited successfully!');
        } catch (error) {
            setError('Server not running!');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <NavBar logout={logout} />
            <h2>You are editing {oldName}</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div>
                    <label>name:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Director:</label>
                    <input
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </div>
                <div>
                    <label>Actors:</label>
                    <input
                        value={actors}
                        onChange={(e) => setActors(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Minimal Age:</label>
                    <input
                        value={minimalAge}
                        onChange={(e) => setMinimalAge(e.target.value)}
                    />
                </div>
                <div>
                    <label>Catflix Original:</label>
                    <input
                        type="radio"
                        name="catflixOriginal"
                        value="true"
                        onChange={() => setCatflixOriginal(true)}
                    />
                    <label>True</label>
                    <input
                        type="radio"
                        name="catflixOriginal"
                        value="false"
                        onChange={() => setCatflixOriginal(false)}
                    />
                    <label>False</label>
                </div>
                <div>
                    <label>Select from existing Categories:</label>
                    <CategoryList setCategory={setCategory} logout={logout} />
                </div>
                <div>
                    <button type="button" onClick={() => navigate('/uploadCategory')}>Add a new Category:</button>
                </div>
                <div>
                    <label>video:</label>
                    <SaveMovie setVideo={setVideo} />
                </div>
                <div>
                    <label>image:</label>
                    <SaveImage setImage={setImage} />
                </div>

                <button type="submit">Edit Movie</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
        </div>
    );
};

export default EditMoviePage;