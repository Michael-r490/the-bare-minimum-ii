import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    Recursionn3: [
        { 
         id: 'Recursionn3-slide1', 
        title: 'Recursion Examples', 
         content: [
      ]
    },
    { 
      id: 'Recursionn3-slide2', 
      title: 'Recursion: Factorial', 
      content: [
        'Factorial(n) - The Iterative Way',
        {type: 'code', items:[`
`]},
        'Do you recall the iterative method to get the factorial of a number? ',
        {type: 'code', items:[`
`]},
        'The method took a positive integer value n and multiplied all the numbers from 1 to n together.',
        {type: 'code', items:[`
`]},
        'By definition, the factorial of zero equals 1.',
        {type: 'bullet', items: [
            'When n = 0, iterativeFactorial(0) = 1',
            'When n = 1, iterativeFactorial(0) = 1',
            'When n = 2, iterativeFactorial(0) = 2 * 1',
            'When n = 3, iterativeFactorial(0) = 3 * 2 * 1',
        ]},
        'etc...',
        {type: 'code', items:[`
    public static int iterativeFactorial(int n)
    {
        int product = 1;
        for(int j = 1; j < n; j++)
        {
            product = product * j;
        }
        return product;
    }
        `]},
      ]
    },
    { 
        id: 'Recursionn3-slide3', 
        title: 'Recursion: Factorial', 
        content: [
          'Factorial(n) - The Recursive Way',
          {type: 'code', items:[`
`]},
          'In order to implement Factorial(n) recursively we need to do two things: ',
          {type: 'numbered', items:[
           'Determine the base case(s) – when should the method not call itself.',
           'Determine the reduction (recursive) step.',  
          ]},
          {type: 'code', items:[`
`]},
          'Let us first determine the base case(s).',
          'For factorial there are two base cases. By definition 0! and 1! are both equal to 1 and these will be our base cases. ',
          {type: 'code', items:[`
      public static int recursiveFactorial(int n)
      {
          //Base Case
          if(n <=n)
          {
              return 1;
          }
      }
 `]},
        ]
      },
      { 
        id: 'Recursionn3-slide4', 
        title: 'Recursion: Factorial', 
        content: [
            'Once the base cases are determined we need to determine the reduction (recursive) step.  To help with this let us look at a few examples of factorial. ',
            {type: 'bullet', items:[
                
            'o 2! = 2 * 1. ',
            'o 3! = 3 * 2 * 1 or 3 * 2! ',
            'o 4! = 4 * 3* 2 * 1 or 4 * 3! ',
            'o 5! = 5*4*3*2*1 or 5*4!   //See that it is  n*(n-1)! which is  (5) * (5-1)!',
            ]},
            'A pattern emerges, namely, n! = n * (n - 1)! This pattern will help to code the recursive steps of the factorial program. ',
            {type: 'code', items:[`
        public static int recursiveFactorial(int n)
        {
            //Base Case
            if(n <=n)
            {
                return 1;
            }
            else
            {
                return (n * recursiveFactorial(n - 1));
            }
        }
 `]},
        ]
      },
      { 
        id: 'Recursionn3-slide5', 
        title: 'Recursion: Factorial', 
        content: [
            'Stacks and Recursive Factorial  in Action',
            { type: 'image', src: '/Recursionn3p1.png', alt: 'Scanner Example' }
        ]
      },
      { 
        id: 'Recursionn3-slide6', 
        title: 'Recursion: Factorial', 
        content: [
            'Stacks and Recursive Factorial  in Action',
            { type: 'image', src: '/Recursionn3p2.png', alt: 'Scanner Example' }
        ]
      },
      { 
        id: 'Recursionn3-slide7', 
        title: 'Recursion: Factorial', 
        content: [
            'Stacks and Recursive Factorial  in Action',
            { type: 'image', src: '/Recursionn3p3.png', alt: 'Scanner Example' }
        ]
      },
      { 
        id: 'Recursionn3-slide8', 
        title: 'Recursion: Triangular Numbers', 
        content: [
            'The concept of Triangular Numbers is shown below in the figure. The first triangular number is 1, the second is 3, the 3rd is 6 and so on…',
            { type: 'image', src: '/Recursionn3p4.png', alt: 'Scanner Example' },
            'Tri(1)=1',
            'Tri(2)=1 + 2',
            'Tri(3)=1 + 2 + 3',
            'etc..',
            {type: 'code', items:[`
`]},
            'Triangular Number Iteratively',
            'Initially let us begin by looking at an iterative method of computing',
            {type: 'code', items:[`public static int triangular(int n)
        {
                int triSum = 0;
                for(int i = 1; i <= n; i++)
                {
                    triSum = i + triSum;
                }
                return triSum;
        }`
    ]},
        ]
      },
      { 
        id: 'Recursionn3-slide9', 
        title: 'Recursion: Triangular Numbers', 
        content: [
            {type: 'bullet', items: [
                'With Triangular Numbers we are just adding numbers up!',
                'The 5th (n = 5) triangular number is just 1 + 2 + 3 + 4 + 5.',
                'If we calculate it using the formula below we can confirm that T(5) = (5*(5+1)) / 2 = (5 * 6) / 2 = 15. ',
            ]},
            { type: 'image', src: '/Recursionn3p5.png', alt: 'Scanner Example' },
            {type: 'bullet', items: [
                'Firstly we need to determine the base case(s) for triangular numbers.',
                'The first triangular number T(1) = 1. This will be our base case. ',
                'Once the base cases are determined we need to determine the reduction (recursive) step. ',
                'To help with this let us look at a few examples of triangular numbers. ',
            ]},
            'T(2) = T(1) + 2.  ',
            'T(3) = T(2) + 3.  ',
            'T(4) = T(3) + 4.  ',
            'T(5) = T(4) + 5.  ',
            '//T(n) = T(n-1) + n',
            'A pattern emerges, namely, T(n) = T(n – 1) + n. This pattern will help to code the recursive steps of the triangular numbers program. ',
        ]
      },
      { 
        id: 'Recursionn3-slide10', 
        title: 'Recursion: Triangular Numbers', 
        content: [
            {type: 'code', items:[`public static int triangularRecursions(int n)
        {
                if(n ==1)
                {
                    return 1;
                }
                else
                {
                 return (triangularRecursions(n-1) + n);
                }
        } `,
        ]
      },
      { type: 'image', src: '/Recursionn3p6.png', alt: 'Scanner Example' }
    ]
    },
]
};

const RecursionNote3 = () => {
  const [currentSection, setCurrentSection] = useState('Recursionn3');
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

export default RecursionNote3;
