import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../Actions/User'
import './Login.css'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  }

  return (
    <div className='login'>

      <form className='loginform' onSubmit={loginHandler}>
        <h4> Photo Sharing App</h4>
        <h5 style={{ fontWeight: '400' }}> Login here</h5>

        <TextField className='inputt' type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" required /> <br />
        <TextField className='inputt' type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" required /> <br />

        <Button className='inputt' type="submit" variant='outlined'>Login</Button>

        <Link to="/register">
          <h5 style={{ fontWeight: '400' }}>Dont have an account?<br/><u style={{color:'blue'}}>Register here</u></h5>
        </Link>
      </form>
    </div>
  )
}

export default Login