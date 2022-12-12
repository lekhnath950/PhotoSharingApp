import './Home.css'
import React, { useEffect } from 'react'
import User from '../User/User'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getallusersPosts, getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import {ExpandCircleDown} from '@mui/icons-material'

function Home() {

  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => state.postOfFollowing)
  const { users } = useSelector((state) => state.allUsers)

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getallusersPosts());

  }, [dispatch])

  return (

    loading ? <Loader /> : (
      <div className="home">

        <div className='home-left'>

          {
            posts && posts.length > 0 ? posts.map((post) => (
              <Post
                key={post._id}
                postImage={post.image.url}
                postId={post._id}
                ownerName={post.owner.name}
                ownerImage={post.owner.avatar}
                ownerId={post.owner._id}
                caption={post.caption}
                likes={post.likes}
                comments={post.comments}
                // isDelete={true}
                isAccount={true}
              /> 

            )) : <h3>No post yet</h3>
          }
        </div>
        <div className='home-right'>


      <Accordion className='accordion'>
        <AccordionSummary  expandIcon={<ExpandCircleDown />} aria-controls="panel2a-content" id="panel2a-header" >
          <h4>All users</h4>
        </AccordionSummary>
        <AccordionDetails className=''>
          <div className='allusers'>
          <h5 className='allusers'>
          {
            users && users.length > 0 ? users.map((user) => ((
              <User
                key={user._id}
                UserId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))) : null
          }
          </h5>
          </div>
        </AccordionDetails>
      </Accordion>

          {/* <h3>All users:</h3>

          {
            users && users.length > 0 ? users.map((user) => ((
              <User
                key={user._id}
                UserId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))) : null
          } */}

        </div>

      </div>
    )
  )
}

export default Home