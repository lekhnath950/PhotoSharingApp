import './Home.css'
import React, { useEffect, useState } from 'react'
// import User from '../User/User'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getallusersPosts, getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Avatar, Button, Dialog } from '@mui/material'
import User from '../User/User'
import moment from 'moment'
// import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
// import { ExpandCircleDown } from '@mui/icons-material'

function Home() {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)

  const [followersToggle, setFollowersToggle] = useState(false)
  const [followingToggle, setFollowingToggle] = useState(false)


  const { loading, posts } = useSelector((state) => state.postOfFollowing)
  // const { users } = useSelector((state) => state.allUsers)

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getallusersPosts());
    // dispatch(loadUser())
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
                Time={moment(post.createdAt).fromNow()}
                isAccount={true}
              />

            )) : <h3>No post yet</h3>
          }
        </div>
        {/* <div className='home-right'>


          <Accordion className='accordion'>
            <AccordionSummary expandIcon={<ExpandCircleDown />} aria-controls="panel2a-content" id="panel2a-header" >
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

        </div> */}

        <div className='homeright'>
          <div className="user-profile">
          <h3>Your Profile</h3>

            <div className='top-user aba'>

              <div className='avatar'>
                <Avatar src={user.avatar.url} sx={{ width: 60, height: 60 }} />
              </div>

              <div className="utop1">
                <h5>{user.name} </h5>
                <h6>@{user.username} </h6>
              </div>


            </div>

            <div className=" udown">

              <div>
                <h5> {user.followers.length} </h5>
                <button onClick={() => setFollowersToggle(!followersToggle)} >Followers</button>
              </div>

              <div>
                <h5> {user.following.length} </h5>
                <button onClick={() => setFollowingToggle(!followingToggle)}>Following</button>
              </div>

              <div>
                <h5> {user.posts.length} </h5>
                <button>post</button>
              </div>

            </div>

          </div>

          
          <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)} >
                    <div className='DialogBox'>
                        <h5>Followers:</h5>

                        {
                            user && user.followers.length > 0 ? user.followers.map((follower) => ((
                                <User
                                    key={follower._id}
                                    UserId={follower._id}
                                    name={follower.name}
                                    avatar={follower.avatar.url}
                                />

                            ))) : (
                                <h4>No followers</h4>
                            )
                        }

                    </div>
                </Dialog>


                <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)} >
                    <div className='DialogBox'>
                        <h5>Following:</h5>

                        {
                            user && user.following.length > 0 ? user.following.map((following) => ((
                                <User
                                    key={following._id}
                                    UserId={following._id}
                                    name={following.name}
                                    avatar={"following.avatar.url"}
                                />

                            ))) : (
                                <h4>No following</h4>
                            )
                        }

                    </div>
                </Dialog>
        </div>

      </div>
    )
  )
}

export default Home