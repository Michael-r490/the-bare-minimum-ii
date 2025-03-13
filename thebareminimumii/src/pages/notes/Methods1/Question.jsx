import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';
import API from '../../../api';

const slides = {
  methods1Q: [
    { 
      id: 'methods1Q-slide1', 
      title: 'Exam Style Question', 
      content: [
        'Write a Java Program that achieves the following: ',
        { type: 'numbered', items: [
          'Asks the user to enter a String representing a typical Irish 12-digit mobile phone number composed of 3 digit international code, 2 digit operator code, and seven digit number. For example 353874123122',

          'Checks that exactly 12 digits have been entered. The program should prompt the user to enter exactly 12 digits and not progress until they have done so. You may assume that once 12-digits are entered the phone number is valid.',

          'The program should print the 12 digit number, the international code, the operator code, the seven-digit number and the complete number formatted as shown in the last line of the example below. Example: '
        ] },
        'Enter a 12-digit Irish mobile phone number:',
        '353874123122',
        'You entered 353874123122',
        'The international code is 353',
        'The operator code is 87',
        'The number is 4123122',
        'The complete telephone number is (353) 87 4123122 '
      ]
    },
    {
        id: 'methods1-slide2',
        title: 'Example Answer',
        content: [
          { type: 'image', src: '/M1ExAns.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'methods1Q-slide3', 
        title: 'Question for you...', 
        content: [
          'Write a Java Program that asks the users to enter: ',
          { type: 'numbered', items: [
            'Name',
            'Address',
            'Date of Birth',
            'Wages',
            'Number of brothers and sisters'
          ] },
          'The program should print out the following with the values in { } replaced by the input. ',
          'Hi {Name}, ',
          'You live at {Address}',
          'Your date of birth is {Date of birth}',
          'You earn {wages}',
          'You have {Number of brothers and sisters} brothers and sisters'
        ]
      },
            
  ],
};

const M1Question = () => {
  const [currentSection, setCurrentSection] = useState('methods1Q');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const navigate = useNavigate();

  const currentSlide = slides[currentSection][currentSlideIndex];
  const totalSlides = slides[currentSection].length;

  const isSectionCompleted = completedSections.includes(currentSection);

  const handleSlideCompletion = async () => {
    try {
      if (currentSlideIndex + 1 === totalSlides) {
        await API.post('/mark-slide-completed', {
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

export default M1Question;
