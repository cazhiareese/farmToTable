import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function SignIn(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const res = await axios
      .post('http://localhost:3001/sign-in', { 
        email: email,
        password: password
      })
      const authToken = res.data.token;
      alert('Sign in successful')
      setEmail('')
      setPassword('')
      navigate('/')
      window.location.reload()
      localStorage.setItem('token', authToken)

    }catch (error){

    }

  }

  return(
    <div className="signIn-main">
      <div className="signIn-div-form">
        <div className="signIn-form">
          <h1 className="signIn-welcome">Welcome Back!</h1>
          <div className="signIn-textField-div">
            <form className="signIn-textField" onSubmit={handleLogin}>
              <label for="email" className="signIn-textDesc" >E-mail</label><br/>
              <input type="text" id="email" name="email" size="35" required value={email} onChange={(e) => setEmail(e.target.value)} /><br/><br/>
              <label for="password" className="signIn-textDesc">Password</label><br/>
              <input type="password" id="password" name="password" size="35"required value={password} onChange={(e) => setPassword(e.target.value)} /><br/><br/><br/>
              <button type="submit" id="signIn">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className="signIn-logo">

      </div>
    </div>
  )
}

export default SignIn