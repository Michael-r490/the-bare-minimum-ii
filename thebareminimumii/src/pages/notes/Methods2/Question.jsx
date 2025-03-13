import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
  methods2Q: [
    { 
      id: 'methods2Q-slide1', 
      title: 'Question for you', 
      content: [
        'Question : Write a basic Java program which contains a method  declaration. This method should be named addFourNumbers and it should take four int parameters and return an int.',
        'Four int parameter means “four parameters of type int”',
        '```Tip: First, write the method signature (head of declaration) for this method.```',
        'a) The method simply adds the four numbers together and returns the result.',
        '*Use a local variable to add the numbers together before returning the result.*',
        '```Tip: A local variable is the variable declared inside the method.```',
        'b) In your main method use the method to add four numbers together and then print out the result.',
        'c) Describe what happens (write it out with pen-and-paper) when this method is called.',
        'In your answer, use the terms:',
        { type: 'bullet', items: [
            'method call',
            'actual and formal  parameter list',
            'method signature',
            'method code',
            'stack frame',
            
            'return address',
            
            'flow of program execution',
            
            'etc',
          ] },
      ]
    },
    {
        id: 'methods2Q-slide2',
        title: 'Question 2',
        content: [
          'Write a method according to the following method signature:',
          {type: 'code',items: [
            'public static int squareMe( int x )',
          ]},
          'This method takes an integer parameter and returns that number squared. ',
          'How would you use this method to calculate the square of 7 and put it into a variable result? Write out the line of code in your note book.',
          'In your method, declare a variable named result that will contain the number squared.',
          'Write out the script that tells you what happens when this method is called. Use the term run time stack, actual parameters, formal parameters, local variables, and return address. ',
          'What happens eventually to the run time stack? ',
          'New *** Write a java program that tests your code, after you have done this, adapt your code so that you use the Scanner class to read an int from the user and then prints out the square of this number using your squareMe method.',
        ]
    },
    { 
        id: 'methods2Q-slide3', 
        title: 'Question 3', 
        content: [
          'Write a method using pen-and-paper according to the following method signature:',
          { type: 'code', items: [
            'public static void changeArray(int [ ] values, int x)',
            '//This method takes and array reference parameter and an int parameter. It then fills the array with the value x.',
            '//*** note:  values.length is the information that every array carries to tell you the length of any array.',
            '//Using pen and paper write out what happens when this method is called and you should provide a specific array and number to the method.',
            '//Write a main method that declares a data array with the following contents ',
            'int [] data = {7, 22, 35, 6 , 10, 12};',
            'System.out.println(data);   // what does this print for you?',
            '//Then make a call to the changeArray method providing it with the array above and a second parameter , 99, to fill each and every element of the array with 99.',
            'changeArray(data, 99);      // Finish this, what goes here?',
          ] },
          '***Next code this',
          'Declare an int array in your program with 10 specific numbers, name this array numbers',
          'Use a loop in your main program to print out all these numbers. (you could write a method named printArray to do this for you. Use the signature below:',
          { type: 'code', items: [
            'public static void printArray( int [ ] values)',
          ] },
          'Use your changeArray method to change the array value so that they all contain 25.',
          'Use the printAarray method to examine the contents of the array.',
        ]
      },
            
  ],
};

const M2Question = () => {
  const [currentSection, setCurrentSection] = useState('methods2Q');
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

export default M2Question;
