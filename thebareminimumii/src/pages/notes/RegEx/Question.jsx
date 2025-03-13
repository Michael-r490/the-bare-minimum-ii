import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    RegExQ: [
    { 
      id: 'RegExQ-slide1', 
      title: 'Question for you', 
      content: [
        'Specify a RegEx for the following!',
        { type: 'bullet', items: [
            'NUIM course codes',
          ] },
        '-CS141, CS143, etc.',
        { type: 'bullet', items: [
            'A full Euro amount',
          ] },
        '-€50, €995, €65000',
        { type: 'bullet', items: [
            'Roman numerals (between I and VII)',
          ] },
        '-I, II, III, IV, V, VI, VII',
        { type: 'bullet', items: [
            'Any Roman numeral using the characters IVXCLM',
          ] },
        '-I, V, X, L, C, D, M',
      ]
    },
    {
        id: 'RegExQ-slide2',
        title: 'Question 2',
        content: [
          'More RegEx',
          { type: 'bullet', items: [
            'Accept the words Ireland and Iceland',
            'Accept only the words dart, dark, darf',
            'Accept the words ward, Ward, card, Card, lard, Lard',
            'Accept any word beginning with c, d, or l that is 4 letters long and has "ar" as the 2nd and 3rd letter',
            'Accept any sequence of 4 characters that has a digit in the first and last positions and letters everywhere else',
            'What does the regex `[vcr]at` accept?',
          ] },
        ]
    },
            
  ],
};

const RegExQuestion = () => {
  const [currentSection, setCurrentSection] = useState('RegExQ');
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
        setCompletedSections([...completedSections, currentSection]);
        navigate('/tbhHome');
      } else {
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    } catch (error) {
      console.error("Error marking slide as completed", error);
    }
  };

  const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
  return (
    <div>
      <MainNav />
      <div style={{ margin: '20px 0' }}>
      <div style={{ height: '10px', background: '#e0e0e0', borderRadius: '5px' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: '#4caf50', 
            borderRadius: '5px', 
            transition: 'width 0.3s ease-in-out' 
          }}
        />
      </div>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        {Math.round(progress)}% complete
      </p>
    </div>
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
      <div className="ButtonContainer">
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

export default RegExQuestion;
