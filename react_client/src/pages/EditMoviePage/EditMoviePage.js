import React, { useState } from 'react';
import SaveImage from '../components/SaveImage'; // Import the new component
import SaveMovie from '../components/SaveMovie'; // Import the new component
import NavBar from '../NavBar/NavBar';
import CategoryList from '../components/CategoryList';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './EditMoviePage.css'; // Use the same CSS file as UploadMovie

const EditMoviePage = ({ logout,isAdmin }) => {
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
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError('');
    setSuccessMessage(''); // Reset success message
    setLoading(true); // Show loading state

    try {
      const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
        method: 'PATCH',
        headers: {
          user: localStorage.getItem('Token'),
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

      setSuccessMessage('Edited successfully!');
    } catch (error) {
      setError('Server not running!');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="upload"> {/* Use the same CSS structure */}
      <NavBar logout={logout} isAdmin={isAdmin} />
      <form onSubmit={handleSubmit}>
        <div className="input-container" id="upload-input-container">
          <h2 className="upload-text">You are editing {oldName}</h2>
          <div className="input-group">
            <label className="upload-text">Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="upload-text">Director:</label>
            <input value={director} onChange={(e) => setDirector(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="upload-text">Actors:</label>
            <input value={actors} onChange={(e) => setActors(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="upload-text">Description:</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="upload-text">Minimal Age:</label>
            <input type="number" value={minimalAge} onChange={(e) => setMinimalAge(e.target.value)} required />
          </div>
          <div className="input-group radio-group">
            <label className="upload-text">Catflix Original:</label>
            <div className="radio-options">
              <label>
                <input type="radio" name="catflixOriginal" value="true" onChange={() => setCatflixOriginal(true)} />
                True
              </label>
              <label>
                <input type="radio" name="catflixOriginal" value="false" onChange={() => setCatflixOriginal(false)} />
                False
              </label>
            </div>
          </div>
          <div className="input-group">
            <label className="upload-text">Category:</label>
            <CategoryList setCategory={setCategory} logout={logout} />
          </div>
          <div>
            <button type="button" onClick={() => navigate('/uploadCategory')}>
              Add a new Category
            </button>
          </div>
          <div className="input-group file-group">
            <div>
              <label className="upload-text">Video:</label>
              <SaveMovie setVideo={setVideo} />
            </div>
            <div>
              <label className="upload-text">Image:</label>
              <SaveImage setImage={setImage} />
            </div>
          </div>
          <button type="submit">Edit Movie</button>
        </div>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default EditMoviePage;