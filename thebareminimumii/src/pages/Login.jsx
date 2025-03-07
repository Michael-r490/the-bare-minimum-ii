import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/Navbar';
import "../../authStyles.css";

export default function Login() {
  const navigate = useNavigate()
  const[data,setData]=useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const{email, password} = data
    try{
      const{data} = await axios.post('/login', {
        email,
        password
      });
      if(data.error){
        toast.error(data.error)
      }else {
        setData({});
        toast.success('Login Successful!')
        navigate('/tbhHome')
      }
    }catch(error){

    }
  }

  return (
    <div className="auth-page">
      <h1>The Bare Minimum</h1>
      <NavBar />
      <h2>Login to your account</h2>
      <form className="auth-form" onSubmit={loginUser}>
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
        <button className="auth-button" type="submit">Login</button>
      </form>
    </div>
  );
}
