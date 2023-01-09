import { Avatar, Button, Dialog } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { avatarUpload, getMyPost, loadUser, logoutUser } from '../Actions/User';
import Loader from './Loader/Loader';
import Post from './Post/Post';
import User from './User/User';

const Account = () => {

    const { loading, posts } = useSelector((state) => state.myPost)

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user)

    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
    const [MoreOptions, setMoreOptions] = useState(false)


    const [avatar, setAvatar] = useState("")

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
    
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            setAvatarPrev(Reader.result);
    
            setAvatar(Reader.result);
          }
        };
      };

    const uploadHandler = async(e) => {
        e.preventDefault()
        await dispatch(avatarUpload(avatar))
        dispatch(loadUser());
    }

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
                            <Avatar src={user.avatar.url} sx={{ width: 60, height: 60 }} />
                        </div>

                        <div className="utop1">
                            <h6 style={{ textTransform: 'uppercase' }}><Button>Name: </Button>{user.name} </h6>
                            <h6><Button>Username: </Button>@{user.username} </h6>
                            <h6 style={{ textTransform: 'capitalize' }}><Button>City: </Button>{user.city} </h6>
                            <h6><Button>Email: </Button>{user.email} </h6>
                        </div>

                    </div>



                    <Button onClick={()=> setMoreOptions(!MoreOptions)} >More</Button>


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
                                Time={moment(post.createdAt).fromNow()}

                            />
                        )) : <h6>No post</h6>
                    }
                </div>


        <Dialog open={MoreOptions} onClose={() => setMoreOptions(!MoreOptions)} >
        <div className='DialogBox'>
          <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "60px", width: "60px" }}
        />

                    <form onSubmit={uploadHandler}>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <Button type="submit">Upload</Button>

                    </form>

        </div>
      </Dialog>




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