import { Avatar, Button, Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPost, logoutUser } from '../Actions/User';
import Loader from './Loader/Loader';
import Post from './Post/Post';
import User from './User/User';

const Account = () => {

    const { loading, posts } = useSelector((state) => state.myPost)

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.loaduser)

    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)

    const logoutHandler = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        dispatch(getMyPost())
    }, [dispatch])

    return (
        loading ? (
            <Loader />) : (
            <div className='profile-main'>


                <div className="user-profile">

                    <div className='top-user'>

                    <div>
                        <Avatar src={user.avatar.url} sx={{width:60, height:60}} />
                    </div>

                    <div className="utop1">
                        <h5>{user.name} </h5>
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

                    <div className="logout">
                        <Button variant='outlined' onClick={logoutHandler}  >Logout</Button>
                    </div>

                </div>



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
                                isDelete={true}
                                isAccount={true}
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

export default Account