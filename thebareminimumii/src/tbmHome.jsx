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
        <h7>Complete Question Test Incomplete</h7>
      </header>
        <div className="sub-nav">
          <div className="list-item">Methods 1:</div>
          <div className="button-group">
            <button className="list-button" onClick={() => handleNavigate('Methods1')}></button>
          </div>

        <div className="list-item">Methods returning values:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>

        <div className="list-item">Methods with strings and arrays:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        <div className="list-item">Regular Expressions theory:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        <div className="list-item">Recursion:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        <div className="list-item">Finite Automata:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        <div className="list-item">Bubble sort:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        <div className="list-item">Binary search:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        <div className="list-item">Classes and Objects:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        <div className="list-item">Turing Machines:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        <div className="list-item">Revision:</div>
          <div className="button-group">
            <button className="list-button"></button>
          </div>
                
        </div>
    </div>
    </UserContextProvider>
  );
}
