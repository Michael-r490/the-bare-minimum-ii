import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    TuringMachine: [
    { 
         id: 'TuringMachine-slide1', 
        title: 'Introduction to TuringMachine', 
         content: [
          'A Turing Machine is a theoretical (universal) computer.',
          'It is a mathematical model of computation that can be used to simulate any computer algorithm, no matter how complicated it is.',
          'The Turing machine was invented in 1936 by British Computer Scientist Alan Turing.',
      ]
    },
    { 
      id: 'TuringMachine-slide2', 
      title: 'Example of Turing Machine', 
      content: [
        { type: 'image', src: '/TMn1p1.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'TuringMachine-slide3', 
     title: 'Overview of a Turing Machine', 
      content: [
        'A Turing Machine (TM) is an idealised computing device consisting of a read/write head with a paper tape passing through it.',
        'The tape is of unbounded length.',
        'The tape is divided into squares, each square bearing a single symbol - "0" or "1", for example.',
        'The tape acts as the machines general purpose storage medium, serving both as the means of input and output and also as a working memory for storing the results of intermediate (partial) steps of the computation',
        'The machine needs to keep track of the previous state it was in when it moves to a new state.',
        'There must be a finite number of symbols used in the alphabet that the Turing machine can recognise.',
        'The read/write head is programmable.',
        'To compute with the device, you program it, write the input on the tape, place the head over the square containing the leftmost input symbol, and set the machine in motion.',
        'Once the computation is completed, the machine will come to a halt with the head positioned over the square containing the leftmost symbol of the output (or elsewhere if so programmed)',
      ]
    },
    { 
      id: 'TuringMachine-slide4', 
     title: 'Overview of a Turing Machine', 
      content: [
        'There are just six types of fundamental operation that a Turing machine performs in the course of a computation.',
        'These are to:',
        {type:'bullet',items:[
          'read the symbol that the head is currently over',
          'write a symbol on the square the head is currently over it',
          'will need to clear the symbol currently here, if any',
          'move the tape left one position',
          'move the tape right one position',
          'change state',
          'halt',
        ]},
        'A program or "instruction table" for a Turing machine is a finite collection of instructions, each calling for certain operations to be performed if certain conditions are met.',
        'Every instruction is of the form:',
        {type:'bullet',items:[
        'If the current state is n and the symbol under the head is x, then write y on the square under the head, go to state m, and move one square left or right',
        ]},
      ]
    },
    { 
      id: 'TuringMachine-slide5', 
      title: 'Example of Instruction Table', 
      content: [
        'An example of one such table might be:',
        { type: 'image', src: '/TMn1p2.png', alt: 'Scanner Example' },
      ]
    },
    { 
      id: 'TuringMachine-slide6', 
      title: 'Example of Instruction Table', 
      content: [
        'There are three special states: start state, accept state and reject state.',
        'The Turing Machine computes until it produces an output: ',
        'It either accepts or rejects by entering designated halt states.',
        'If it never enters an accepting or rejecting state the Turing Machine goes on forever, never halting.',
        'Any real-world computer can be simulated by a Turing machine',
      ]
    },
  ],
};

const TuringMachineNotes = () => {
  const [currentSection, setCurrentSection] = useState('TuringMachine');
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

export default TuringMachineNotes;
