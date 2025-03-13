import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';
import API from '../../../api';

const slides = {
    Recursionn4: [
        { 
         id: 'Recursionn4-slide1', 
        title: 'Recursion Examples 2', 
         content: [
      ]
    },
    { 
      id: 'Recursionn4-slide2', 
      title: 'Recursion: Fibonacci Numbers', 
      content: [
        'Fibonacci Numbers',
        {type:'bullet', items:[
          'Another example of where we can use a recursive function is calculating the Fibonacci numbers. ',
          'The Fibonacci numbers are 0, 1, 1, 2, 3, 5, 8, 13, 21..',
          'Fibonacci sequence, every number after the first two is the sum of the two preceding ones:',
          'The following equation is a mathematical description of the Fibonacci Numbers: ',
        ]},
        { type: 'image', src: '/Recursionn4p1.png', alt: 'Scanner Example' },
        ],
    },
    { 
      id: 'Recursionn4-slide3', 
      title: 'Recursion: Fibonacci Numbers', 
      content: [
        'Iterative Fibonacci Numbers',
        'If we look at the Fibonacci Numbers from an iterative perspective, the algorithm may look something like the following: ',
        {type:'bullet', items:[
          'To calculate any Fibonacci Number “n” we need to know the Fibonacci Number “n – 1” and the Fibonacci Number “n – 2”.',
          'For our iterative version we start at the 1st number (n = 0).',
          'So if we are looking for the 5th Fibonacci Number – we start off by looking at 0th and 1st Fibonacci numbers and adding them together to get the next. ',
          'We then look at the 1st and 2nd Fibonacci numbers and then 2nd and 3rd etc.... ',
        ]},
        {type: 'code', items:[`
    public static int iterativeFibonacci(int n)
    {
        int prev1 = 0;
        int savePrev2 = 1;
        for(int i = 0; i < n; i++)
        {
            savePrev1 = prev1;
            prev1 = prev2;
            prev2 = savePrev1 + prev2;
        }
        return prev1;
    } 
        `,
          ]
        },
    ],
    },
    { 
      id: 'Recursionn4-slide4', 
      title: 'Recursion: Fibonacci Numbers', 
      content: [
        'Recursive Fibonacci',
        'Remember to get a  Fibonacci Number n we must add the 2nd and the 1st  numbers together.',
        'We can write a Recursive program to follow to general foramula',
        { type: 'image', src: '/Recursionn4p1.png', alt: 'Scanner Example' },

        {type: 'code', items:[`
    public static int recursiveFibonacci(int n)
      {
          if(n == 1)
          {
              return 0;
          }
          else if(n == 1)
          {
              return 1;
          }
          else
          {
              return recursiveFibonacci(n - 1) + recursiveFibonacci(n -2);
          }
      } 
`,
        ]
        },

        ],
    },
    { 
      id: 'Recursionn4-slide5', 
      title: 'Recursion: Functional Definitions', 
      content: [
        'Very often we are given problems which are formulated as recursive function definitions – just like we have seen with the Fibonacci sequence.',
        'They can represent some other pattern or sequence in a scientific situation, scientific problem or environmental situation. ',
        'The definition of the problem is usually written mathematically.',
        'One such example is: ',
        { type: 'image', src: '/Recursionn4p2.png', alt: 'Scanner Example' },
        'To calculate the values of a(n) where n=4 ',
        {type: 'code', items:[`
    a1 = 4
    a2 = 5a1 +10              =5(4)+10            =30
    a3 = 5a2 +10              =5(30)+10           =160
    a4 = 5a3 +10              =5(160)+10          =810
        `]},
        ],
    },
    { 
      id: 'Recursionn4-slide6', 
      title: 'Recursion: Functional Definitions', 
      content: [
        'Function Iteratively',
        {type: 'code', items:[`public static int funcIt(int n)
    {
          int baseCase = 4;

          int current = baseCase;
          int runningTotal = current;

          for(int i = 2; i <=n; i++)
          {
                runningTotal = 5 * current + 10;
                current = runningTotal;
          }
                return runningTotal;
    }
    `]},

        'Function Recursively',
        {type: 'code', items:[`public static int funcRec(int n)
    {
          if(n == 1)
          {
                return 4;
          }
          else
          {
                return 5 * funcRec(n-1) +10;
          }
    }`]},
        ],
    },
]
};

const RecursionNote4 = () => {
  const [currentSection, setCurrentSection] = useState('Recursionn4');
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
                  style={{ maxWidth: '70%', height: 'auto' }}
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

export default RecursionNote4;
