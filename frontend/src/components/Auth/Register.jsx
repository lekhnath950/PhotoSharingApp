import { PhotoCamera } from '@mui/icons-material'
import { Avatar, Button, IconButton, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  registerUser } from '../../Actions/User'


const Register = () => {

    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [city, setCity] = useState("")
    const [avatar, setAvatar] = useState("")
    const [password, setPassword] = useState("")

    const [open, setOpen] = React.useState(false);
    const {error, message} = useSelector((state) => state.user)

    const dispatch = useDispatch();

    const handleImage = (e) => {
      const file = e.target.files[0];
  
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
  
      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setAvatar(Reader.result);
        }
      };
    };

    
    const SubmitHandler = async (e) => {
        e.preventDefault()
       await  dispatch(registerUser(email,password,name,username,city,avatar))
      //  alert("User created. Login now")

       if(error) {
        setOpen(true)
       }

       if(message) {
        alert("user created. Login Now")
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

        <div className='user-avatar'>
        <Avatar src={avatar} alt="User" sx={{ height: "50px", width: "50px" }} />
        </div>

        <TextField className='inputt' type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" autoComplete='off' required /> <br />
        <TextField className='inputt' type="text" value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" autoComplete='off' required /> <br />
        <TextField className='inputt' type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" autoComplete='off' required /> <br />
        <TextField className='inputt' type="text" value={city} onChange={(e) => setCity(e.target.value)} id="outlined-basic" label="City" variant="outlined" autoComplete='off' required /> <br />
        <TextField className='inputt' type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" required /> <br />
        <IconButton color='primary' aria-label="pp" component="label" className="inputt imagepp">
          <input hidden accept="image/*" className='imagepp' type="file" onChange={handleImage} required />
          <PhotoCamera/>
          <h5>Choose Profile Picture</h5>
        </IconButton>
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