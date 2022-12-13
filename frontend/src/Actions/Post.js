import axios from 'axios';



export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequest",
        });

        const { data } = await axios.get(`/api/post/${id}`);
        dispatch({
            type: "likeSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "likeFailure",
            payload: error.response.data.message,
        });
    }
};

export const addComment = (id,comment) => async (dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest",
        });

        const { data } = await axios.post(`/api/post/comment/${id}`, {
            comment
        },{
            headers:{
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: "addCommentSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "addCommentFailure",
            payload: error.response.data.message,
        });
    }
};


export const createNewPost = (caption,image) => async (dispatch) => {

    try {

        dispatch({
            type: "newPostRequest",
        })

        // const uri ="http://localhost:2000"

        const {data} = await axios.post('api/post/upload', {
            caption,image
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })

        dispatch({
            type: "newPostSuccess",
            payload: data.message,
        })
        
    } catch (error) {
        dispatch({
            type: "newPostFailure",
            payload: error.response.data.message,
        }); 
    }
}


export const allPosts = () => async (dispatch) => {

    try {

        dispatch({
            type: "allPostsRequest"
        })

        const {data} = await axios.get('api/allposts')

        dispatch({
            type: "allPostsSuccess",
            payload: data.posts,
        })
        
    } catch (error) {
        dispatch({
            type: "allPostsFailure",
            payload: error.message,
        }); 
    }

}

export const deletePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deletePostRequest",
      });
  
      const { data } = await axios.delete(`api/post/${id}`);
      dispatch({
        type: "deletePostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deletePostFailure",
        payload: error.response.data.message,
      });
    }
  };

