import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    Inheritance: [
        { 
         id: 'Inheritance-slide1', 
        title: 'Introduction to Inheritance', 
         content: [
           'With inheritance, we can keep the functionality and attributes that we do need and then write new code for the extra stuff',
           'Java allows us to reuse class definitions and extend functionality by allowing one class (the child or subclass) to inherit from another class (the parent or superclass). ',
           'This is very important as it allows developers to create software that is based on previously proven super classes (or previously proven parent classes).',
      ]
    },
    { 
      id: 'Inheritance-slide2', 
      title: 'Inheritance: Example', 
      content: [
        'Consider the case of representing a vehicle.',
        'We know that all vehicles will have some ID associated with them (registration plate number), a make and a model. If we consider the following vehicles: a truck, a car and a bicycle.',
        'All of these will have these characteristics associated with them. In addition, a truck will have a load capacity (maximum weight it can carry legally) and a number of axels under it.',
        'A car will have a number of doors associated with it and, the number of passengers it can legally carry.',
        'A bicycle will have the number of passengers it can carry and, the height of the saddle associated with it.',
        'Even though all three vehicles are distinct, they have common features and we use inheritance as a means to represent this scenario and access these features.',

      ]
    },
    { 
      id: 'Inheritance-slide3', 
      title: 'Inheritance: Example', 
      content: [
        { type: 'image', src: '/In1p1.png', alt: 'Scanner Example' },
        'The Truck, Car and Bicycle classes can keep the functionality and attributes of the Vehicle superclass and in addition have some more specific ones of their own.',
        'For example, in the Car class, it will have all the methods from Vehicle, namely, getidNum(), getModel(), setModel(), toString().',
        'It can also have specific methods like setNoDoors(), getnoPassengers(), setNoPassengers(), …',
        'This means that although all classes have access to the methods and attributes in the Vehicle superclass we only have to write the code for them once',
      ]
    },
    { 
      id: 'Inheritance-slide4', 
      title: 'Inheritance: Example 2', 
      content: [
        'Let us look at another example of inheritance in java. Take an example of a Dog class where every dog has the following attributes:',
        {type: 'bullet', items:[
          'Breed',
          'Colour',
          'Owner',
          'ChasesSquirrels',
        ]},
        'In addition the Dog also has functionality to speak (growl and bark!). ',
        {type: 'code', items:[
         `

         `
        ]},
        'We also have a Cat class which has the following attributes:',
        {type: 'bullet', items:[
          'Breed',
          'Colour',
          'Owner',
          'Works For Super Villain',
        ]},
        'This looks very similar to our Dog class.',
        {type: 'code', items:[
          `
 
          `
         ]},
        'When we have shared attributes like this we can create a superclass with these and then inherit them in sub classes – our superclass will be Animal'
      ]
    },
    { 
      id: 'Inheritance-slide5', 
      title: 'Inheritance: Example 2', 
      content: [
        'Sample code to represent the Animal class is:',
        {type: 'code', items:[
          `
          public class Animal
          {
              //Atrributes
              private String breed;
              private String Colour;
              private String owner;

              public Animal (String breed, String Colour, String owner)
              {
                  this.breed = breed;
                  this.colour = colour;
                  this.owner = owner;
              }            
              public String gerOwner()
              {
                  return owner;
              }
              public void speak()
              {
                  System.out.println("Grrr! Argh!");
              }
          }
          `
         ]},
      ]
    },
    { 
      id: 'Inheritance-slide6', 
      title: 'Inheritance: Example 2', 
      content: [
        'This Animal class could be used to represent both a Dog and a Cat.',
        'However our Dog class has a chaseSquirrels attribute and our Cat class has a worksForSuperVillain attribute.',
        'So how do we inherit the shared traits?',
        'We use the Java keyword extends.',
        'This allows us to extend the design of the parent (super) class by enabling us to inherit all its attributes and functionality. ',
      ]
    },
    { 
      id: 'Inheritance-slide7', 
      title: 'Inheritance: Example 2', 
      content: [
        'The general Dog constructor might look like below.',
        'super(breed, colour, owner) is a parameterised constructor for the parent class (in this case Animal)',
        {type: 'code', items:[
          `
          public class Dog extends Animal
          {
              public Dog()
              {
                  //Call the parent general constructor
                  super();
                  //Set attributes for Dog object
                  this.chasesSquirrels = true;

              }
              public Dog (boolean chasesSquirrels, String breed, String colour, String owner)
              {
                  //Call the parent general constructor
                  super(breeed, colour, owner);
                  //Set attributes for Dog object
                  this.chasesSquirrels = chasesSquirrels;
              }
          }
          `
         ]},
      ]
    },
    { 
      id: 'Inheritance-slide8', 
      title: 'Inheritance: Example 2', 
      content: [
        'We can do something similar for the Cat class. ',
        {type: 'code', items:[
          `
          public class Cat extends Animal
          {
              public Cat()
              {
                  //Call the parent general constructor
                  super();
                  //Set attributes for Cat object
                  this.worksForSuperVillain = true;

              }
              public Cat (boolean worksForSuperVillain, String breed, String colour, String owner)
              {
                  //Call the parent general constructor
                  super(breeed, colour, owner);
                  //Set attributes for Cat object
                  this.worksForSuperVillain = worksForSuperVillain;
              }
          }
          `
         ]},
      ]
    },
    { 
      id: 'Inheritance-slide9', 
      title: 'Inheritance: Example 2', 
      content: [
        'We have now created a superclass, Animal, and two sub classes, Dog and Cat.',
        'We now need to create a main() method (in a separate tester class) to allow us create instances of each of these, modify their attributes and print the values stores in the attributes.',
        {type: 'code', items:[
          `
          public static void main(String args[])
          {
              Dog fido = new Dog();
              System.out.println("Fido chases Squirrels " + fido.getChasesSquirrels());

              Cat myCat = new Cat("Toby", "black", "Mary Jones", true);
              System.out.println("My Cat's breed is a " + myCat.getBreed());
          }
          `
         ]},
          'The getChasesSquirrels() method from the subclass Dog',
          'We call the getBreed() method from the superclass Animal.',
          'Inheritance allows this.',
      ]
    },
    { 
      id: 'Inheritance-slide10', 
      title: 'Override', 
      content: [
        'To override a super class method and change its content we simply re-code the same method in the sub class.',
        'However we must maintain the same (or similar) method signature. ',
        {type: 'code', items:[
          `
          public void speak()
          {
              System.out.println("Grrr! Argh!");
          }
          `
         ]},
         'In our subclass Dog we can write the same method signature but with different method content. For example: ',
         {type: 'code', items:[
          `
          public void speak()
          {
              System.out.println("Woof! Woof!");
          }
          `
         ]},
      ]
    },
    { 
      id: 'Inheritance-slide11', 
      title: 'Override', 
      content: [
        'If we do override a method in the superclass that the access modifiers for the overridden method cannot be more restrictive that the method overriding it.',
        'Now when we call the speak() method in main() for an Animal or a Dog, it will do different things:',
        {type: 'code', items:[
          `
          public static void main(String args[])
          {
              Animal a = new Animal();
              Dog d = new Gog();

              a.speak();     //prints "Grrr! Argh!"
              d.speak();     //prints ""Woof! Woof!""
          }
          `
         ]},
      ]
    },
  ],
};

const INotes = () => {
  const [currentSection, setCurrentSection] = useState('Inheritance');
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

export default INotes;
