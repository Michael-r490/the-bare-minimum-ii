import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import NavBar from '../components/Navbar';
import "../../authStyles.css";
import API from '../api';

export default function Register() {
  const navigate = useNavigate()
  const [data,setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const{name,email,password} = data
    try{
      const {data} = await API.post('/Register', {
        name,email,password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Register Successful!')
        navigate('/Login')
      }
    }catch(error){
        console.log(error)
    }
  }

  return (
    <div className="auth-page">
      <h1>The Bare Minimum</h1>
      <NavBar />
      <h2>Create new account</h2>
      <form className="auth-form" onSubmit={registerUser}>
        <label className="auth-label">Name</label>
        <input 
          type="text" 
          className="auth-input" 
          placeholder="enter name" 
          value={data.name} 
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label className="auth-label">Email</label>
        <input 
          type="email" 
          className="auth-input" 
          placeholder="enter email" 
          value={data.email} 
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label className="auth-label">Password</label>
        <input 
          type="password" 
          className="auth-input" 
          placeholder="enter password" 
          value={data.password} 
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button className="auth-button" type="submit">Submit</button>
      </form>
    </div>
  );
}
