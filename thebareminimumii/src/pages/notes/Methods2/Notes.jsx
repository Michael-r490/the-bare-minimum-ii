import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    methods2: [
        { 
         id: 'methods2-slide1', 
        title: 'Introducing scope of variables, using your public static int sigma function in another program.', 
         content: [

      ]
    },
    { 
      id: 'methods2-slide2', 
      title: 'What is scope? And what are the scope rules?', 
      content: [
        'Every variable in Java is characterised by a duration and a scope. A variable’s duration is the time during which it exists, and its scope is the portion of the program from which the variable can be addressed.',
        'There are two types of scope, (1) block scope (2) class scope. In this lesson we will focus on block scope but we will be returning to class scope later in the module and we will refer to this concept of scope throughout the module.',
        'The scope of a variable is the part of the program in which you can access it. The scope of a local variable ranges from its declaration until the end of the block or for statement in which it is declared.',
        'The scope of a method’s formal parameter variable is the entire method. ',
        'A variable that is defined in within a method is called a local variable. The scope of a local variable ranges from its declaration until the end of the block { } or for statement ( for (int I = 1;…..   ) in which it is declared.',
        'The variable declared in a for statement only extends to the structure of that statement.',
      ]
    },
    { 
      id: 'methods2-slide3', 
      title: 'Scope example; for loop statement', 
      content: [
        'The scope of a local variable (int square) ranges from its declaration until the end of the block in which it is declared.',
        {type: 'code', items: [
          '',
          'public static void main(String []args){',
          '   int sum = 0;',
          '   for (int i=1; i<=10; i++){',
          '     int square = i*i;',
          '     sum = sum + square;',
          '   }',
          '   // variable square is not available here',
	        '   System.out.println(sum);',
          '}  //end of main'
        ]},
        
      ]
    },
    { 
      id: 'methods2-slide4', 
      title: 'Scope example; for loop statement', 
      content: [
        'The variable declared in a for statement (int i ) only extends to the end of the for statement. After the for statement finishes, the variable is no longer available or accessible. (its scope is the for loop block in which it was declared).',
        {type: 'code', items: [
          '',
          'public static void main(String []args){',
          '   int sum = 0;',
          '   for (int i=1; i<=10; i++){',
          '     sum = sum + i*i;',
          '   }',
          '   // variable i is not available here',
	        '   System.out.println(sum);',
          '}  //end of main'
        ]},
        
      ]
    },
    { 
      id: 'methods2-slide5', 
      title: 'Scope example, overlapping scope error.', 
      content: [
        'It is illegal to declare two variables with the same name in the same method in such a way that their scopes overlap. The code below is illegal because the method scope overlaps with the for loop scope. The variable n is declared twice in overlapping scopes.',
        {type: 'code', items: [
          '',
          'public static int sumOfSquare(int n){',
          '   int sum = 0;',
          '   for (int i=1; i<=n; i++){',
          '     int n = i*i;  //ERROR',
          '     sum = sum + n',
          '   }',
	        '   return sum;',
        ]},       
      ]
    },
    { 
      id: 'methods2-slide6', 
      title: 'Scope example of non-compiling code.', 
      content: [
        'This code will not compile. The scope of main does not extend outside main. The variable sideLength is not accessible in the scope for cubeVolume. (BlueJ has colour coded scope to remind you!)',
        {type: 'code', items: [
          '',
          'public static void main(String []args){',
          '   double sideLength = 10; // Error',
          '   int result = cubeVolume();',
          '   System.out.println(result);',
          '}',
          '',
          '',
          'public static int cubeVolume(){',
          '   return sideLength*sideLength*sideLength;',
          '}',
        ]},       
      ]
    },
    { 
      id: 'methods2-slide7', 
      title: 'Scope example; Everything is fine here!', 
      content: [
        'This code will compile because the variable int result is declared in two separate methods whose scopes do not overlap.',
        {type: 'code', items: [
          '',
          'public static void main(String []args){',
          '   int result = square(3) + square(4); // OK',
          '   System.out.println(result);',
          '}',
          '',
          '',
          'public static int square(int n){',
          '   int result = n*n; //OK',
          '   return result;',
          '}',
        ]},       
      ]
    },
    { 
      id: 'methods2-slide8', 
      title: 'Scope example; Two variables with the same name!', 
      content: [
        'This code will compile because the variable int i is declared in two different for loop scopes, even within the same method.',
        {type: 'code', items: [
          '',
          'public static void main(String []args){',
          '   int sum = 0;',
          '   for (int i = 1; i <=10; i++){   //OK',
          '       sum = sum + i;',
          '   }',
          '   for (int i = 1; i <=10; i++){   //OK',
          '       sum = sum + i * i;',
          '   }',
          '   System.out.println(sum);',
          '}',
        ]},       
      ]
    },
    { 
      id: 'methods2-slide8', 
      title: 'Overlapping scope example; Two variables with the same name!', 
      content: [
        'This code will not compile because the variable int i is declared in a scope that spans the whole method { }. Therefore you can not declare i again in a scope within this scope {}.',
        {type: 'code', items: [
          '',
          'public static void main(String []args){',
          '   int sum = 0;',
          '   int i =0;',
          '   for (i = 1; i <=10; i++){   //OK',
          '       sum = sum + i;',
          '   }',
          '   for (int i = 1; i <=10; i++){   //Error',
          '       sum = sum + i * i;',
          '   }',
          '   System.out.println(sum);',
          '}',
        ]},       
      ]
    },
    { 
      id: 'methods2-slide9', 
      title: 'Scope examples; (1)code block; (2) method call', 
      content: [
        {type: 'code', items: [
          '',
          'public class MethodScope',
          '{',
          '     public static void main(String []args){',
          '         int x = getSum(5,7);',
          '         System.out.println("The sum of the two numbers is : " + x);',
          '         System.out.println("Method Variables are not available outside the method");',
          '',
          '         {',
          '         int y = 7;',
          '         }',
          '',
          '         //variable y is out of the scope at this point',
          '         System.out.println("The Variables y is unavailable outside its creation code block");',
          '         int y = 0;',
          '         //we can create a variable of the same name becasue the previous y was out of the scope',
          '     }',
          '',
          '     public static int getSum(int a, int b){',
          '         int result = a + b;',
          '         return result;',
          '     }',
          '}',
        ]},       
      ]
    },
    { 
      id: 'methods2-slide10', 
      title: 'Scope examples; inside and outside for loop', 
      content: [
        {type: 'code', items: [
          '',
          'public class ForLoopScope',
          '{',
          '     public static void main(String []args){',
          '         int x;',
          '         for (int x = 0; x < 3; x++){',
          '             System.out.println("printing the value of x : " + x);',
          '         }',
          '',
          '         System.out.println("It is ok to print x as it was declared outside of the scope" + x);',
          '',
          '         for (int count = 0; count < 2; count++){',
          '             System.out.println("printing the value of count : " + count);',
          '         }',
          '         //It is an error to try access the variable count here ',
          '     }',
          '}',
        ]},       
      ]
    },
    { 
      id: 'methods2-slide11', 
      title: 'Class Scope of a class variable', 
      content: [
        {type: 'code', items: [
          '',
          'public class TestScope',
          '{',
          '     //class variable',
          '     //This variable x will be in scope through out the class',
          '     //This means that it can be accessible in any method defined in this class TestScope;',
          '     //including the main method and any other methods defined inside TestScope.',
          '     public static int x=0;',
          '',
          '     public static void main(String []args){',
          '         x = 25;',
          '         System.out.println("the value of x is : " + x);',
          '         printValue();',
          '      }',
          '',
          '      public static void printValue(){',
          '         System.out.println("In the printValue method the value of x changed to : " + x);',
          '     }',
          '}',
        ]},       
      ]
    },
  ],
};

const M2Notes = () => {
  const [currentSection, setCurrentSection] = useState('methods2');
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

export default M2Notes;
