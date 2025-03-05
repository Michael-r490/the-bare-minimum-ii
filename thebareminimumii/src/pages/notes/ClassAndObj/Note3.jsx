import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    CnO3: [
    { 
         id: 'CnO3-slide1', 
        title: 'Non-Access Modifiers', 
         content: [
          'Examples of Non-Access Modifiers:',
          { type: 'bullet', items: [
            'static - makes the variable or method a member of the class and not a member of an instance of the class (i.e. a class variable, not an object variable).',
            'final makes the variable constant and cannot be changed.',
            'Others include abstract and synchronized.',
            ] },
            'Knowing when to use these modifiers will again depend on the requirements of the class.',
            'We use final when making constant variables that are used again and again in our code.',
            'We use static when we are sure we only want one copy of a variable or method to exist, or when we want the class to control that variable or method (rather than an object controlling it)',
            'Examples:',
            { type: 'bullet', items: [
                'Example #1 public static void main(String[] args) {}',
                'We use static here because we only want ONE main() method. Using static guarantees that that will be the case no matter what the user does with the class that contains main().',
                'Example #2 Let’s say we add a new attribute to our Car class. We will call it carReg and it is of type int.',
                 'private int carReg; ',
                ] },
      ]
    },
    { 
        id: 'CnO3-slide2', 
       title: 'Non-Access Modifiers', 
        content: [
         'We must change our constructors and methods to take this new attribute into account. Our default constructor may change to:',
         { type:'code', items:[
            `
            public Car()
            {
                numberOfDoor = 3;
                colour = "Black";
                motorType = 'E';
                carReg = 0;
            }
            `
                        ]},
     ]
   },
    { 
    id: 'CnO3-slide3', 
    title: 'Non-Access Modifiers', 
    content: [
        'This means, every time we create a Car object using this constructor, each object will have the same value for carReg (i.e. 0).',
        'We know car registrations should be unique. We can alter our class code by adding a static variable that remembers the last car reg number used by the class.',
        'So we have',
        
        'private static int lastCarReg = 1000;',
        'Now we can update our constructor to add 1 to this static variable and then assign the new registration number to our carReg variable.',
        {type: 'code',items:[
           `  
           public Car()
           {
                numberOfDoor = 3;
                colour = "Black";
                motorType = 'E';
                lastCarReg++;  //adds 1 to the lastCarReg variable
                carReg = lastCarReg;
           }
           ` ,
        ]},
        'This means that each new Car object created with this constructor will get a unique ID, starting with 1001 and going up by 1 each time this constructor is called.',
        'We should make sure to change our other constructors to do the same thing, so that the behaviour is consistent irrespective of the type of constructor used. ',
        ]
    },
    { 
        id: 'CnO3-slide4', 
        title: 'Note on Static and Instance Variables', 
        content: [
            'Let us consider creating a class to represent a birth record for a child.',
            'A birth record would contain lots of details (attributes) e.g. the child’s name, mothers name, fathers name, hospital of birth and their PPS number.',
            'Each birth record that is created has its own copy of these attributes.',
            'These are called instance attributes (variables), as in they belong to an instance (object – in this case a birth record) of the class.',
            'Every PPS number has to be unique and therefore when a new child is born they should get a new unique PPS number in their birth record.',
            'We need a static variable that represents the current/next PPS number to be given out.',
            'Every time a new PPS number is needed we use the previous value plus one as the new PPS number',
            '(currentPPS = previousPPS + 1).',
            'This variable must be static, because we only ever want one copy of it.',
            'It doesn’t belong to any of the instances of the class (objects), it belongs to the birth record class but all of the objects of the class can access and use it.',
        ]
    },
    { 
        id: 'CnO3-slide5', 
        title: '"this" Operator', 
        content: [
            'When we created attributes for our Car class, we picked names that were meaningful and descriptive:',
            {type: 'code',items:[
            `            private int numberOfDoors;
            private String colour;
            private char motorType;
            private int carReg;
            ` ,
                    ]},
            'When it came to creating constructors, accessors and mutators, we had to pick different names for our formal parameters to describe the same attributes.',
            'This can be confusing:',
            {type: 'code',items:[
            '           public Car (int doors, String carColour, char motor)',
            ]},
            'We would prefer to be able to continue to use the same variable names.',
            'However, if we chose the same names for our parameters as we chose for our attributes, we will get a compiler error.',
            'However, if we use the special this keyword in Java then we can differentiate between variables that are passed as parameters and variables that belong to an instance of a class.',
            'For example, if we want to set the motor type of an instance of Car using the motorType mutator method, we could do the following:',
            {type: 'code',items:[
            `           public void setMotorType(char motorType)
            {
            this.motorType = motorType;
            }
            `
            ]},
        ]
    },
    { 
        id: 'CnO3-slide6', 
        title: '"this" Operator', 
        content: [
            'Using the this keyword indicated that the variable motorType on the left hand side of the assignment is the instance attribute variable and the variable motorType on the right hand side is the parameter variable belonging exclusively to the method setMotorType()',
            'This method takes the value from the method parameter motorType and saves it into the instance attribute variable motorType',
            'The default constructor can be modified as follows:',
            {type: 'code',items:[
            `
            public Car(int numberOfDoors, String colour, char motorType)
            {
            this.numberOfDoors = numberOfDoors;
            this.colour = colour;
            this.motorType = motorType;
            } 
            `
            ]},
        ]
    },
    { 
        id: 'CnO3-slide7', 
        title: 'Object class', 
        content: [
            'In Java, every class is actually a sub class of a very important class. (Every class automatically inherits methods from this important class)',
            'It is called the class Object.',
            'The Object class has a number of methods that are subsequently made available to all other classes. ',
        ]
    },
  ],
};

const CnONote3 = () => {
  const [currentSection, setCurrentSection] = useState('CnO3');
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

export default CnONote3;
