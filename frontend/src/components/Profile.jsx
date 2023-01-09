import { Avatar, Button, Dialog } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { followUnfollow, getUserPost, getUserProfile, loadUser } from '../Actions/User';
import Loader from './Loader/Loader';
import Post from './Post/Post';
import User from './User/User';


const Profile = () => {

  // const { loading, posts } = useSelector((state) => state.myPost)
  const { user, loading } = useSelector((state) => state.userProfile);
  const { posts } = useSelector((state) => state.userPost);

  const dispatch = useDispatch();
  const params = useParams()

  const { user: me } = useSelector((state) => state.user)

  const [followersToggle, setFollowersToggle] = useState(false)
  const [followingToggle, setFollowingToggle] = useState(false)
   const [following, setFollowing] = useState(false)
  const [myProfile, setMyProfile] = useState(false)

  const followHandler = async () => {
    setFollowing(!following)
    await dispatch(followUnfollow(user._id));
    dispatch(loadUser());
    dispatch(getUserProfile(params.id));


  }

  useEffect(() => {
    dispatch(getUserPost(params.id));
    dispatch(getUserProfile(params.id));

  }, [dispatch, params.id]);



  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        }
        else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);

  return (
    loading ? (
      <Loader />) : (
      <div className='profile-main'>
        {
          user && (
            <>
              <div className="user-profile">

                <div className='top-user'>

                  <div>
                    <Avatar src={user.avatar.url} sx={{ width: 70, height: 70 }} />
                  </div>

                  <div className='utop1'>

                    <div>
                      <h5 className='prof'><b>Name:</b> {user.name} </h5>
                      <h5 className='prof'><b>Username:</b> @{user.username} </h5>
                      <h5 className='prof'><b>City:</b> {user.city} </h5>
                    </div>

                    {
                      myProfile ? null : (

                        <div className='followbutton'>
                          <Button size="small" variant={following ? "contained" : "outlined"} onClick={followHandler} >
                            {
                              following ? "Following" : "Follow"
                            }
                          </Button>
                        </div>


                      )}
                  </div>

                  <br />
                  <br />
                  <br />



                </div>

                <div className='udown'>

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

            </>
          )
        }
        <div className="user-post">
          {
            posts && posts.length > 0 ? posts.map((post) => (
              <Post
                key={post._id}
                postImage={post.image.url}
                postId={post._id}
                ownerName={post.owner.name}
                ownerImage={post.owner.avatar.url}
                ownerId={post.owner._id}
                caption={post.caption}
                likes={post.likes}
                comments={post.comments}
                isDelete={false}
                Time={moment(post.createdAt).fromNow()}
                isAccount={true}
                // Time={post.createdAt}
              />
            )) : <h6>No post</h6>
          }
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
                  className="dialog"
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

    )
  )
}

export default Profile