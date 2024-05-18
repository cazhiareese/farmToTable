import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

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
      navigate('/signin')
    })
    .catch((error) => {
      console.log('Register unsuccessful')
    })
  }


  return(
    <div className="signUp-main">
      <div className="signUp-logo">

      </div>
      <div className="signUp-div-form">
        <div className="signUp-form">
          <h1 className="signUp-createAcc">Create your account</h1>
          <div className="signUp-textField-div">
            <form className="signUp-textField" onSubmit={handleRegister}>

              <label for="fname" className="signUp-textDesc">First Name</label><br/>
              <input type="text" id="fname" name="fname" size="35" required value={fname} onChange={(e) => setFname(e.target.value)}/><br/><br/>

              <label for="mname" className="signUp-textDesc">Middle name (optional)</label><br/>
              <input type="text" id="mname" name="mname" size="35" value={mname} onChange={(e) => setMname(e.target.value)}/><br/><br/>

              <label for="lname" className="signUp-textDesc">Last Name</label><br/>
              <input type="text" id="lname" name="lname" size="35" required value={lname} onChange={(e) => setLname(e.target.value)}/><br/><br/>

              <label for="email" className="signUp-textDesc">E-mail</label><br/>
              <input type="text" id="email" name="email" size="35" required value={email} onChange={(e) => setEmail(e.target.value)}/><br/><br/>

              <label for="password" className="signUp-textDesc">Password</label><br/>
              <input type="password" id="password" name="password" size="35"required value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/>

              <label for="confirmPassword" className="signUp-textDesc">Confirm Password</label><br/>
              <input type="password" id="confirmPassword" name="confirmPassword" size="35"required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/><br/><br/><br/>
              <button type="submit" id="signUp">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp