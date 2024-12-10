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
import Notes from './pages/notes/Methods1/Notes'; 


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
          <Route path="/notes/methods1/*" element={<Notes />} />
        </Routes>
    </UserContextProvider>
  )
}

export default App;