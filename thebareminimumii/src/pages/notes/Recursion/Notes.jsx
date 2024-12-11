import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    Recursion: [
        { 
         id: 'Recursion-slide1', 
        title: 'Introduction to Recursion', 
         content: [
           'Recursion are the next step in learning programming.',
           { type: 'bullet', items: [
             'They build on the concepts of methods.',
            'They allow for more complex behaviors and structures.'
           ] },
          'This section will cover advanced usage of methods.'
      ]
    },
    { 
      id: 'Recursion-slide2', 
      title: 'Why Use Recursion?', 
      content: [
        { type: 'bullet', items: [
          'Improves code organization.',
          'Provides more control over function behavior.'
        ] },
        'Recursion give more power and flexibility in coding.',
        { type: 'bullet', items: [
          'Helps in breaking down complex problems.',
          'Ensures more readable and maintainable code.'
        ] }
      ]
    },
    // Add more slides as needed
  ],
};

const RecursionNotes = () => {
  const [currentSection, setCurrentSection] = useState('Recursion');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const navigate = useNavigate();

  const currentSlide = slides[currentSection][currentSlideIndex];
  const totalSlides = slides[currentSection].length;

  const isSectionCompleted = completedSections.includes(currentSection);

  const handleSlideCompletion = async () => {
    try {
      if (currentSlideIndex + 1 === totalSlides) {
        await axios.post('/mark-slide-completed', {
          slideId: currentSlide.id,
          sectionId: currentSection,
          isLastSlide: true,
        });
        alert('Section Completed!');
        setCompletedSections([...completedSections, 'currentSection']);
        navigate('/tbhHome');  // Redirect to the home page after completion
      } else {
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    } catch (error) {
      console.error("Error marking slide as completed", error);
    }
  };

  return (
    <div>
      <MainNav />
      <div>
        <h2>{currentSlide.title}</h2>
        <div>
          {currentSlide.content.map((item, index) => {
            if (typeof item === 'string') {
              return <p key={index}>{item}</p>;
            }
            if (item.type === 'bullet') {
              return (
                <ul key={index}>
                  {item.items.map((bulletItem, bulletIndex) => (
                    <li key={bulletIndex}>{bulletItem}</li>
                  ))}
                </ul>
              );
            }
            return null; // In case we have a different content type
          })}
        </div>
      </div>
      <div>
      {currentSlideIndex > 0 && (
          <button
            onClick={() => setCurrentSlideIndex(Math.max(currentSlideIndex - 1, 0))}
          >
            Previous Slide
          </button>
        )}

        {currentSlideIndex + 1 !== totalSlides ? (
        <button
          onClick={() => setCurrentSlideIndex(Math.min(currentSlideIndex + 1, totalSlides - 1))}  
        >
          Next Slide
        </button>
        ) : (
        <button
           onClick={handleSlideCompletion}  
         >
         Finish Section
        </button>
        )}
      </div>
    </div>
  );
};

export default RecursionNotes;
