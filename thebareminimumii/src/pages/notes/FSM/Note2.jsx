import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    FSMn2: [
        { 
         id: 'FSMn2-slide1', 
        title: 'Example FSM', 
         content: [
          'Let us start with an example of a controller for an elevator. ',
          'The conditions are: ',
           { type: 'bullet', items: [
            'The elevator can be at one of two floors: Ground floor or First floor.',
            'There is a button controlling the elevator, and it has two values: Up or Down.',
            'There are two lights in the elevator that indicate the currentfloor: Red for Ground, and Green for First.',
            'At each time step, the controller checks the current floor and current input, changes floors and lights if required.',
           ] },
      ]
    },
    { 
      id: 'FSMn2-slide2', 
      title: 'Example FSM', 
      content: [
        'All this information may be represented in a state diagram.',
        { type: 'image', src: '/FSMn2p1.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'FSMn2-slide3', 
      title: 'Example FSM', 
      content: [
        'If we represent Ground as 0 and First as 1, and Down as 0 and Up as 1 the transition table for this FSM is: ',
        { type: 'image', src: '/FSMn2p2.png', alt: 'Scanner Example' },
      ]
    },
    
  ],
};

const FSMNote2 = () => {
  const [currentSection, setCurrentSection] = useState('FSMn2');
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
            if (item.type === 'numbered') {
              return (
                <ol key={index}>
                  {item.items.map((numberedItem, numberedIndex) => (
                    <li key={numberedIndex}>{numberedItem}</li>
                  ))}
                </ol>
              );
            }
            if (item.type === 'image') {
              return (
                <img
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  style={{ maxWidth: '80%', height: 'auto' }}
                />
              );
            }
            if (item.type === 'code') 
              return <pre key={index}>{item.items.join('\n')}</pre>;
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

export default FSMNote2;
