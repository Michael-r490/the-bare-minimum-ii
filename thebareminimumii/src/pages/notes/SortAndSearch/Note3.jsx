import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';
import API from '../../../api';

const slides = {
    SortAndSearch3: [
    { 
         id: 'SortAndSearch3-slide1', 
        title: 'Binary Search', 
         content: [
           { type: 'bullet', items: [
            'From time to time you will have to search through items to look for a specific value.',
            'Binary search is a search algorithm designed to find a value in a sorted array',
            'It works by repeatedly dividing in half the portion of the list that could contain the item, until you have narrowed down the possible locations to just one',
            'With the linear search it could take up to n steps to find this specific value (n = array length). ',
            'With binary search however it can take considerably less time.',
            'With Binary search we can say how many steps it will take to find the item at most',
           ] },
      ]
    },
    { 
        id: 'SortAndSearch3-slide2', 
       title: 'Binary Search', 
        content: [
           'It’s always 2 to the power of something as we halve it (divide it in two).',
           'So how about between 1 and 20, how many steps will it take at most?',
           'If the array is SORTED, it should be possible to find it in 5 goes or less.',
           'Why? Because 2^5 = 32 and is above our upper boundary of  20',
           'In general the binary search will take a number of goes in the order of Log2N goes  or (O)Log2N  , to find the target value in a sorted array.',
           'when N = 20 elements , Log2N = 4.32',
           'when N = 100 elements , Log2N = 6.64',
           'when N = 1000 elements , Log2N = 9.96 approximately 10',
           'Where N is the number of things in the search space, for example, the number of elements in the sorted array that you are searching through for a target element',
           '(O) means the “order of” and it is also referred to as the big Oh notation. ',
     ]
   },
   { 
    id: 'SortAndSearch3-slide3', 
    title: 'Binary Search Code', 
    content: [
      { type: 'code', items: [
`
int array [] ={12,34,44,51,103,210,217,230,291,300,312,1024};

int target = 1024, high = array.length-1, low = 0, middle=0; 
boolean found = false;
while(low<=high&&!found) // loop while both conditions are true
    {
     middle= (high+low)/2;
     if(target < array[middle])// search in the lower half space
        {
             high = middle-1;
        }
    else if (target > array[middle])// search the higher half space
        {
            low = middle+1;
        }
    else 
        { // target is equal to the number in array[middle]
        System.out.println(target + " found at position " + middle); 
        found = true;
        }
    }
if(!found)
{
    System.out.println( target + " was not found in the list");
}

`        
      ] },
    ]
  },
     { 
     id: 'SortAndSearch3-slide4', 
     title: 'Binary Search', 
     content: [
            'Finding the Number',
            'Given the following declarations ',
            'int array [ ] = {12,34,44,51,103,210,217,230,291,300,312,1024}; ',
            'int target = 1024; // the number we are looking for ',
            'The initial value of variable high will be the index of the last element in the array: ',
            'high=11',
            'The initial value of variable low will be the first position of the array: ',
            'low =0',
            'The initial value of middle will be (high + low)/2: ',
            'middle=high+low/2',
            'middle=5',
     ]
    },
    { 
        id: 'SortAndSearch3-slide5', 
        title: 'Binary Search', 
        content: [
            'Finding the Number',
            'Is the value stored in target less than the value stored at array[middle]?',
            'No! 1024 is > 210, so what are the new values of high and low now? ',
            'low = middle+1 (i.e. 6), and high stays the same! ',
            'Let us look again. ',
            'high = 11',
            'low = 6',
            'middle = high + low /2',
            'middle = 8',
            'Is the value stored at target less than the value store at array[middle]?',
            'No! 1024 > 291, so what are the new values of high and low now?',
            'low = middle+1 (i.e. 9), and high stays the same!',
            
        ]
    },
    { 
        id: 'SortAndSearch3-slide6', 
        title: 'Binary Search', 
        content: [
           'Finding the Number',
            'Let us look again.',
            'high = 11',
            'low = 9',
            'middle = high + low /2',
            'middle = 10',
            'Is the value stored at target less than the value stored at array[middle]?',
            'No! 1024 > 312, so what are the new values of high and low now?',
            'low = middle+1 (i.e. 11), and high stays the same!',
            'Let us look again.',
            'high = 11',
            'low = 11',
            'middle = high + low /2',
            'middle = 11',
            'Is the value stored at target less that the value stored at array[middle]?',
            'No! 1024 == 1024',
            'The values are equal. Therefore, we’ve found it.',

            
        ]
    },
  ],
};

const SortAndSearchNote3 = () => {
  const [currentSection, setCurrentSection] = useState('SortAndSearch3');
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
        setCompletedSections([...completedSections, 'currentSection']);
        navigate('/tbhHome');  // Redirect to the home page after completion
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

export default SortAndSearchNote3;
