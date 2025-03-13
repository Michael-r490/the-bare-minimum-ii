import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    SortAndSearch2: [
        { 
         id: 'SortAndSearch2-slide1', 
        title: 'Bubble Sort Algorithm', 
         content: [
           { type: 'bullet', items: [
            'BubbleSort is the simplest sorting algorithm',
            'Compare each item to its neighbour',
            'Swap these two values if they are not in the correct order',
            'So lets assume I want the smallest value at data[0] and the largest value at data[9]',
           ] },
      ]
    },
    
    { 
      id: 'SortAndSearch2-slide2', 
      title: 'Linear Search', 
      content: [
        { type: 'image', src: '/SaSn2p1.png', alt: 'Scanner Example' },
      ]
    },
    { 
        id: 'SortAndSearch2-slide3', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p2.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'SortAndSearch2-slide4', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p3.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'SortAndSearch2-slide5', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p4.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'SortAndSearch2-slide6', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p5.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'SortAndSearch2-slide7', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p6.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'SortAndSearch2-slide8', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p7.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'SortAndSearch2-slide9', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p8.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'SortAndSearch2-slide10', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p9.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'SortAndSearch2-slide11', 
        title: 'Linear Search', 
        content: [
          { type: 'image', src: '/SaSn2p10.png', alt: 'Scanner Example' },
        ]
    },
    { 
      id: 'SortAndSearch2-slide12', 
      title: 'Partial Code (The inner loop)', 
      content: [
        { type: 'code', items: [
`………
limit --; // reduce the limit by 1 (//starting with the last element)
for (int j = 0; j< limit; j++)
{
    // When the current number in the array
    // is greater than the next number, then
    // swap these numbers around
    if(values[j] > values[j+1]){       
        temp = values[j+1];
        values[j+1] = values[j];
        values[j] = temp;
    } 
}
`        
        ] },
      ]
    },
    { 
        id: 'SortAndSearch2-slide13', 
       title: 'Swapping Variables', 
        content: [
            'One fundamental activity we need to be able to do with arrays is sort them according to some value',
            'To do this, we need to be able to swap items between locations within the array',
            'Temporary storage wil be required to do this',
     ]
   },
   { 
    id: 'SortAndSearch2-slide12', 
    title: 'Complete BubbleSort Program', 
    content: [
      { type: 'code', items: [
`
public static void BubbleSort(int [] values)
{
        int limit = values.length;
        int temp = 0;
		 for (int i = 0; i < values.length; i++)
        {
            limit --; 
            for (int j = 0; j< limit; j++)
            {
				if(values[j] > values[j+1])
				{
                    		temp = values[j+1];
                    		values[j+1] = values[j];
                    		values[j] = temp;
                }
            
            } // end inner for loop
        } //end outer for loop
}
`        
      ] },
    ]
  },
  ],
};

const SortAndSearchNote2 = () => {
  const [currentSection, setCurrentSection] = useState('SortAndSearch2');
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

export default SortAndSearchNote2;
