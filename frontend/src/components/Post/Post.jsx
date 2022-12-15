import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Dialog, TextField } from '@mui/material'
import { Favorite, FavoriteBorder, ChatBubbleOutline, Delete} from "@mui/icons-material"
import "./Post.css"
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deletePost, likePost } from '../../Actions/Post'
import { getFollowingPosts, getMyPost, loadUser } from "../../Actions/User"
import User from '../User/User'
import Comment from '../comment'


const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  Time,
  isDelete = false,
  isAccount = false,
}) => {

  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false)
  const [likesUser, setLikesUser] = useState(false)
  const [commentValue, setCommentValue] = useState("")
  const [commentToggle, setCommentToggle] = useState(false)

  const { user } = useSelector(state => state.user)

  const handleLike = () => {
    setLiked(!liked)
    dispatch(likePost(postId));
    dispatch(getFollowingPosts()); // updates automatically without refreshing but page will refresh
  }

  useEffect(() => {
    likes.forEach(item => {
      if (item._id === user._id) {
        setLiked(true)
      }
    })
  }, [likes, user._id])

  const addCommentHandler = async (e) => {
    e.preventDefault()
   await dispatch(addComment(postId, commentValue))
    dispatch(getFollowingPosts());

  }

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPost());
    dispatch(loadUser());
  };




  return (
    <div className='post'>
      <div className='postheader'>

        <div className='headertop'>
          <Avatar src={"ownerImage"}  sc={{ height: "3vmax", width: "3vmax" }} />
          <Link to={`/user/${ownerId}`} >
            <h4>{ownerName}</h4>

          </Link>
        </div>
        {isDelete ? (

<Button onClick={deletePostHandler}>
    <Delete style={{color:'black'}} />
  </Button>

): null}
      </div>

      <div>
        <img src={postImage} alt="postimage" className='postimage'/>
      </div>


      <div className='caption'>
        <h5>{ownerName}</h5>
        <h5 style={{fontWeight:'400'}}>{caption}</h5>
      </div>

      <div className='postFooter' >
        <Button onClick={handleLike} >
          {liked ? <Favorite style={{ color: "red" }}/> : <FavoriteBorder style={{ color: "black" }} />}

        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline style={{ color: "black" }} />
        </Button>



      </div> 
      <div>
        <button className="btnlikes" onClick={() => setLikesUser(!likesUser)} >{likes.length} likes</button>
        <button className="btnlikes" onClick={() => setCommentToggle(!commentToggle)}>{comments.length} Comments</button>
        
      </div>



      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)} >
        <div className='DialogBox'>
          <h5>Liked By:</h5>
          {
            likes.map(like => (
              <User
                key={like._id}
                UserId={like._id}
                name={like.name}
                // avatar={like.avatar.url} 
              />
            ))
          }
        </div>
      </Dialog>


      <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)} >
        <div className='DialogBox'>
          <h5>Drop Comment here</h5>

          <form className='' onSubmit={addCommentHandler} >
            <TextField type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Type your comment" required /> <br/><br/>
            <Button type="submit"variant='contained' >Comment</Button>
          </form>
          <h4>Comments on this Post:</h4>

          {
            comments.length > 0 ? comments.map((item) =>
              <Comment
                userId={item.user._id}
                key={item._id}
                name={item.user.name}
                avatar={"item.user"}
                comment={item.comment}
                commentId={item._id}
                postId={postId}
                isAccount={isAccount}

              />
            ) : (<h5>No Comments yet</h5>
            )}

        </div>
      </Dialog>


    </div>
  )
}

export default Post