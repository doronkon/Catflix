import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import CppRecommend from '../components/CppRecommend/CppRecommend';
import DeleteMovie from '../components/DeleteMovie/DeleteMovie';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';






const MovieDetail = ({currentUser,isAdmin,logout}) => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  

  // Fetching movie details
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            user: localStorage.getItem('Token'),
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            logout();
            return
          }
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data); // Set the fetched movie data in the state
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  // Fetching category details after movie is loaded
  useEffect(() => {
    if (movie && movie.category) {
      const fetchCategoryDetail = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/categories/${movie.category}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              user: localStorage.getItem('Token'),
            },
          });

          if (!response.ok) {
            if (response.status === 403) {
              logout();
              return
            }
            throw new Error('Failed to fetch category details');
          }

          const data = await response.json();
          setCategory(data); // Set the fetched category data in the state
        } catch (error) {
          console.error(error);
        }
      };

      fetchCategoryDetail();
    }
  }, [movie]); // Dependency on `movie`

  if (!movie) {
    return <p>Loading...</p>;
  }
  const handleEditClick = (movieId, oldName) => {
    navigate(`/editMovie/${movieId}`, { state: { oldName } });
  };

  return (
    <div className="movie-detail">
      <NavBar isAdmin={isAdmin} logout={logout}/>
      <h1>{movie.name}</h1>
      <VideoPlayer logout={logout} />
      <img src={`http://localhost:8080/media/movieThumbnails/${movie.thumbnail}`} alt={movie.name} />
      <p>{movie.description}</p>
      <p>Category: {category ? category.name : 'Loading category...'}</p>
      <p>Director: {movie.director}</p>
      <p>Actors: {movie.actors}</p>
      <p>Duration: {movie.length} mins</p>
      <p>Minimal age: {movie.minimalAge}</p>
      <CppRecommend logout={logout} currentUser={currentUser}/>
      {!isAdmin && <DeleteMovie logout={logout}/>}
      {!isAdmin && (
        <button onClick={() => handleEditClick(movie._id, movie.name)}>
          Edit Movie
        </button>
      )}
    </div>
  );
};

export default MovieDetail;
