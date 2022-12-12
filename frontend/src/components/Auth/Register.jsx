import { Button, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getallusersPosts, loadUser, registerUser } from '../../Actions/User'


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

       
      }
      
      useEffect(() => {
        
        if(error) {
          setOpen(true)          
        }

        dispatch(getallusersPosts())
        dispatch(loadUser());
    },[dispatch, error])



  return (
    <div className="login">

<form className='loginform' onSubmit={SubmitHandler}>
        <h4> Photo Sharing App</h4>
        <h5 style={{ fontWeight: '400' }}> Register here</h5>

        <TextField className='inputt' type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" required /> <br />
        <TextField className='inputt' type="text" value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" required /> <br />
        <TextField className='inputt' type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" required /> <br />

        <Button className='inputt' type="submit" variant='outlined'>SignUp</Button>

        <Link to="/">
          <h5 style={{ fontWeight: '400' }}>Already have an account?<br/><u style={{color:'blue'}}>Login here</u></h5>
        </Link>
      </form>

      <Snackbar
  open={open}
  autoHideDuration={6}
  message={error}
/>
    </div>
  )
}

export default Register