/**
 * This component renders a sign-in form for existing users. It manages the form state, handles form submission, 
 * and makes a POST request to the server to authenticate the user. Upon successful authentication, it stores 
 * the authentication token in local storage and redirects the user to either the homepage or admin dashboard 
 * based on their role.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import welcome from '../../images/in_welc.png';
import wheat from '../../images/wheat.png';
import logo from '../../images/ftt_bg.png';
import { jwtDecode } from 'jwt-decode';
function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  function getUserRole() {
    const authToken = localStorage.getItem('token');
    //console.log(authToken);
    if (!authToken) return null;
  
    try{
      //decode error
      const decoded = jwtDecode(authToken);
      //console.log('helo');
      //console.log(decoded.type);
      return decoded.type;
    } catch (error) {
      return null;
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const res = await axios
      .post('http://localhost:3001/sign-in', { 
        email: email,
        password: password
      })
      const authToken = res.data;

      alert('Sign in successful')
      setEmail('')
      setPassword('')
      localStorage.setItem('token', authToken)
      let role = await getUserRole()
      //console.log(role)
      if (role === 'admin'){
        navigate('/admin')
      }else{
        navigate('/')
      }
      window.location.reload()
      
    }catch (error){
    }
  }

  return(
    <div className="bg-fttGreen text-fttGreen font-Roboto min-h-screen w-full flex justify-between absolute">
      <div className="bg-fttGreen text-fttGreen font-Roboto min-h-screen w-full flex justify-between absolute">
      <div></div>
      <img className=" absolute ml-16 top-12 left-10 h-52"  src={logo}></img>
        <div className="bg-fttWhite rounded-3xl w-2/4 h-100 flex flex-col items-center my-6 mx-16 shadow justify-center">
        <img className='h-14 mb-16'src={welcome}></img>
          <form className="flex flex-col items-center w-full " onSubmit={handleLogin}>
            <div className='w-8/12 flex flex-col'>
              <label for="email" className="signIn-textDesc" >E-mail</label>
              <input className='input-auth w-full' type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              
              <label for="password" className="signIn-textDesc">Password</label>
                <input className='input-auth w-full' type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              
            </div>
            <button className=" bg-fttGreen text-fttWhite w-1/2 mt-4 py-2 rounded-md" type="submit" id="signIn">Sign in</button> 
            <p className='inline-block font-bold text-slate-400'> Don't have an account?  
            <h1 className=" mb-12 mt-2 inline-block font-bold underline text-fttGreen"><Link  to={'/sign-up'}> Register here!</Link></h1></p>
            </form>
      </div>
      <img className='absolute bottom-0 w-1/3' src={wheat}></img>
      </div>
    </div>
  )
}

export default SignIn