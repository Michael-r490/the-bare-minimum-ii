import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    TuringMachine2: [
    { 
         id: 'TuringMachine2-slide1', 
        title: 'An example Turing Machine', 
         content: [
          'Describe a Turing Machine named M1 that multiplies an integer number by 10.',
          'If the input on the tape is:',
          { type: 'image', src: '/TMn2p1.png', alt: 'Scanner Example' },
          'The output should be: ',
          { type: 'image', src: '/TMn2p2.png', alt: 'Scanner Example' },
          'The alphabet of this TM is: Γ = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, Δ} where Δ is the empty symbol.',
          'The input alphabet (what the TM can write on the tape) is: Σ = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}. ',
      ]
    },
    { 
      id: 'TuringMachine2-slide1', 
     title: 'An example Turing Machine', 
      content: [
       'The instruction table for this TM might be: ',
       { type: 'image', src: '/TMn2p3.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'TuringMachine2-slide1', 
     title: 'An example Turing Machine', 
      content: [
        'q0 is the starting state for this TM.',
        'We will stay in this state reading symbols and moving right until we come across the first empty symbol Δ.',
        'Once we encounter this, we want to change this Δ symbol to a 0 to represent multiplying the number by 10',
        'We move to state q1 which is the accepting state for this TM and halt (represented by the movement S (Stop)). ',
        'The graphical representation of this TM is: ',
        
       { type: 'image', src: '/TMn2p4.png', alt: 'Scanner Example' },
      ]
    },
    
  ],
};

const TuringMachineNote2 = () => {
  const [currentSection, setCurrentSection] = useState('TuringMachine2');
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

export default TuringMachineNote2;
