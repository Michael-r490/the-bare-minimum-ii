import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    CnO: [
        { 
         id: 'CnO-slide1', 
        title: 'Introduction to Class and Objects', 
         content: [
          'The primitive data types in Java are: int, byte, short, float, double, boolean, char and long',
          'When we declare a variable of one of these types, a fixed size of memory is allocated to hold the value to be stored',
          'The fixed size of memory allocated is different for each type',
          'For example if we declare a integer, 32 bytes of space is allocated',
          'Primitive data types are limited in both their size and their flexibility',
      ]
    },
    { 
      id: 'CnO-slide2', 
      title: 'Arrays', 
      content: [
        'Arrays are a powerful way to extend a primitive data type',
        'They allow us to collect variables of the same type under a single variable name',
        'We can also make arrays of any size length',
        'char word [ ] = new char[5]; // creates an array of 5 elements, each element can store a char',
        'int results[ ][ ] = new int[7][6]; // creates an array of 7 rows, 6 columns, each element can store an int',
        'int data[ ][ ] = new int [4][5]; //this declares a 4x5 matrix of integers.',
        'But even arrays are limited in what they can and cannot do for us.',
      ]
    },
    { 
      id: 'CnO-slide3', 
      title: 'Strings', 
      content: [
        'A String is an example of a reference type. When it is declared no memory is allocated until it is initialized. The String type is more powerful than even arrays as it can both hold any sized value, and it provides functionality to interact with that value.',
        ' i.e. String.length(), String.toUpperCase(), String.toLowerCase() String.charAt(), String.substring(), String.replace() etc.',
        'These (Scanner, String, Integer) are some classes that are built into java. We can also create java classes to perform a particular user defined task.',
      ]
    },
    { 
      id: 'CnO-slide4', 
      title: 'User Defined Class', 
      content: [
        'A class can be considered like a template (or design blueprint)',
        'This template can be the blueprint of something more general. Let us consider an example of representing a car in a class.',
        'All cars have certain features (attributes) in common.',
        'They all have a motor type of a particular type:',
        '– Electric,',
        '– ICE (Internal Combustion Engine)',
        '– Fuel Cell',
        'They have a colour',
        'They have a number of doors',
        'There are many more attributes that we could list that all cars could share.',
        'In addition to attributes, every class can also preform certain tasks'
      ]
    },
    { 
      id: 'CnO-slide5', 
      title: 'User Defined Class', 
      content: [
        'It would be helpful if we could both encapsulate the description of the car (data) and encode functionality relating to the car (methods) .',
        'The (template or blueprint) code that we could write to capture both attributes and functionality of the car is called a class.',
        'A class is a definition for a category of objects that all have the same behaviour and same type of attributes.',
        'In Java we can use data types (like int, double, String etc.) to store attributes and we can use methods to encode functionality (behaviour).',
        'Note: We can also use other objects as attributes!',
      ]
    },
    { 
      id: 'CnO-slide6', 
      title: 'Components of a Class', 
      content: [
        'There are a number of components that most classes share in common. These are:',
        '1. A class name.',
        '• This name should be meaningful and represent the purpose of the class. For example – if you are creating a class to represent a car then the name of the class should be Car. The normal naming convention is that class names should start with an uppercase letter and be a noun.',
        ' 2. Attributes, also known as instance variables.',
        '• These are variables that will be used inside the class to hold values (data) such as the make/model of the car, how many doors it has, etc.',
        ' 3. Constructor(s).',
        '• There should always be a default constructor. This type of constructor has zero input parameters. If there is none provided the JVM will automatically provide one.',
        '• There will usually be another constructor with 1 or more with parameters.',
        ' 4. Getters methods (also known as Accessors).',
        '• These are methods defined by the user to return the values of the attributes in a class.',
        ' 5. Setters (also known as Mutators).',
        '• These are methods which change the value of attributes in a class',
        ' 6. Functionality in the form of methods.',
      ]
    },
    { 
      id: 'CnO-slide7', 
      title: 'Objects', 
      content: [        
        'An object is an instance of a class. It can be thought of being like any variable. When using the Scanner class you created an object of that class by writing',
        ' Scanner sc = new Scanner(System.in)',
        '• This is creating an object of the Scanner class. If we create another object of the Scanner class as follows',
        ' Scanner sc1 = new Scanner(System.in)',
        '• We now have two instances of the class in our program',
      ]
    },
    { 
      id: 'CnO-slide8', 
      title: 'Class Example', 
      content: [
        'Let us start looking at an example of a java class to represent a Car.',
        '• Our class, called Car will have the following attributes: ',
        'numberOfDoors, motorType and colour.',
        '• We might want to have a method called printCarDetails() that prints out these attributes.',
        '[Advanced] Instead of writing a printCarDetails( ) method we could could override the toString() method in our new Car class so that it prints out the values in the attributes of the Car class.',
      ]
    },
    { 
      id: 'CnO-slide9', 
      title: 'Class Example', 
      content: [
        { type: 'image', src: '/CaOn1p1.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'CnO-slide10', 
      title: 'Class Example', 
      content: [
        'It is important to note we have no main() method in our class.',
        '• In our main() method (contained in another file), we can create objects of the Car class in a similar way we create objects of the Scanner Class. ',
      ]
    },
    { 
      id: 'CnO-slide11', 
      title: 'Class Example', 
      content: [
        { type: 'image', src: '/CaOn1p2.png', alt: 'Scanner Example' },
      ]
    },
  ],
};

const CnONotes = () => {
  const [currentSection, setCurrentSection] = useState('CnO');
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

export default CnONotes;
