import React, { useState } from 'react';
import './SlideShow.css';
import MovieItem from '../MovieItem/MovieItem';

function Slideshow({ movies, moviesPerSlide = 7 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group movies into slides based on `moviesPerSlide`
  const slides = [];
  for (let i = 0; i < movies.length; i += moviesPerSlide) {
    slides.push(movies.slice(i, i + moviesPerSlide));
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slideshow">
      <button className="prev" onClick={prevSlide}>
        &#8249;
      </button>
      <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            {slide.map((movie, idx) => (
              <MovieItem key={idx} {...movie} />
            ))}
          </div>
        ))}
      </div>
      <button className="next" onClick={nextSlide}>
        &#8250;
      </button>
    </div>
  );
}

export default Slideshow;
