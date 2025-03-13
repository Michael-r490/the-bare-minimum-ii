import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    methods2n3: [
        { 
         id: 'methods2n3-slide1', 
        title: 'Static methods and static class variables', 
         content: [

      ]
    },
    { 
      id: 'methods2n3-slide2', 
      title: 'Static or Class variables or methods', 
      content: [
        {type: 'bullet', items: [
            'Static should really have been called “class”',
            'Methods and attributes which are Static can have one “version” of them. (E.g. A static variable which counts the number of objects created for a given class).',
            'We will see later that non-Static items can relate to any number of specific items'
          ]},
      ]
    },
    { 
      id: 'methods2n3-slide3', 
      title: 'Java wants a main method to run an application.', 
      content: [
        {type: 'bullet', items: [
          'The main method is that start for all Java programs so it must be publically accessible hence the public access modifier',
          'The word static specifies how to access the main method. With a non-static method you must do some extra work prior to accessing it (create an instance of the Class, instantiate a class == an object)',
          'A static method on the other hand can be accessed immediately without doing any extra work. (Use the Class name followed by “.” followed by the method name.)',
        ]},
        
      ]
    },
    { 
        id: 'methods2n3-slide4', 
        title: 'Static variables (Class variables)', 
        content: [
          {type: 'bullet', items: [
            'So far all variables were contained within a method. (This includes the main method)',
            'However, it can be helpful to have a variable accessible to all methods in a class.',
            'Without being passed as an argument',
            'Variables declared in this way have scope which covers the whole Class body {   }',
          ]},
          
        ]
    },
    { 
        id: 'methods2n3-slide5', 
        title: 'Global scope of the class variable x.', 
        content: [
          {type: 'bullet', items: [
            'The variable x is now a shared variable that is usable by all methods in that class.',
            'The main method changes the value of x to 25',
            'The print method just prints out the value of x to the screen.',
            'Notice we did not have to pass the variable x to the method. It was accessible due to its global scope or scope throughout the Class.',
          ]},
        ]
    },
    { 
        id: 'methods2n3-slide6', 
        title: 'Using other Classes and public static Methods', 
        content: [
          {type: 'bullet', items: [
            'In lectures and in the lab assignments we have written many different methods.',
            'These are not just dead archives of completed work!',
            'We can re-use these classes and methods in other programs.',
            'See the examples in Moodle of how TestStringProcessing uses the StringProcessing class and MyTester uses MyMaths class.',
          ]},
        ]
    },
    { 
        id: 'methods2n3-slide7', 
        title: 'Reusing the mySigma() Class', 
        content: [
          {type: 'bullet', items: [
            'This week we wrote a mySigma(int x) method in one of your programs (class files).',
            'Another class can easily make use of this method',
          ]},
          {type: 'code', items: [
            'public static MyTester{',
            '       public static void main() {',
            '               int result = 0;',
            '               result = YourClassName.mySigma(7);',
            '               System.out.println(result);',
            '       }',
            '}',
          ]},
        ]
    },
    { 
        id: 'methods2n3-slide8', 
        title: 'Using other Classes/Methods', 
        content: [
          {type: 'bullet', items: [
            'Public static methods written in one class can be used by another class by calling the method using the Class name “.” method name',
          ]},
          { type: 'image', src: '/Method2n3p1.png', alt: 'Scanner Example' },
        ]
    },
    { 
        id: 'methods2n3-slide9', 
        title: 'public vs private', 
        content: [
          {type: 'bullet', items: [
            'When writing method for one class, we can control what other classes use that method',
            'Method are usually defined as public',
            'Attributes are usually defined as private',
            'However, we might want to ensure some methods are NOT used by other classes',
            'private static type name()',
            'public and private are called Access Modifiers',
          ]},
        ]
    },
    { 
        id: 'methods2n3-slide10', 
        title: 'Significance of public and private', 
        content: [
          {type: 'bullet', items: [
            'private methods can Not be seen by other classes',
            'However, other methods in the same class can still see & call private methods from the same class',
            'So “private” really only applies to other classes, not within a class',
          ]},
        ]
    },
    { 
        id: 'methods2n3-slide11', 
        title: 'Can methods call other methods.', 
        content: [
          {type: 'bullet', items: [
            'One method can call any other method',
            'The main method of the GeneralMaths can call the mySigma() method',
            'Within a class, it does not matter if the other methods are public or private',
          ]},
        ]
    },
    { 
        id: 'methods2n3-slide12', 
        title: 'Reusing method names (overloading)', 
        content: [
          {type: 'bullet', items: [
            'You can define two or more methods within the same class that share the same name, as long as their parameter declarations are different. ',
            'These are called overloaded methods',
            'Such methods can be distinguished by:',
          ]},
          '-The types of their arguments/parameters',
          '-The number of arguments/parameters',
        ]
    },
    { 
        id: 'methods2n3-slide13', 
        title: 'Reusing method names (overloading)', 
        content: [
          {type: 'code', items: [
            'public static void timesTwo(int y)',
            '{',
            '       System.out.println(y*2);',
            '}',
            '',
            'public static void timesTwo(double y)',
            '{',
            '       System.out.println(y*2.0);',
            '}',
          ]},
        ]
    },
    { 
        id: 'methods2n3-slide14', 
        title: 'Using overloaded Methods', 
        content: [
          {type: 'bullet', items: [
            'Using overloaded Methods',
            'All it has to do is check the types of the arguments.',
          ]},
          {type: 'code', items: [
            '',
            'public static void main()',
            '{',
            '       twoTimes(2);',
            '       twoTimes(2.0);',
            '}',
          ]},
        ]
    },
  ],
};

const M2Note3 = () => {
  const [currentSection, setCurrentSection] = useState('methods2n3');
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

export default M2Note3;
