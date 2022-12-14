import { Button, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  registerUser } from '../../Actions/User'


const Register = () => {

    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [open, setOpen] = React.useState(false);
    const {error} = useSelector((state) => state.user)

    const dispatch = useDispatch();

    
    const SubmitHandler = async (e) => {
        e.preventDefault()
       await  dispatch(registerUser(email,password,name))

      //  if(error) {
      //    setOpen(true)          
      //  }

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
    <div className="login">

<form className='loginform' onSubmit={SubmitHandler}>
        <h4> Photo Sharing App</h4>
        <h5 style={{ fontWeight: '400' }}> Register here</h5>

        <TextField className='inputt' type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" autoComplete='off' required /> <br />
        <TextField className='inputt' type="text" value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" autoComplete='off' required /> <br />
        <TextField className='inputt' type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" required /> <br />

        <Button className='inputt' type="submit" variant='outlined'>SignUp</Button>

        <Link to="/">
          <h5 style={{ fontWeight: '400' }}>Already have an account?<br/><u style={{color:'blue'}}>Login here</u></h5>
        </Link>
      </form>

      {/* {
        error ? (
        <Alert severity='error'>{error}</Alert>
        ) : null
      } */}


<Snackbar
  open={open}
  autoHideDuration={5000}
  message={error}
  onClose={handleClose}
/>


    </div>
  )
}

export default Register