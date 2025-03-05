import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
  methods1n2: [
    { 
        id: 'methods1n2-slide1', 
        title: 'Introducing Methods', 
        content: [
          { type: 'bullet', items: [
            'A java method is a bundle of lines of code with a common function.',
            'When defined in an program it can be used (called) repeatedly.',
            'Methods  also define the behaviour of Classes in object oriented programming (more to follow on this) '
          ] },
        ]
      },
    { 
      id: 'methods1n2-slide2', 
      title: 'Methods encountered to Date.', 
      content: [
        { type: 'bullet', items: [
          'You have encountered a number of different methods in your code so far.',
          'You have written a main method in your applications and you have used:'
        ] },
        { type: 'code', items: [
            'System.out.println("Hello World");',
            'public static void main(String [] args)'
          ] }
      ]
    },
    { 
        id: 'methods1n2-slide3', 
        title: 'Writing custom made methods', 
        content: [
          { type: 'bullet', items: [
            'Writing methods helps to keep program code manageable.',
            'It allows us to maintain important code or algorithms that are used in repeatedly in different places in our applications.',
            'It allows the sharing of functionality with other parts of our software system.'
          ] }
        ]
    },
    { 
        id: 'methods1n2-slide4', 
        title: 'Key Features of Methods', 
        content: [
          { type: 'bullet', items: [
            'A method must be written or declared before it can be used.',
            'After it is declared it is used by calling or invoking it in your program.'
          ] },
          'The line of code below is described as a call to the println method.',
          { type: 'code', items: [
            '    System.out.println("Hello world");'
          ] }
        ]
    },
    {
        id: 'methods1n2-slide5',
        title: 'Formal Parts of Methods in Java',
        content: [
            'Method Declaration:',
          { type: 'code', items: [
            'Access_modifiers   return_type  method_name( formal_parameter_list)',
            '{',
            '	statements; ',
            '}',
            '',
            'e.g.',
            'public static void printMsg (  )',
            '{',
	        '   System.out.println(“Hello world”);',
            '}',
            '',
          ] },
          'It is important to know the form or syntax of a method declaration. The next slides will explain a method declaration by using examples.',
           'The method above is used in your code by typing:',
           {type: 'code', items:[
            '',
            'printMsg;   //This line of code will execute the code of the method at this point.',
            '',
           ]}
        ]
    },
    {
        id: 'methods1n2-slide6',
        title: 'Formal Parts of Methods in Java',
        content: [
            'Method Declaration:',
          { type: 'code', items: [
            'Access_modifiers   return_type  method_name( formal_parameter_list)',
            '{',
            '	statements; //if the return type is not void then you need a return statment. ',
            '}',
            '',
           
          ] },
          'Note::  The formal parameter list can be empty or it has comma separated declared parameters as in the example below.',
          { type: 'code', items: [
            'public static int addTwoNumbers (int a, int b)',
            '{',
	        '   return a+b',
            '}',
            '',
          ] },
          'It is important to know the form or syntax of a method declaration. The next slides will explain a method declaration by using examples.',
           'The method above is used in your code by typing:',
           {type: 'code', items:[
            '',
            'Int  x = addTwoNumbers(10,27); // This line of code will execute the code of the method at this point.',
            '',
           ]}
        ]
    },
    {
        id: 'methods1n2-slide7',
        title: 'Method Declaration and use of the method',
        content: [
            {type: 'bullet', items:[
                'The method declaration tells the programmer how the method should be used.',
                'The declaration is the design of the method and it must be used according to its design.',
                'For example if a method is designed to take one parameter in the parameter list then writing more than one parameter or none when calling the method will generate an error. ',
                'The number of parameters in the call to the method must match the type and number of parameters  in the method declaration.',
                'There are other rules but it is best to illustrate them with examples.',
            ]}
        ]
    },
    {
        id: 'methods1n2-slide8',
        title: '(1) Taking no parameters and no return type',
        content: [
          { type: 'image', src: '/Method1n2p1.png', alt: 'Scanner Example' }
        ]
    },
    {
        id: 'methods1n2-slide9',
        title: '(2) Takes two parameters and no return type',
        content: [
          { type: 'image', src: '/Method1n2p2.png', alt: 'Scanner Example' }
        ]
    },
    {
        id: 'methods1n2-slide10',
        title: '(3) Returns an int and takes two parameters',
        content: [
          { type: 'image', src: '/Method1n2p3.png', alt: 'Scanner Example' }
        ]
    },
    {
        id: 'methods1n2-slide11',
        title: '(4) Returns an int and takes two parameters',
        content: [
          { type: 'image', src: '/Method1n2p4.png', alt: 'Scanner Example' }
        ]
    },
    {
        id: 'methods1n2-slide12',
        title: '(5) Returns an int and takes two parameters',
        content: [
          { type: 'image', src: '/Method1n2p5.png', alt: 'Scanner Example' }
        ]
    },
    {
        id:'methods1n2-slide13',
        title: 'Rules for Writing and Using Methods',
        content: [
            {type:'numbered',items:[
                'The use or call of a method must match the signature declaration of the method.',
                'If the method returns a value of a particular type then the receiving variable should be capable of storing that type.',
                'The number and order of the parameters in the method call (actual parameter list) must match the number and order of parameters in the method signature declaration (formal parameter list).',
                'The type of the parameters in the both the method call and the method declaration must match.'
            ]}
        ]
    },
    
  ],
};

const M1Note2 = () => {
  const [currentSection, setCurrentSection] = useState('methods1n2');
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

export default M1Note2;
