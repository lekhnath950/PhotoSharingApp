import './Home/Home.css'
import React, { useEffect } from 'react'
import Post from './Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader/Loader'
import { allPosts } from '../Actions/Post'

export default function Explore() {

  const dispatch = useDispatch();

  const {loading, posts} = useSelector((state)=> state.allPost)

  useEffect(() => {
    dispatch(allPosts());

  }, [dispatch])

  return (

    loading ? <Loader /> : (
      <div className="explore">
        {/* <Search/> */}

        <div className='explorepage'>

          {
            posts && posts.length > 0 ? posts.map((post) => (
              <Post
                key={post.owner.name}
                postImage={post.image.url}
                postId={post._id}
                ownerName={post.owner.name}
                ownerImage={post.owner.avatar}
                ownerId={post.owner._id}
                caption={post.caption}
                likes={post.likes}
                comments={post.comments}
                isDelete={false}
                isAccount={true}
                className="explorepost"
              />

            )) : <h3>No post yet</h3>
          }
        </div>

      </div>
    )
  )
}
