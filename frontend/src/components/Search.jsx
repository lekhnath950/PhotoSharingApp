import { Button, InputBase, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlluser, getAlluserc } from '../Actions/User'
import { SearchOutlined} from '@mui/icons-material'
import User from './User/User'


const Search = () => {

    const {users} = useSelector((state)=> state.searchc)
    const {users : user} = useSelector((state)=> state.search)

    const [name,setName] = useState("")
    const [city,setCity] = useState("")
    const dispatch = useDispatch() 


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getAlluser(name))  
        dispatch(getAlluserc(city))
    }
    
  return (
    <div className='searchuser'>
        <Paper className='searchbar' >
        <form onSubmit={submitHandler} >
            <InputBase placeholder='Search user' value={[name || city]}  onChange={(e)=> setName(e.target.value) || setCity(e.target.value)} required />
            <Button type="submit" variant='text' className='searchbutton' ><SearchOutlined sx={{border:'none'}} /></Button>
        </form>
        </Paper>

        <div className='searchlist'>
            {
                users && users.map((user)=> (
                    <>
                    <User
                    // key={user.name}
                    UserId={user._id}
                    name={user.name}
                    avatar={user.avatar.url}
                    city={user.city}
                    />
                    </>
                ))


            }
                {
                user && user.map((user)=> (
                    <>
                    <User
                    // key={user.name}
                    UserId={user._id}
                    name={user.name}
                    avatar={user.avatar.url}
                    />
                    </>

                ))
                }


        </div>
    </div>
  )
}

export default Search