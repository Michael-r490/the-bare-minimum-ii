import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';
import API from '../../../api';

const slides = {
    FSM: [
        { 
         id: 'FSM-slide1', 
        title: 'Introduction to Finite State Machines', 
         content: [
          'Finite State Machines (FSMs) offer a different perspective on regular expressions. A FSM describes the behaviour of a Regular Expression (RegEx). Each FSM is composed of the following 5-tuple (Q, Σ, δ, q0, F) where',
           { type: 'bullet', items: [
            'Q: a finite set of states',
            'Σ: a finite alphabet set',
            'δ: Q.Σ → Q: transition function - a set of maps from states and inputs into states',
            'q0: an initial state (q0 ∈ Q)',
            'F: a set of final/accepting states (F ⊆ Q)',
           ] },
          'FSM’s are abstract machines that can only be in one of a finite number of states (Q) at any given time'
      ]
    },
    { 
      id: 'FSM-slide2', 
      title: 'States', 
      content: [
        'The set of states usually describes the current state of the machine. ',
        'The current state of the machine is usually dependent on the previous state of the machine. There are always two special states: ',
        '1. Start State',
        { type: 'bullet', items: [
          'The FSM always begins in this state. The start state is usually represented with an arrow "pointing at it from anywhere". (“like a funnel to feed it strings, piece by piece”)',
        ] },
        '2. Finish State',
        { type: 'bullet', items: [
          'The FSM must finish in this state (or one of these states) if the language is to be recognised (or accepted).',
          'Finish states are those where the machine reports accepts the input. ',
          'Accepting states are usually represented by double circles. ',
        ] },
        'All other states are regarded as intermediate states. States are usually denoted using qx where x is some number. ',
      ]
    },
    { 
      id: 'FSM-slide3', 
      title: 'Alphabet & Transition Functions', 
      content: [
        '- Alphabet',
        'An alphabet Σ describes the accepted inputs for a machine. For instance, an alphabet could be:',
        { type: 'bullet', items: [
          '{0,1} – the language of only 0’s and 1’s ',
          '{a,b,c} – the language of only a’s, b’s, and c’s',
        ] },
        '- Transition Function',
        'The transition function for any state and alphabet symbol is one or more next states to transition into. ',
      ]
    },
    { 
      id: 'FSM-slide4', 
      title: 'Alphabet & Transition Functions Example', 
      content: [
        { type: 'image', src: '/FSMn1p1.png', alt: 'Scanner Example' },
        'The set of states are {q0,q1,q2,q3}, the alphabet is {a,b}',
        'q0 is the start state (symbolised with the triangle arrow in to it)',
        'q3 is the final state (symbolised the with the double circle)',
        'The transitions are represented by the arrows with the alphabet symbol above them.',
        'means that we leave state q0 to go to q1 if we get an “a” as input.'
      ]
    },
    { 
      id: 'FSM-slide5', 
      title: 'Alphabet & Transition Functions', 
      content: [
        'When using FSMs we often test strings from a language to see if they are accepted or rejected. ',
        'We define a string s that is accepted by a FSM as:',
        'It begins in the start state,',
        'Takes a transition for each symbol in the string,',
        'Finishes in a final state after every symbol in the string has been processed (consumed).'
      ]
    },
    { 
      id: 'FSM-slide6', 
      title: 'Transition Table', 
      content: [
        'An FSM can be represented in a table. This table will contain the states, alphabet and transitions. Taking the example above we can represent the FSM in a transition table as follows: ',
        'We define a string s that is accepted by a FSM as:',
        { type: 'image', src: '/FSMn1p2.png', alt: 'Scanner Example' },
      ]
    },
  ],
};

const FSMNotes = () => {
  const [currentSection, setCurrentSection] = useState('FSM');
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

export default FSMNotes;
