import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
  methods1: [
    { 
      id: 'methods1-slide1', 
      title: 'Introduction to Methods and user input.', 
      content: [
      ]
    },
    { 
      id: 'methods1-slide2', 
      title: 'Keyboard Input', 
      content: [
        { type: 'bullet', items: [
          'Up to now we have declared variables at the start of every program.',
          'Sometimes we don’t know the value of a variable until the program runs, e.g. until a user provides input.',
          'Keyboard input since Java 1.5 is much more straight-forward.',
          'Java 1.5 introduced the Scanner class which simplifies input generation.  It can also be used to read from files, keyboard and Strings (among other sources).'
        ] }
      ]
    },
    { 
        id: 'methods1-slide3', 
        title: 'Kayboard Input', 
        content: [
          { type: 'bullet', items: [
            'To get keyboard input you need three things…'
          ] },
          {type:'numbered',items:[
             'The Scanner class is defined in the java.util package. So you must have the following        statement at the top of your program import java.util.*; OR import java.util.Scanner;',
              'Need to create an instance of the Scanner class      Scanner sc = new Scanner(System.in),',
             'Need to call one or more Scanner methods to read in data input'
            ]}
        ]
      },
      { 
        id: 'methods1-slide4', 
        title: 'Important Methods', 
        content: [
          { type: 'bullet', items: [
            'nextInt() // reads in the next token as an int.',
            'nextFloat() // reads in the next token as an float.',
            'nextDouble() // reads in the next token as an double.',
            'nextLine() // reads in the next token as an String.',
            'hasNextInt() //returns true if there is another int to read in.',
            'hasNextFloat() //returns true if there is another float to read in.',
            'hasNextDouble() //returns true if there is another double to read in.',
            'hasNextLine() //returns true if there is another String to read in.',
            'Look at the API for a full list of methods ….',
          ] }
        ]
      },
      {
        id: 'methods1-slide5',
        title: 'Using the Scanner Class in Java',
        content: [
          'The Scanner class is used for getting input from the user in Java. It is part of the java.util package, so you need to import it at the beginning of your program.',
          'To use Scanner, you must import it like this:',
          '```java\nimport java.util.Scanner;\n```',


          'Scanner is a class (or type) that acts as a template for creating an object. The object is used to represent the standard input (keyboard) in your program.',
          'To create a Scanner object, use the following code:',
          '```java\nScanner sc = new Scanner(System.in);\n```',


          'This line creates an object called `sc` that represents the keyboard. You can now use the object to retrieve input from the user.',
          'For example, to read an integer from the user, you would write:',
          '```java\nint number = sc.nextInt();\n```',


          'This reads an integer value from the user and stores it in the variable `number`.',
        ]
      },
      {
        id: 'methods1-slide6',
        title: 'Getting user input example',
        content: [
          { type: 'image', src: '/UserInputEg.png', alt: 'Scanner Example' }
        ]
      }      
            
  ],
};

const M1Notes = () => {
  const [currentSection, setCurrentSection] = useState('methods1');
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

export default M1Notes;
