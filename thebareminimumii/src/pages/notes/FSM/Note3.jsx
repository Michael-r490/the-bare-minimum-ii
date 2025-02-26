import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    FSMn3: [
        { 
         id: 'FSMn3-slide1', 
        title: 'Deterministic Finite State Automata (DFA)', 
         content: [
          'A deterministic finite automata (DFA) is a type of FSM that has only one transition for each label in a state. ',
          'In the following example we can see an example of this:',
          'The set of states is {q0,q1,q2,q3}',
           { type: 'bullet', items: [
            'Start state – q0',
            'Final state – q1',
            'The alphabet is {a , b}',
            'The transitions are represented by the arrows with the alphabet symbol on it.',
           ] },
      ]
    },
    { 
      id: 'FSMn3-slide2', 
      title: 'DFA', 
      content: [
        { type: 'image', src: '/FSMn3p1.png', alt: 'Scanner Example' },
        'Notice that each state has only one transition for one alphabet symbol leaving the state. ',
      ]
    },
    { 
      id: 'FSMn3-slide3', 
      title: 'DFA', 
      content: [
        'If we construct the transition table for the DFA we can see that each state will have two transitions – one for each alphabet symbol. ',
        { type: 'image', src: '/FSMn3p2.png', alt: 'Scanner Example'},
      ]
    },
    { 
      id: 'FSMn3-slide4', 
      title: 'Non-deterministic Finite Automata', 
      content: [
        'Non-deterministic finite automata (NFA) allow for multiple transitions with the same label for many states.',
        'This corresponds to two (or more) entries in a cell in the state transition table.',
        'It is not deterministic because the next state could be any one of a number of possible states. ',
        { type: 'image', src: '/FSMn3p3.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'FSMn3-slide5', 
      title: 'NFA', 
      content: [
        'If we are in state q3 and we get an input of a which arrow do we follow?',
        'We would follow all possible arrows, even if only one of them turns out to be correct. ',
        'So we have to go to q4, q5 and q6 and see what the next character will be.',
        'Consider the following NFA. In state q0, if we get an input of a, which state do we transition to? ',
        { type: 'image', src: '/FSMn3p4.png', alt: 'Scanner Example' },
        'We can either stay in q0 or move to q1. ',
      ]
    },
    { 
      id: 'FSMn3-slide6', 
      title: 'NFA', 
      content: [
        'An NFA has more than one entry in at least one cell of the State Transition Table.',
        'The transition table would be:',
        { type: 'image', src: '/FSMn3p5.png', alt: 'Scanner Example' },
      ]
    },
    { 
        id: 'FSMn3-slide6', 
        title: 'NFA', 
        content: [
          'Although DFA and NFA have distinct definitions, it can be shown that they are equivalent. ',
          'That is, for any NFA we can construct an equivalent DFA and vice versa.',
          'We can even convert between them but it’s not straight forward. ',
          'Both NFA and DFA only recognise regular languages. ',
        ]
      },
  ],
};

const FSMNote3 = () => {
  const [currentSection, setCurrentSection] = useState('FSMn3');
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

export default FSMNote3;
