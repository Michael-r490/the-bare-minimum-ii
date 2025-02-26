import React from 'react';
import './tbmHome.css';
import MainNav from './components/MainNav'; 
import { UserContextProvider } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = (section) => {
    navigate(`/notes/${section}`); // Dynamically navigate to the section's notes
  };
  return (
    <UserContextProvider>
    <div className="TBM">
      <MainNav/>
      <header className="CS162-header">
        <h2>CS162</h2>
        <h7>
           Complete <span role="img" aria-label="Complete">✅</span>
           Questions <span role="img" aria-label="Questions">❔</span> 
           Test <span role="img" aria-label="Test">📄</span>
           Incomplete<span role="img" aria-label="Incomplete">⬜</span>
        </h7>
      </header>
        <div className="sub-nav">
          <div className="list-item">Methods 1:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('Methods1/Notes')}></button>
            <button className="list-button" onClick={() => handleNavigate('Methods1/Question')}></button>
            <button className="list-button" onClick={() => handleNavigate('Methods1/Note2')}></button>
            <button className="list-button" onClick={() => handleNavigate('Methods1/Question2')}></button>
          </div>

        <div className="list-item">Methods 2:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('Methods2/Notes')}></button>
            <button className="list-button" onClick={() => handleNavigate('Methods2/Note2')}></button>
            <button className="list-button" onClick={() => handleNavigate('Methods2/Note3')}></button>
            <button className="list-button" onClick={() => handleNavigate('Methods2/Question')}></button>
          </div>

        <div className="list-item">Regular Expressions:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('RegEx/Notes')}></button>
            <button className="list-button" onClick={() => handleNavigate('RegEx/Question')}></button>
          </div>
                
        <div className="list-item">Recursion:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('Recursion/Notes')}></button>
            <button className="list-button" onClick={() => handleNavigate('Recursion/Note2')}></button>
            <button className="list-button" onClick={() => handleNavigate('Recursion/Note3')}></button>
            <button className="list-button" onClick={() => handleNavigate('Recursion/Note4')}></button>
          <button className="list-button" onClick={() => handleNavigate('Recursion/Question')}></button>
          </div>
                
        <div className="list-item">Finite State Machines:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('FSM/Notes')}></button>
            <button className="list-button" onClick={() => handleNavigate('FSM/Note2')}></button>
            <button className="list-button" onClick={() => handleNavigate('FSM/Note3')}></button>
            <button className="list-button" onClick={() => handleNavigate('FSM/Question')}></button>
          </div>
                
        <div className="list-item">Sorting and Searching:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('SortAndSearch/Notes')}></button>
            <button className="list-button" onClick={() => handleNavigate('SortAndSearch/Question')}></button>
            <button className="list-button" onClick={() => handleNavigate('SortAndSearch/Note2')}></button>
            <button className="list-button" onClick={() => handleNavigate('SortAndSearch/Note3')}></button>
          </div>
                
        <div className="list-item">Classes and Objects:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('ClassAndObj/Notes')}></button>
            <button className="list-button" onClick={() => handleNavigate('ClassAndObj/Note2')}></button>
            <button className="list-button" onClick={() => handleNavigate('ClassAndObj/Note3')}></button>
            <button className="list-button" onClick={() => handleNavigate('ClassAndObj/Note4')}></button>
          </div>
                
        <div className="list-item">Inheritance:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('Inheritance')}></button>
          </div>
                
        <div className="list-item">Turing Machines:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('TuringMachines/Notes')}></button>
            <button className="list-button" onClick={() => handleNavigate('TuringMachines/Note2')}></button>
          </div>
        </div>
    </div>
    </UserContextProvider>
  );
}
