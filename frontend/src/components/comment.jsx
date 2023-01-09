import { Avatar } from '@mui/material'
import React from 'react'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { allPosts } from '../Actions/Post'


const Comment = ({
    userId,
    name,
    avatar,
    comment,
    // commentId,
    // postId,
    // isAccount
}) => {

    // const dispatch = useDispatch();
    // useEffect(()=> {
    //     dispatch(allPosts())
    // })

    // const { user } = useSelector((state) => state.user)

  return (
    <div >
        <Link to={`/user/${userId}`} className='user' >
            <Avatar src={avatar} />
            <h5> {name}</h5>
            <h6 style={{fontWeight:'400'}}>{comment}</h6>
        </Link>
 

    {/* {
        isAccount ? 
        <button>delete1</button> :
        userId === user._id ?
        <button>deleete</button> : null


    } */}

    </div>
  )
}

export default Comment