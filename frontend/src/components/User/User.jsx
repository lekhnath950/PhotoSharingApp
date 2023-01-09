import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'


const User = ({UserId, name, avatar}) => {
  return (
    <>
    <div className="users">
    <Link to={`/user/${UserId}`} className='user'>
        <Avatar src={avatar} className="avatarpp" />
        <h4 className="username">{name}</h4> 
        {/* <h6>{city}</h6> */}
    </Link>
        </div>
    </>
  )
}

export default User