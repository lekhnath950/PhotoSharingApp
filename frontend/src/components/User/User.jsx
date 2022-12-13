import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'


const User = ({UserId, name, avatar}) => {
  return (
    <>

    <Link to={`/user/${UserId}`} className='user'>
        <Avatar src={avatar} className="avatarpp" />
        <h4 className="username">{name}</h4>
    </Link>
    </>
  )
}

export default User