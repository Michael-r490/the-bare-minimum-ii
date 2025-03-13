import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';
import API from '../../../api';

const slides = {
    methods2n2: [
        { 
         id: 'methods2n2-slide1', 
        title: 'A Sigma Function', 
         content: [
            {type: 'bullet', items:[
              'What is a “Sigma” function: Our sigma function is one that takes a positive integer value n and adds all the integers from 0 to n. '
            ]},
            '- n=0 then Sigma(0) = 0',
            '- n=1 then Sigma(1) = 1',
            '- n=2 then Sigma(2) = 2 + 1',
            '- n=4 then Sigma(4) = 4 + 3 + 2 + 1',
            {type: 'code', items:[
              'int result = 0;',
              '',
              'for (int i=1; i<=n; i++){',
              '     result = result + i;',
              '}',
            ]},
            {type: 'bullet', items:[
              'Now lets make this into a method. '
            ]},
      ]
    },
    { 
      id: 'methods2n2-slide2', 
      title: 'The mySigma method', 
      content: [
        {type: 'code', items:[
          'public static int mySigma (int n) {',
          '   int result = 0;',
          '   for(int i=1; i<=n; i++;) {',
          '     result = result + i;',
          '    }',
          '    return result;',
          '}',
        ]}
      ]
    },
    { 
      id: 'methods2n2-slide3', 
      title: 'Using the mySigma method', 
      content: [
        {type: 'bullet', items: [
          'Now, the rest of my Java program  can use this mySigma() method.',
        ]},
        '– Such as the main() method or  in any other methods we write',
        {type: 'code', items: [
          '',
          'public static void main() {',
          '   ...',
          '',
          '   int x = mySigma(4);',
          '',
          '   ...',
          '}',
        ]},
        
      ]
    },
    { 
      id: 'methods2n2-slide4', 
      title: 'What happens when we call the method mySigma?', 
      content: [
        {type: 'numbered', items: [
          'A memory resource called a stack frame or run time stack is created for the call to the method int x = mySigma(4)',

          'Memory space is set aside within this stack frame for the formal parameter int n',

          'The return point or address is stored in the stack frame. This is the point at which the program continues to execute after the method is finished running.',

          'The value in the actual parameter (4) is copied into the formal parameters  n.',

          'Space is set aside for the local variable int result and it is assigned the value 0.',

          'The code statements, which in this case is the for loop in the body of the method is now executed. The first thing that happens in this case is a local variable is declared int i whose scope is only for the duration of the for loop. (See scope rules earlier)',

          'When the loop is finished executing, the variable result will have the calculated sigma result  and this value will be returned to the point at which the method mySigma was called (variable x is  given the returned value). The flow of  control of the program returns to this point using the return address stored in the stack frame.',

          'Finally the stack frame is “destroyed” or returned to the system to be reused. The Formal parameters  int n as well as the local variable int i are no longer available in your program',

        ]},
        
      ]
    },
    { 
      id: 'methods2n2-slide5', 
      title: 'Calling mySigma from main within the GeneralMaths Class', 
      content: [
        {type: 'code', items: [
          'import java.util.Scanner;',

          'public class GeneralMaths',
          '{',

          '     public static void main(String args[])',
          '     {',
          '           Scanner myInput = new Scanner (System.in);',
          '           System.out.println("Please enter a number in order to calculate its Sigma value: ")',
          '           int n = myInput.mextInt();',
          '           int value = mySigma(n);',
          '           System.out.println("The value of Sigma " + n " is " + value);',
          '     }',

          '     public static int mySigma(int n){',
          '           int result = 0;',
          '           for(int i=1; i<=n; i++;) {',
          '               result = result + i;',
          '           }',
          '           return result;',
          '     }',
          '}',
        ]},
        
      ]
    },
    { 
      id: 'methods2n2-slide6', 
      title: 'Output of main method call to mySigma in GeneralMaths', 
      content: [
        {type: 'code', items: [
          'Please enter a number in order to calculate its Sigma value:',
          '5',
          'The value of Sigma 5 is 15',
        ]},
      ]
    },
    { 
      id: 'methods2n2-slide7', 
      title: 'Calling the method from another class (static method call)',
      content: [
        {type: 'code', items: [
          'public class myTester',
          '{',
          '     public static void main(String args[])',
          '     {',
          '           System.out.println("Im going to use a method from the GeneralMaths class");',
          '           int number x = 4;',
          '',
          '           int x = GeneralMaths.myGigma(number);   //Im using a static method here.',
          '',
          '           System.out.println("The Sigma vlaue of " + number " is : " + x);',
          '',
          '     }',
          '}',
        ]},
      ]
    },
    { 
      id: 'methods2n2-slide8', 
      title: 'Output of main method call to mySigma in myTester', 
      content: [
        {type: 'code', items: [
          'Im going to use a method from the GeneralMaths class',
          'The value of Sigma 4 is 10',
        ]},
      ]
    },
    { 
      id: 'methods2n2-slide9', 
      title: 'UML (Unified Modelling Language), box and arrow diagrams used in industry. ', 
      content: [
        { type: 'image', src: '/Method2n2p1.png', alt: 'Scanner Example' },
        'BlueJ shows the UML relationship between the myTester class and the GeneralMaths Class. The broken arrow indicates that myTester uses some aspect of the GeneralMaths class. (i.e. the mySigma method) ',
      ]
    },
  ],
};

const M2Note2 = () => {
  const [currentSection, setCurrentSection] = useState('methods2n2');
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
            return null; 
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

export default M2Note2;
