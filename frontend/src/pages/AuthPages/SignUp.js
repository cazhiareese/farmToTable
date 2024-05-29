/**
 * This component renders a sign-up form for new users. It manages the form state, handles form submission, 
 * validates password confirmation, and makes a POST request to the server to register a new user. 
 * Upon successful registration, it navigates the user to the sign-in page.
 */

import React, { useState, useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import wheat from '../../images/wheat.png';
import logo from '../../images/ftt_bg.png';
import create from '../../images/up_create.png';


function SignUp(){
  // const [user, setUser] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [mname, setMname] = useState('')
  const [lname, setLname] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    // fetchUsers();
  }, [])

  // const fetchUsers = () => {
  //   axios
  //   .get('http://localhost:3001/sign-up')
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  // }

  const handleRegister = (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      console.log('Password mismatch!');
    }
    axios
    .post('http://localhost:3001/sign-up', { 
      firstName: fname, 
      middleName: mname, 
      lastName: lname, 
      email: email,
      password: password
    })
    .then(() => {
      alert('Sign up successful');
      setFname('')
      setMname('')
      setLname('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      navigate('/sign-in')
    })
    .catch((error) => {
      console.log(error)
      console.log('Register unsuccessful')
    })
  }

  return(
    <div className="bg-fttGreen text-fttGreen font-Roboto min-h-screen w-full flex justify-between absolute">
      <div></div>
      <img className=" absolute ml-16 top-40 left-10 h-52" src={logo}></img>
        <div className="bg-fttWhite rounded-3xl w-2/4 h-100 flex flex-col items-center my-6 mr-28 shadow">
          <img className='h-14 mb-8 mt-20' src={create}></img>
          <form className="flex flex-col items-center w-full " onSubmit={handleRegister}>
            <div className='w-8/12 flex flex-col'>
              <label for="fname" >First Name</label>
              <input className="input-auth" type="text" id="fname" required value={fname} onChange={(e) => setFname(e.target.value)}/>
              
              <label for="mname" >Middle name (optional)</label>
              <input className="input-auth" type="text" id="mname" value={mname} onChange={(e) => setMname(e.target.value)}/>

              <label for="lname" >Last Name</label>
              <input className="input-auth" type="text" id="lname" required value={lname} onChange={(e) => setLname(e.target.value)}/>

              <label for="email" >E-mail</label>
              <input className="input-auth" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

              <label for="password">Password</label>
              <input className="input-auth" type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

              <label for="confirmPassword">Confirm Password</label>
              <input className="input-auth" type="password" id="confirmPassword" name="confirmPassword"required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <button className=" bg-fttGreen text-fttWhite w-1/2 mt-4 py-2 rounded-md" type="submit" id="signUp">Register</button> 
            <p className='inline-block font-bold text-slate-400'> Already have an account?  
            <h1 className=" mb-12 mt-2 inline-block font-bold underline text-fttGreen"><Link  to={'/sign-in'}> Sign-in!</Link></h1></p>
            </form>
      </div>
      <img className='absolute bottom-0 w-1/3' src={wheat}></img>
      </div>
  )}

export default SignUp