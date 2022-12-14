import React, { useState } from 'react'
import { Button, Snackbar, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Actions/User'
import './Login.css'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

  const {error} = useSelector((state) => state.user)


  const loginHandler = async (e) => {
    e.preventDefault();

    await  dispatch(loginUser(email, password));
    if(error) {
      setOpen(true)          
    }
  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
};


  return (
    <div className='login'>

      <form className='loginform' onSubmit={loginHandler}>
        <h4> Photo Sharing App</h4>
        <h5 style={{ fontWeight: '400' }}> Login here</h5>

        <TextField autoComplete='off' className='inputt' type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" required /> <br />
        <TextField className='inputt' type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" required /> <br />

        <Button className='inputt' type="submit" variant='outlined'>Login</Button>

        <Link to="/register">
          <h5 style={{ fontWeight: '400' }}>Dont have an account?<br/><u style={{color:'blue'}}>Register here</u></h5>
        </Link>
      </form>

      <Snackbar
  open={open}
  autoHideDuration={5000}
  message={error}
  onClose={handleClose}
/>
    </div>
  )
}

export default Login