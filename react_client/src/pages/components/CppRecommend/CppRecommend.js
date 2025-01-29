import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../../SlideShow/SlidShow';
import Loading from '../Loading';


const CppRecommend = ({ currentUser,logout }) => {
    const { id } = useParams(); // Get the movie ID from the URL
  const [recoMovies, setRecodMovies] = useState([]); // Store categories with movies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies/'+id+'/recommend', {
          method: 'GET',
          headers: {
            user: localStorage.getItem('Token'),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            logout();
            return
          }
          setRecodMovies([]); // Store all categories and their movies
        }
        try{
        const data = await response.json();

        console.log("data: "+data)
        setRecodMovies(data); // Store all categories and their movies

        //Calculate a random movie from the flattened list of all promoted movies
      } catch (error)
      {
        setRecodMovies([]); // Store all categories and their movies
      }
      } catch (error) {
        setRecodMovies([]); // Store all categories and their movies
        throw new Error("Server not running!")

        //setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  const handleMovieClick = (movieId, currentUser) => {
    navigate(`/movie/${movieId}`, { state: { currentUser } });
  };

  if (loading) return <Loading/>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="moviesContainer">
      <header>      </header>


      {/* Slideshow for each category in promotedMovies */}
          <div className="movieRow_posters">
            <Slideshow
              currentUser={currentUser}
              movies={recoMovies}
              onMovieClick={handleMovieClick}
            />
          </div>

      <footer>
        <p>&copy; 2025 Catflix, Inc. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default CppRecommend;
