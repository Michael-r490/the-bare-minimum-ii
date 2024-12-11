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
import M2Notes from './pages/notes/Methods2/Notes'; 
import RegExNotes from './pages/notes/RegEx/Notes'; 
import CnONotes from './pages/notes/ClassAndObj/Notes'; 
import FSMNotes from './pages/notes/FSM/Notes'; 
import INotes from './pages/notes/Inheritance/Notes'; 
import RecursionNotes from './pages/notes/Recursion/Notes'; 
import SortAndSearchNotes from './pages/notes/SortAndSearch/Notes'; 
import TuringMachineNotes from './pages/notes/TuringMachines/Notes'; 

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
          <Route path="/notes/methods2/*" element={<M2Notes />} />
          <Route path="/notes/regex/*" element={<RegExNotes />} />
          <Route path="/notes/classandobj/*" element={<CnONotes />} />
          <Route path="/notes/fsm/*" element={<FSMNotes />} />
          <Route path="/notes/inheritance/*" element={<INotes />} />
          <Route path="/notes/Recursion/*" element={<RecursionNotes />} />
          <Route path="/notes/SortAndSearch/*" element={<SortAndSearchNotes />} />
          <Route path="/notes/TuringMachines/*" element={<TuringMachineNotes />} />
        </Routes>
    </UserContextProvider>
  )
}

export default App;