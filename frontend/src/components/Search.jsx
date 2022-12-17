import { InputBase, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlluser } from '../Actions/User'
import { SearchOutlined} from '@mui/icons-material'
import User from './User/User'

const Search = () => {

    const {users} = useSelector((state)=> state.search)

    const [name,setName] = useState("")
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getAlluser(name))
    }
    // useEffect(()=> {
    //     dispatch(getUserProfile())
    // },[dispatch])
    
  return (
    <div className='searchuser'>
        <Paper className='searchbar' >
        <form onSubmit={submitHandler} >
            <InputBase placeholder='search user' value={name}  onChange={(e)=> setName(e.target.value)} required/>
            <button type="submit" style={{border:'none', backgroundColor:'transparent'}}><SearchOutlined sx={{border:'none'}} /></button>
        </form>
        </Paper>

        <div className='searchlist'>
            {
                users && users.map((user)=> (
                    <User
                    // key={user.name}
                    UserId={user._id}
                    name={user.name}
                    Avatar={user.avatar.url}
                    />
                ))
            }

        </div>
    </div>
  )
}

export default Search