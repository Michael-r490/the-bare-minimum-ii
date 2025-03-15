import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';
import API from '../../../api';

const slides = {
    CnO2: [
        { 
         id: 'CnO2-slide1', 
        title: 'Arrays of Objects', 
         content: [
          'We may wish to create many cars in our program. In the previous example we created two objects of Cars called c1 and c2. However, if we wanted to create more it can get very  messy. Using an array to store objects of the same type can help make it easier. As an example, let us create five Cars.',
          { type: 'code', items: [
            `
            //in the main method
            Car carShowRun [] = new Car[5];
            for (int i = 0; i<5; i++)
                {
                    carShowRoom[i] new Car();
                }
            `        
                  ] },
      ]
    },
    { 
      id: 'CnO2-slide2', 
      title: 'Naming Conventions of Classes and Objects', 
      content: [
        'When creating a class, the class name should always start with an upper case letter',
        'e.g. public class Car',
        'When creating an object of a class, the object name should always start with a lower case letter with any subsequent word starting with an uppercase letter. For example:',
        { type: 'code', items: [
        'Car myCar = new Car();',
        'Table woodenTable = new Table();',
        'Chair threeLeggedStool = new Chair();',
        ] },
      ]
    },
    { 
      id: 'CnO2-slide3', 
      title: 'Constructors', 
      content: [
        'A constructor is a special type of method that is invoked when the new keyword is used with the object.',
        'Class constructors have no return types (not even void) and must have the same name as the class.',
        'We usually have a default constructor (i.e. one with no parameters)',
        'and at least one other constructor with 1 or more parameters. ',
      ]
    },
    { 
      id: 'CnO2-slide4', 
      title: 'Constructors', 
      content: [
        'In the Car class example below you can see a) the default constructor which is used to create a Car object with default attribute values, and b) the parameterised second constructor that allows you to pass parameters to the constructor while it is creating a Car object. So in this example, you have two ways of creating a Car object',
        { type: 'code', items: [
`
            //Default Constructor
            public Car()
            {
                numberOfDoors = 3;  
                colour = "Black";               //Class attributes are given "default values"
                motorType = 'I';    
            }
            
            // Our general constructor was defined as:

            public Car(int doors, String carColour, char motor)
            {
                numberOfDoors = doors;  
                colour = carColour;             //Class attributes are assigned the valuesthat are passed through constructor
                motorType = motor;      
            }

`
            ] },
      ]
    },
    { 
        id: 'CnO2-slide5', 
        title: 'Accesor and Mutator Methods', 
        content: [
            { type: 'bullet', items: [
                'Accessor methods are used to return (get) an attributes value.',
                'They are also referred to as getter methods.',
                'Mutator methods are used to change (set) an attributes value.',
                'They are also referred to as setter methods.',
                'Accessor and mutator methods define a precise way for the user to interact with these class variables.',
            ] },
        ]   
    },
    { 
        id: 'CnO2-slide6', 
        title: 'Accesor and Mutator Methods', 
        content: [
            'Let us look at an example of an accessor method to get the colour of a car.',
            { type: 'code', items: [
                `
                public String getColour()
                {
                 return colour;
                }
                 `
            ] },
            'It should be noted that an accessor method takes zero input parameters and has a return type (i.e. not void).',
            'The example method above gets the value in the class variable colour and returns it to the calling method.',
            'As the method is public, any class will be able to call it.',
            'Let us look at an example of a mutator method to set the colour of a car.',
            { type: 'code', items: [
                `
                public void setColour(String carColour)
                {
                colour = carColour;
                }
                `
            ] },
            'It should be noted that a mutator method takes one or more parameters and always has a void return type.',
            'This example method sets the value of the variable colour to the value passed in to the method in the variable carColour.',
        ]   
    },
    { 
        id: 'CnO2-slide7', 
        title: 'Naming Conventions for Accesor and Mutatore Methods', 
        content: [
            'When naming accessor and mutator methods, the following accepted naming convention should be used.',
            'The accepted convention is that the first letter of the first word of the method name is lower case (and will be either get or set) and all others are upper case. For example:',
            '• Accessor: get<AttributeName>() e.g. for the attribute carReg we use',
            'getCarReg()',
            '• Mutator: set<AttributeName>() e.g for the attribute motorType we use',
            'setMotorType()',
        ]   
    },
    { 
        id: 'CnO2-slide8', 
        title: 'Static Keyword with Classes', 
        content: [
            'Notice that when we created printCarDetails() we did not use the keyword static.',
            'If we use static with a method (or a variable) then that method belongs exclusively to the class definition and will never be copied to an instance of the class (i.e. an object).',
            'If we leave the keyword static out, then every instance of the class will get its own copy of the method (or variable).',
            { type: 'code', items: [
                `
                //Method to print the details of the car
                public void printCarDetails()
                {
                    String details = "Number of door: " + numberOfDoors;
                    details += "Colour: " + colour;
                    details += "Motor Type: " + motorType;
                    System.out.println(details);
                }
                `
            ] },
        ]   
    },
    { 
        id: 'CnO2-slide9', 
        title: 'Access Modifiers', 
        content: [
            'There are four types of access modifiers:',
            '1. public makes the variable, method, class or package accessible to the world',
            '2. private makes the variable or method accessible only within the class in which it is defined',
            '3. protected makes the variable, method or class accessible only within the package or derived subclasses',
            '4. <none> - default makes the variable, method or class accessible only within the package (but not accessible to subclasses)',
            'Knowing when to use these modifiers will depend on the requirements of the class, but as a rule of thumb following the following:',
            { type:'bullet', items:[
                'Most classes are public.',
                'Most attributes are private.',
                'Methods are generally public, sometimes protected and occasionally private. ',
            ]},
        ]   
    },
    { 
        id: 'CnO2-slide10', 
        title: 'Making Attributes Private', 
        content: [
            'In our Car class we should alter our attributes as follows (but only if we add in accessor and mutator methods that will',
            'allow us to access the attribute values):',
            { type:'bullet', items:[
            'private int numberOfDoors;',
            'private String colour;',
            'private char motorType;',
            ]},
            'We do this as we generally don’t want users to directly interact with our class attributes (but only allow access through some interface or public methods).',
            'We will therefore have to give them a different way to access them (if at all). ',
        ]   
    },
    { 
        id: 'CnO2-slide11', 
        title: 'Making Attributes Private', 
        content: [
            { type:'code', items:[
`public class Car
{
    private int numberOfDoors;
    private String colour;
    private char motorType; // can be 'I' for ICE, E for Electric or 'F' for Fuelcell
    public Car ()
    {
        numberOfDoors = 3;
        colour = "Black";
        motorType = 'I';
    }
    public Car (int doors, String carColour, char motor)
    {
        numberOfDoors doors;
        colour = carColour;
        motorType = motor;
    }
    public String getColour ()
    {
        return colour;
    }
    public void setColour (String c)
    {
        colour= c;
    }
    public void printCarDetails()
    {
        String details = "Number of Doors: + numberOfDoors; details + "Colour: "+ colour;
        details + "Motor Type: " + motorType;
        System.out.println(details);
    }
}
`
            ]},
        ]   
    },
    { 
        id: 'CnO2-slide12', 
        title: 'Controlling Access', 
        content: [
            'Quite often we want to precisely control how users access our class attributes.',
            'For example, there are many times when making a variable read-only makes sense.',
            'Maybe we don’t want to allow a user to change the car registration number of a particular car.',
            'We could, therefore write only an accessor method and not add any mutator method for carReg.',
            'Another example of controlling access is deciding how to allow a user to set an attribute.',
            'For example, maybe we want to limit the colours a user can use for a Car object.',
        ]   
    },
    { 
        id: 'CnO2-slide12', 
        title: 'Controlling Access', 
        content: [
            'Let us restrict the colour a car can be to either black or red.',
            'The following code ensures that the user can’t just store any value in the attribute (e.g. setting the String variable colour to “raincoat” or “Foo Fighters”).',
            { type:'code', items:[
                `public void setColour(String carColour)
                {
                    if(carColour.equals("Black") | carColour.equals("Red"))
                    {
                        colour = carColours;
                    }
                    else
                    {
                        colour = "Black";
                    }
                }
                `
                            ]},
        ]   
    },
  ],
};

const CnONote2 = () => {
  const [currentSection, setCurrentSection] = useState('CnO2');
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

export default CnONote2;
