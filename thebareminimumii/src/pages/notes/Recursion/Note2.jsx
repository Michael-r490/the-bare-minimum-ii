import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    Recursionn2: [
        { 
         id: 'Recursionn2-slide1', 
        title: 'Recursion', 
         content: [
            { type: 'bullet', items: [
            'In computer science, some problems are more easily solved by using recursive functions.',
            'If you go on to take a computer science algorithms course, you will see lots of examples of this.',
            'For example:',
            ] },
            '-Traversing through a directory or file system.',
            '-Traversing through a tree of search results',
            { type: 'bullet', items: [
                'For this session, we will focus on the basic structure of using recursive methods.',
            ] },
      ]
    },
    { 
      id: 'Recursionn2-slide2', 
      title: 'Two Types of Recursion', 
      content: [
        { type: 'bullet', items: [
            'Direct recursion: a method contains a reference or call to itself directly (like in the printStars() example) ',
            'Indirect Recursion a method calls another method thatc eventually calls the original method e.g. method_a() calls method_b() and then method_b() calls method_a(). ',
        ] }
      ]
    },
    { 
        id: 'Recursionn2-slide3', 
        title: 'How Recursion works?', 
        content: [
          { type: 'bullet', items: [
              'A recursive computation solves a problem by using the solution of the same problem, but with simpler values. We call this the recursive step.',
              'Indirect Recursion a method calls another method thatc eventually calls the original method e.g. method_a() calls method_b() and then method_b() calls method_a(). ',
              'The base case is the case in which the method value is specified for one or more known values of the input parameters.',
              'A recursive step (or inductive step) is the step in which the action to be taken for the current value of the parameter is defined in terms of previously defined values. ',
              'In order to perform recursion we have to consider the following two perspectives:'
          ] },
          { type: 'numbered', items: [
            'How can the simplest instance of the problem besolved? (Base case)',
            'Given a more complicated instance of the problem, how can it be made more like the simplest instance? i.e. how can it be brought closer to the simplest instance of the problem (make it like the base case)?',
        ] }
        ]
    },
    { 
        id: 'Recursionn2-slide4', 
        title: 'Testing for a Palindrome with Recursion', 
        content: [
              'A palindrome is a string of text that is the same read forwards or backwards.',
              'Another way to think of it is as a string whose first half is a mirror image of its second half.',
              'Examples of palindromes: DEED, NAVAN.',
              'Recursive Approach to Testing for a Palindrome:',
          {type: 'code', items:[`
            `]},
          'Three Steps to Recursive Success:',
          '1. Reduction - making the problem smaller:',
          {type: 'bullet', items: [
              'Check if the first and last characters are the same.',
              'Remove the first and last characters if they are the same.',
              'Repeat the process with the remaining substring.',
          ]},
          {type: 'code', items:[`
          `]},
          '2. Base case: If the string is empty or has only one character, it is a palindrome.',
          
          {type: 'code', items:[`
`]},
          '3. Recursive step: The word is a palindrome if:',
          {type: 'bullet', items:[
            'The first and last characters are the same, and',
            'The substring obtained by removing these characters is also a palindrome.',
          ]},
            {type: 'code', items:[`
`]},
              
        ]
    },
    { 
        id: 'Recursionn2-slide5', 
        title: 'Palindrome Recursive Example', 
        content: [
          { type: 'bullet', items: [
              'Let us look at an example using the string: “AVAJ261SCCS162JAVA”',
              'Using the technique described above let us start by comparing the first and the last character. ',
              'We can see that the first character at position 0 of the string is “A” and the last character at position 17 is “A”.',
          ] },
          { type: 'image', src: '/Recursionn2p1.png', alt: 'Scanner Example' },
          { type: 'bullet', items: [
            'As these characters are the same we can remove them from our string.',
            'We now repeat the process of comparing the first and the last characters.',
            'This time we are comparing the characters at position 0 and position 15 of our new string.',
            'Both of these positions contain the character “V”',
        ] }
        ]
    },  
    { 
        id: 'Recursionn2-slide6', 
        title: 'Palindrome Recursive Example', 
        content: [
          { type: 'bullet', items: [
              'We keep repeating this pattern of checking the first and last character of the string and if they are equal, we remove them from our string, as the string is a potential palindrome.',
          ] },
          { type: 'image', src: '/Recursionn2p2.png', alt: 'Scanner Example' },
          { type: 'bullet', items: [
            'An intermediate step in our string reduction and the final string to check are:',
        ] },
        { type: 'image', src: '/Recursionn2p3.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'Recursionn2-slide7', 
        title: 'Palindrome Recursive Example', 
        content: [
          { type: 'bullet', items: [
              'We can see that using the string: “AVAJ261SCCS162JAVA” and following our pattern we reduce our string to “CC".',
              'Again we compare the first and last characters and remove these from our string as they are equal.',
              'We have gone through all the characters of the string and our result is an empty string. ',
              'We have completed the recursive process of checking the first and last characters until we have arrived at an empty string which is our ending condition. ',
              'This means that our string “AVAJ261SCCS162JAVA” is a palindrome.',
          ] },
        ]
    },
    ]
};

const RecursionNote2 = () => {
  const [currentSection, setCurrentSection] = useState('Recursionn2');
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

export default RecursionNote2;
