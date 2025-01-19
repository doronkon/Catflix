import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../../SlideShow/SlidShow';


const CppRecommend = ({ currentUser }) => {
    const { id } = useParams(); // Get the movie ID from the URL
  const [recoMovies, setRecodMovies] = useState([]); // Store categories with movies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      console.log("111")
      try {
        const response = await fetch('http://localhost:8080/api/movies/'+id+'/recommend', {
          method: 'GET',
          headers: {
            user: localStorage.getItem('Token'),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log("printer start")
          console.log("response: "+response);
          console.log("printer end")
          setRecodMovies([]); // Store all categories and their movies
        }
        try{
        const data = await response.json();

        console.log("data: "+data)
        setRecodMovies(data); // Store all categories and their movies

        //Calculate a random movie from the flattened list of all promoted movies
      } catch (error)
      {
        console.log("333")
        setRecodMovies([]); // Store all categories and their movies
      }
      } catch (error) {
        console.log("222")
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

  if (loading) return <p>Loading...</p>;
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
