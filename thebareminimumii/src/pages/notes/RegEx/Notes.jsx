import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNav from '../../../components/MainNav';

const slides = {
    RegEx: [
        { 
         id: 'RegEx-slide1', 
        title: 'Regular Expressions (RegEx)', 
         content: [
      ]
    },
    { 
      id: 'RegEx-slide2', 
      title: 'Introduction', 
      content: [
        { type: 'bullet', items: [
          'Regular Expressions are routinely used for validating input and retrieving information',
          'They ensure some level of validity when users are required to input (including web forms):'
        ] },
        '-peoples name, postal address, birth dates, Zip code, phone numbers, , credit card numbers ',
        '-user ID names, passwords (& levels of security), email addresses, WWW address, file names ',
        '-product codes, valid dates, cash amounts, MU Moodle course codes ... ',
        
      ]
    },
    { 
      id: 'RegEx-slide3', 
      title: 'Introduction', 
      content: [
        'We can find/specify any of the following:',
        { type: 'bullet', items: [
          'The word "car" when it appears as an isolated word',
          'The sequence of characters "car" appearing consecutively in any context, such as in "car", "cartoon", or "bicarbonate"',
          'The characters "car" occurring in that order with other characters between them, such as in "Icelander" or "chandler"',
          'The word "car" when preceded by the word "blue" or "red"',
          'The word "car" when not preceded by the word "motor"',
          'A Euro sign immediately followed by one or more digits, and then optionally a period and exactly two more digits (for example, “€100" or “€245.99").',
        ] },
      ]
    },
    { 
      id: 'RegEx-slide4', 
      title: 'Regular Expresssions(RegEx)', 
      content: [
        { type: 'bullet', items: [
          'A concise means of matching strings ',
          'Written in a formal language that is VERY widely used',
        ] },
        '-Java, C, C++, .Net, Python, Perl, Ruby, Tcl, Unix (grep), and many text editors…',
      ]
    },
    { 
      id: 'RegEx-slide5', 
      title: 'String.matches(String regex)', 
      content: [
        { type: 'bullet', items: [
          'Regular expressions are used by both the ',
        ] },
        '-String class using matches() method, and the Pattern & Matcher classes',
        { type: 'bullet', items: [
          'boolean bool = “abbbb”.matches(“ab*”)',
        ] },
        '"abbbb" -> Ordinary String',
        '"ab*" -> Regulare Expression',
        { type: 'bullet', items: [
          'The general format for the matches method is',
        ] },
        '“Problem-string”.matches(“RegEx”)',
      ]
    },
    { 
      id: 'RegEx-slide6', 
      title: 'Example .matches', 
      content: [
        { type: 'bullet', items: [
          '“abc”.matches(“abc”)         //true',
          '“Abc”.matches(“Abc”)         //true',
          '“Abc”.matches(“abc”)         //false',
          '“aabbaba”.matches(“[ab]*”)   //true',
          '“aabbaba”.matches(“a[ab]*”)  //true',
          '“bbaba”.matches(“a[ab]*”)    //false',
        ] },
      ]
    },
    { 
      id: 'RegEx-slide7', 
      title: 'RegEx as a String Template', 
      content: [
        { type: 'bullet', items: [
          'We can think of the regular expression grammar as a template against which to match strings',
          'Typically, we either ',
        ] },
        '-find something that matches a template from a large volume of data ',
        '-Ensure that a specific datum (a piece of information) matches a template',
        '-Looking for valid phone numbers, student ID, names, variables ... ',
      ]
    },
    { 
      id: 'RegEx-slide8', 
      title: 'Regular Expression Grammar', 
      content: [
        { type: 'bullet', items: [
          'Sequence (and) is the 1st character followed by 2nd character…',
        ] },
        '-abc  //exact match',
        '-Abc  //Case sensitive',
        { type: 'bullet', items: [
          'Alternatives (or) are enclosed in []',
        ] },
        '-ca[bdn]  //cab,cad,can',
        '-Diarm[au]id //alternative spelling',
        '-[Dd]ean  //possible capitals',
        { type: 'bullet', items: [
          'Not [^]',
        ] },
        '-ca[^brt]  //can, ca... but not cab, car, cat',
        { type: 'bullet', items: [
          'Ranges',
        ] },
        '-[a-z]  //any lowercase letter',
        '-[A-Z]  //any capital letter',
        '-[0-9]  //any digit',
        '-[a-z&&[^xyz]] //a-z but NOT x, y or z',

      ]
    },
    {
      id: 'RegEx-slide9',
      title: 'Regular Expression Grammar',
      content: [
        { type: 'bullet', items: [
            'Zero or more times (Kleene *)',
          ] },
        '-ab*  //a, ab, abb, abbbb',
        '-[ab]*  //aa, aabbababba, aabbaba, abba, bbba',
        { type: 'bullet', items: [
            'One or more times (+)',
          ] },
        '-ab+  //ab, abb, abbbb',
        '-[0-9]+  //any sequence of >= 1 digits',
        '-[A-Z]+  //any sequence of >= 1 capitals',
        { type: 'bullet', items: [
            'Zero or once (An Optional character)',
          ] },
        '-Colou?r  //Colour, Color',
        '-rea?d  //red, read, but not reed',
        { type: 'bullet', items: [
          'Counted number of items',
        ] },
      '-x{3}  //xxx only',
      { type: 'bullet', items: [
          'At least a number of items',
        ] },
      '-x{3,}  //xxx, xxxx, xxxxxxxx, etc. (3 or more)',
      { type: 'bullet', items: [
          'Between 2 and 4 instances of a character',
        ] },
      '-x{2,4}  //xx, xxx, and xxxx only',
      { type: 'bullet', items: [
          'Top-level domain in an email address',
        ] },
      '-.[a-z]{2,4}  //.ie, .com, .info',
      { type: 'bullet', items: [
        'The dot (.) is the wild character which matches any single character except the new line character',
      ] },
      '-re.d  //matches read, reed, rezd',
      ]
    },
    {
      id: 'RegEx-slide10',
      title: 'Regular Expression Grammar - Special Characters',
      content: [
        { type: 'bullet', items: [
            'Special characters are occasionally used within “complicated” strings',
          ] },
        '-To include the " character in a string, use a backslash:',
        '  - "the quote \\" mark" //matches the quote " mark',
        { type: 'bullet', items: [
            'To include a backslash in a string:',
          ] },
        '- "one \\\\ character" //matches one backslash \\ character',
        '- "two backslash \\\\\\\\ characters" //matches two backslashes \\\\ characters',
      ]
    },
    {
      id: 'RegEx-slide11',
      title: 'Regular Expression Grammar - Special Characters & Escapes',
      content: [
        { type: 'bullet', items: [
            'The dot (.) will match any character',
          ] },
        { type: 'bullet', items: [
            'The backslash (\\) is a special character, meaning "do not treat the following character in the normal way"',
          ] },
        '-\\.  //matches the full stop character',
        '-\\b  //matches a word boundary',
        '-\\s  //matches white space (space or tab)',
        '-\\\\  //matches the backslash \\ character',
        '-\\t  //matches the tab character',
      ]
    },
  ],
};

const RegExNotes = () => {
  const [currentSection, setCurrentSection] = useState('RegEx');
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

export default RegExNotes;
