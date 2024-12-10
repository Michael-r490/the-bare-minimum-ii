import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainNav from '../../../components/MainNav';
import axios from 'axios';

const Slide1 = () => (
  <div>
    <h2>Introduction to Methods</h2>
    <ul>
      <li>Methods are reusable blocks of code.</li>
      <li>They help in organizing code and improving readability.</li>
      <li>They can take parameters and return values.</li>
    </ul>
  </div>
);

const Slide2 = () => (
  <div>
    <h2>Why Use Methods?</h2>
    <ul>
      <li>Improves code reusability.</li>
      <li>Simplifies debugging and testing.</li>
      <li>Makes code easier to maintain.</li>
      <li>Promotes modular programming.</li>
    </ul>
  </div>
);

const Slide3 = () => (
  <div>
    <h2>Types of Methods</h2>
    <ul>
      <li>Instance methods: Associated with an instance of a class.</li>
      <li>Static methods: Associated with the class, not a specific instance.</li>
      <li>Abstract methods: Declared but not implemented in the parent class.</li>
    </ul>
  </div>
);

const Notes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentSlide = parseInt(location.pathname.split('/').pop().replace('slide', '')) || 1;
  const [slide, setSlide] = useState(currentSlide);

  const handleNextSlide = () => {
    if (slide < 3) {
      setSlide(slide + 1);
      navigate(`/notes/Methods1/slide${slide + 1}`);
    }
  };

  const handlePreviousSlide = () => {
    if (slide > 1) {
      setSlide(slide - 1);
      navigate(`/notes/Methods1/slide${slide - 1}`);
    }
  };

  const handleFinished = async () => {
    try {
      // Update the backend that the user has completed the notes
      const response = await axios.post('/user/completedSlide', { slideNumber: 3 });
      if (response.status === 200) {
        // Redirect to the home page after successful completion
        navigate('/tbhHome');
      }
    } catch (error) {
      console.error('Error marking slide as finished', error);
    }
  };

  useEffect(() => {
    setSlide(currentSlide);
  }, [location]);

  return (
    <div>
      <MainNav />
      <Routes>
        <Route path="/" element={<Slide1 />} />
        <Route path="slide1" element={<Slide1 />} />
        <Route path="slide2" element={<Slide2 />} />
        <Route path="slide3" element={<Slide3 />} />
      </Routes>
      <div className="navigation-buttons">
        <button onClick={handlePreviousSlide} disabled={slide === 1}>Previous Slide</button>
        <button onClick={handleNextSlide} disabled={slide === 3}>Next Slide</button>

        {slide === 3 && (
          <button onClick={handleFinished}>Finished</button>
        )}
      </div>
    </div>
  );
};

export default Notes;
