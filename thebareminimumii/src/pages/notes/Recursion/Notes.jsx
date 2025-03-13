import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';
import API from '../../../api';

const slides = {
    Recursion: [
        { 
         id: 'Recursion-slide1', 
        title: 'Introduction to Recursion', 
         content: [
           { type: 'bullet', items: [
            'We are familiar with creating and calling methods from other methods from Java',
            'Therefor we can come to the conlusion that a method can call itself',
            'Java and all programming languages can support this posibilty which is know as recursion.',
           ] },
      ]
    },
    { 
      id: 'Recursion-slide2', 
      title: 'What is the output of the following program?', 
      content: [
        { type: 'code', items: [
          'public class StaticMethodExample',
          '     public static void main (String args[])',
          '     {',
          '           printStars(10);',
          '     }',
          '     public static void printStars(int n)',
          '     {',
          '           for(int i=0; i<n; i++)',
          '           {',
          '                 System.out.print("*");',
          '           }',
          '           System.out.println("");',
          '           printStars(10);',
          '      }',
          '}',
        ] }
      ]
    },
    { 
      id: 'Recursion-slide3', 
      title: 'Output', 
      content: [
        'The program calls the printStars() method over and over again until there is not sufficient memory and the program crashes: ',
        { type: 'code', items: [
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
          '**********',
        ] },
        '^Excpetion in thread "main" java.land.StackOverflowError^',
      ]
    },
    { 
      id: 'Recursion-slide4', 
      title: 'Recursion', 
      content: [
        { type: 'bullet', items: [
          'Concept of method calling itself over and over again is know as recursion',
          'Method keeps calling itself until some stopping condition is reached.',
          'If there is no stopping condition then the program will loop until the computer (Java Virtual Machine) runs out of memory (refuses to allocate more memory)',
          'Recurison requires us to modify our thinking',
          'We must stop thinking iteratively (for or while loops)',
          'While recursion may appear wasteful or even inefficient it is a very important concept in computer science and mathematics.',
        ] },
      ]
    },
    { 
      id: 'Recursion-slide5', 
      title: 'Worlds simplest Recursion Program', 
      content: [
        { type: 'code', items: [`
public class Recursion
{
      public static void main (String args[])
      {
            count(0);
            System.out.println()
      }
          
      public static void count(int index)
      {
            System.out.printl(index);
            if (index < 2)
            {
                  count(index + 1);
            }
      }
}
        `] },
        'The count(index + 1) is where the recursion occurs.'
      ]
    },
    { 
      id: 'Recursion-slide6', 
      title: 'Visualizing Recursion', 
      content: [
        { type: 'bullet', items: [
          'First to understand how recursion works, it helps to visualize what’s going on.',
          'A common concept called the stack can help visualize.',
          'Given its function, a stack basically operates like a container of trays in a cafeteria. It has only two operations:'
        ] },
        '- Push: you can push something onto the stack.',
        '– Pop: you can pop something off the top of the stack.',
        { type: 'image', src: '/Recursionp1.png', alt: 'Scanner Example' },
        'The diagram above shows a stack over time. When perform two pushes and one pop.'
      ]
    },
    { 
      id: 'Recursion-slide7', 
      title: 'Stacks and Methods', 
      content: [
        { type: 'bullet', items: [
            'When you run a program, the computer creates a stack for you.',
            'Each time you invoke a method, the method is placed on top of the stack.',
            'When the function returns, its stack frame is popped off the stack.',
            'When the method returns or exits, the method is popped off the stack.',
            'The diagram below shows a sample stack for a simple Java program.',
            'Let pretend we are calling a method int square(int x) which returns the square of x i.e. x=2 so we return 4',
          ] },
        { type: 'image', src: '/Recursionp2.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'Recursion-slide8', 
      title: 'Stacks and Recursion', 
      content: [
        { type: 'bullet', items: [
            'Each time a method is called, you push the method on the stack.',
            'Each time the method returns or exits, you pop the method off the stack',
            'If a method calls itself recursively, you just push another copy of the method onto the stack.',
            'We therefore have a simple way to visualize how recursion really works. ',
          ] },
          'Lets look at "Worlds simplest Recursion Program" in action',
        { type: 'image', src: '/Recursionp3.png', alt: 'Scanner Example' },
      ]
    }
  ],
};

const RecursionNotes = () => {
  const [currentSection, setCurrentSection] = useState('Recursion');
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

export default RecursionNotes;
