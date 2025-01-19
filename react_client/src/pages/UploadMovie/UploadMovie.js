import React, { useState } from 'react';
import SaveImage from '../components/SaveImage';  // Import the new component
import SaveMovie from '../components/SaveMovie';  // Import the new component
import NavBar from '../NavBar/NavBar';
import CategoryList from '../components/CategoryList';
import UploadCategory from '../components/UploadCategory/UploadCategory';
import { useNavigate } from 'react-router-dom';






const UploadMovie = ({logout}) => {
    const [name, setName] = useState('');
    const [director, setDirector] = useState('');
    const [actors, setActors] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [minimalAge, setMinimalAge] = useState('');
    const [catflixOriginal, setCatflixOriginal] = useState(false);
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');
    const navigate = useNavigate(); // Hook for navigation





    const [loading, setLoading] = useState(false);
    const [errorMessage, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        setError('');
        setLoading(true); // Show loading state
        if(!image)
        {
            setError("must have an image")
            return
        }
        if(!video)
        {
            setError("must have a video")
        }



        try {
            const response = await fetch('http://localhost:8080/api/movies', {
                method: 'POST',
                headers: {
                    'user': localStorage.getItem('Token'), 
                    'Content-Type': 'application/json',  // Set the correct content type header
                  },
                  body: JSON.stringify({ 
                    name,
                    category,
                    thumbnail:image,
                    pathToMovie: video,
                    director,actors,description,minimalAge,catflixOriginal,
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
            <NavBar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>name:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Director:</label>
                    <input
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Actors:</label>
                    <input
                        value={actors}
                        onChange={(e) => setActors(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Minimal Age:</label>
                    <input
                        value={minimalAge}
                        onChange={(e) => setMinimalAge(e.target.value)}
                        required
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
                    <CategoryList setCategory ={setCategory} logout={logout}/>
                </div>

                <div>
                    <button type='button' onClick={() => navigate('/uploadCategory')}>Add a new Category:</button>
                </div>

                <div>
                    <label>video:</label>
                    <SaveMovie setVideo ={setVideo}/>
                </div>
                <div>
                    <label>image:</label>
                    <SaveImage setImage ={setImage}/>
                </div>

                <button type="submit">Create Movie</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}

        </div>

    );
};



export default UploadMovie;
