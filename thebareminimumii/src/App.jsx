import './App.css'
import {Routes, Route} from 'react-router-dom'
// import Navbar from './components/Navbar'
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
import Home from './tbmHome';

import M1Notes from './pages/notes/Methods1/Notes'; 
import M1Question from './pages/notes/Methods1/Question'; 
import M1Note2 from './pages/notes/Methods1/Note2';
import M1Question2 from './pages/notes/Methods1/Question2'; 

import M2Notes from './pages/notes/Methods2/Notes'; 
import M2Note2 from './pages/notes/Methods2/Note2'; 
import M2Note3 from './pages/notes/Methods2/Note3'; 
import M2Question from './pages/notes/Methods2/Question'; 

import RegExNotes from './pages/notes/RegEx/Notes'; 
import RegExQuestion from './pages/notes/RegEx/Question'; 

import RecursionNotes from './pages/notes/Recursion/Notes';
import RecursionNote2 from './pages/notes/Recursion/Note2';
import RecursionNote3 from './pages/notes/Recursion/Note3';
import RecursionNote4 from './pages/notes/Recursion/Note4';
import RecursionQ from './pages/notes/Recursion/Question';

import FSMNotes from './pages/notes/FSM/Notes'; 
import FSMNote2 from './pages/notes/FSM/Note2';
import FSMNote3 from './pages/notes/FSM/Note3';
import FSMQuestion from './pages/notes/FSM/Question';

import SortAndSearchNotes from './pages/notes/SortAndSearch/Notes';
import SortAndSearchQ from './pages/notes/SortAndSearch/Question'; 
import SortAndSearchNote2 from './pages/notes/SortAndSearch/Note2'; 
import SortAndSearchNote3 from './pages/notes/SortAndSearch/Note3'; 

import CnONotes from './pages/notes/ClassAndObj/Notes'; 
import CnONote2 from './pages/notes/ClassAndObj/Note2'; 
import CnONote3 from './pages/notes/ClassAndObj/Note3'; 
import CnONote4 from './pages/notes/ClassAndObj/Note4'; 

import INotes from './pages/notes/Inheritance/Notes'; 

import TuringMachineNotes from './pages/notes/TuringMachines/Notes'; 
import TuringMachineNote2 from './pages/notes/TuringMachines/Note2'; 

axios.defaults.baseURL='http://localhost:8000';
axios.defaults.withCredentials=true

function App() {
  return (
    <UserContextProvider>
      <Toaster position = 'bottom-right' toastOptions={{duration:2000}} />
        <Routes>
          <Route path='/' element = {<Login />} />
          <Route path='/register' element ={<Register />} />
          <Route path='/login' element ={<Login />} />
          <Route path='/dashboard' element ={<Dashboard />} />

          <Route path='/tbhHome' element={<Home />} />

          <Route path="/notes/methods1/notes/*" element={<M1Notes />} />
          <Route path="/notes/methods1/question/*" element={<M1Question />} />
          <Route path="/notes/methods1/note2/*" element={<M1Note2 />} />
          <Route path="/notes/methods1/question2/*" element={<M1Question2 />} />

          <Route path="/notes/methods2/notes/*" element={<M2Notes />} />
          <Route path="/notes/methods2/note2/*" element={<M2Note2 />} />
          <Route path="/notes/methods2/note3/*" element={<M2Note3 />} />
          <Route path="/notes/methods2/question/*" element={<M2Question />} />

          <Route path="/notes/regex/notes/*" element={<RegExNotes />} />
          <Route path="/notes/regex/question/*" element={<RegExQuestion />} />

          <Route path="/notes/Recursion/Notes/*" element={<RecursionNotes />} />
          <Route path="/notes/Recursion/Note2/*" element={<RecursionNote2 />} />
          <Route path="/notes/Recursion/Note3/*" element={<RecursionNote3 />} />
          <Route path="/notes/Recursion/Note4/*" element={<RecursionNote4 />} />
          <Route path="/notes/Recursion/Question/*" element={<RecursionQ />} />

          <Route path="/notes/fsm/Notes/*" element={<FSMNotes />} />
          <Route path="/notes/fsm/Note2/*" element={<FSMNote2 />} />
          <Route path="/notes/fsm/Note3/*" element={<FSMNote3 />} />
          <Route path="/notes/fsm/Question/*" element={<FSMQuestion />} />

          <Route path="/notes/SortAndSearch/Notes*" element={<SortAndSearchNotes />} />
          <Route path="/notes/SortAndSearch/Question*" element={<SortAndSearchQ />} />
          <Route path="/notes/SortAndSearch/Note2*" element={<SortAndSearchNote2 />} />
          <Route path="/notes/SortAndSearch/Note3*" element={<SortAndSearchNote3 />} />

          <Route path="/notes/classandobj/Notes*" element={<CnONotes />} />
          <Route path="/notes/classandobj/Note2*" element={<CnONote2 />} />
          <Route path="/notes/classandobj/Note3*" element={<CnONote3 />} />
          <Route path="/notes/classandobj/Note4*" element={<CnONote4 />} />

          <Route path="/notes/inheritance/*" element={<INotes />} />

          <Route path="/notes/TuringMachines/Notes*" element={<TuringMachineNotes />} />
          <Route path="/notes/TuringMachines/Note2*" element={<TuringMachineNote2 />} />

        </Routes>
    </UserContextProvider>
  )
}

export default App;