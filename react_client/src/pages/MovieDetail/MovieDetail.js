import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import CppRecommend from '../components/CppRecommend/CppRecommend';
import DeleteMovie from '../components/DeleteMovie/DeleteMovie';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

const MovieDetail = ({ currentUser, isAdmin, logout }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [category, setCategory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

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
            return;
          }
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetail();
  }, [id]);

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
              return;
            }
            throw new Error('Failed to fetch category details');
          }

          const data = await response.json();
          setCategory(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCategoryDetail();
    }
  }, [movie]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const handleEditClick = (movieId, oldName) => {
    navigate(`/editMovie/${movieId}`, { state: { oldName } });
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="movie-detail">
      <header>
        <NavBar currentUser={currentUser} isAdmin={isAdmin} logout={logout} />
      </header>
      <h1 id='movie-name'>{movie.name}</h1>
      {!isPlaying && (
        <img
          src={`http://localhost:8080/media/movieThumbnails/${movie.thumbnail}`}
          alt={movie.name}
          className="movie-thumbnail"
        />
      )}
      <VideoPlayer logout={logout} onPlay={handlePlay} />
      <div class='info-container'>
        <div class='paragraphs'>
          <p>Description: {movie.description}</p>
          <p>Category: {category ? category.name : 'Loading category...'}</p>
          <p>Director: {movie.director}</p>
          <p>Actors: {movie.actors}</p>
          <p>Duration: {movie.length} mins</p>
          <p>Minimal age: {movie.minimalAge}</p>
        </div>
      </div>
      <CppRecommend logout={logout} currentUser={currentUser} />
    </div>
  );
};

export default MovieDetail;