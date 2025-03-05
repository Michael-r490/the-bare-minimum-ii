import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    SortAndSearch: [
        { 
         id: 'SortAndSearch-slide1', 
        title: 'Importance of a programing repertoire', 
         content: [
           { type: 'bullet', items: [
            'In general it is a good problem solving strategy to have a repertoire of fundamental or simple algorithms',
            'These algorithms can then be combined (as building blocks) or adapted to solve larger more complex problems',
            'Array processing is similar to other programming problem domains in that complicated problems can be decomposed into simpler fundamental algorithms',
            'In this lesson we explore an number of common “simple” algorithms for manipulating data in a one dimensional array',
           ] },
      ]
    },
    { 
      id: 'SortAndSearch-slide2', 
      title: 'Array Processing', 
      content: [
        { type: 'code', items: [
          'double[] data= {12,223,232,666,1433,0,-34,14,43,554}; ',
        ] },
        'How do we Find the smallest number in an array?',
        { type: 'bullet', items: [
          'How do we find the smallest value?',
          'What is the difference between that and finding the location (index) of the smallest value?',
          'How do we find the index/location of the smallest value within the array?',
        ] }
      ]
    },
    { 
      id: 'SortAndSearch-slide3', 
      title: 'Finding the smallest', 
      content: [
          'A common problem is to find the smallest value in an array',
          'We want to find the smallest value and its location within the array',
          '“Linear Search” checks the entire array',
          'Algorithm:',
          { type: 'bullet', items: [
            'Assume that the smallest value is at the start of the array (record its value and location)',
            'smallestValue & indexOfSmallest',
            'See if we can find a smaller value',
            'We keep a note of the current value (index location) we think has the smallest value, until we check the entire array',
          ] }
      ]
    },
    { 
      id: 'SortAndSearch-slide4', 
      title: 'Linear Search', 
      content: [
          'A common problem is to find the smallest value in an array',
          'We want to find the smallest value and its location within the array',
          '“Linear Search” checks the entire array',
          'Algorithm:',
          { type: 'bullet', items: [
            'Assume that the smallest value is at the start of the array (record its value and location)',
            'smallestValue & indexOfSmallest',
            'See if we can find a smaller value',
            'We keep a note of the current value (index location) we think has the smallest value, until we check the entire array',
          ] }
      ]
    },
    { 
      id: 'SortAndSearch-slide5', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p1.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide6', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p2.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide7', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p3.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide8', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p4.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide9', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p5.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide10', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p6.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide11', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p7.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide12', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p8.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide13', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p9.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide14', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p10.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide15', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn1p11.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'SortAndSearch-slide16', 
      title: 'Linear Search', 
      content: [
        'Linear search is fine for small arrays, but on an array containing a 1000,000 items, it would take 1000,000 tests',
        'In terms of computation complexity, linear search takes O(n) time or the order of time linearly related to the number of elements',
        'We would often keep arrays in sorted order',
      ]
    },
    { 
      id: 'SortAndSearch-slide17', 
      title: 'Example Algorithm', 
      content: [
        'Find the Smallest element in an array ~',
        { type: 'code', items: [
`
double[] data = {12,223,232,666,1433,0,-34,14,43,554};

double smallestValue = data[0];

for(int i = 1; i < smallestValue)
    if (data[i] < smallestValue)
    (
        smallestValue = data[i];
    )

System.out.println("The smallest value in the array is " + smallestValue);    

`
          
        ] },
      ]
    },
  ],
};

const SortAndSearchNotes = () => {
  const [currentSection, setCurrentSection] = useState('SortAndSearch');
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

export default SortAndSearchNotes;
