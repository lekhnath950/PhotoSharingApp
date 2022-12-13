import axios from 'axios'

export const loginUser = (email, password) =>async  (dispatch) => {

    try {

        dispatch({
            type: "loginRequest"
        })

        const {data} = await axios.post("/api/login",{email, password}, {
            headers:{
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "loginSuccess",
            payload: data.user,
        })
        
    } catch (error) {
        
        dispatch({
            type: "loginFailure",
            payload: error.response.data.message,
        })
    }

}
export const loadUser = () =>async  (dispatch) => {

    try {

        dispatch({
            type: "loadUserRequest"
        });

        const {data} = await axios.post("/api/me");


        dispatch({
            type: "loadUserSuccess",
            payload: data.user,
        });
        
    } catch (error) {
        
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message,
        });
    }
}


export const getFollowingPosts = () => async (dispatch) => {

    try {

        dispatch({
            type: "postOfFollowingRequest",
        });

        const {data} = await axios.get("/api/posts");

        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts,
        });
        
    } catch (error) {
        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message,
        })
        
    }
}

export const getallusersPosts = () => async (dispatch) => {

    try {

        dispatch({
            type: "allusersReducerRequest",
        });

        const {data} = await axios.get("/api/users");

        dispatch({
            type: "allusersReducerSuccess",
            payload: data.users,
        });
        
    } catch (error) {
        dispatch({
            type: "allusersReducerFailure",
            payload: error.response.data.message,
        })
        
    }
}
export const getMyPost = () => async (dispatch) => {

    try {

        dispatch({
            type: "myPostRequest",
        });

        const {data} = await axios.get("/api/my/posts");

        dispatch({
            type: "myPostSuccess",
            payload: data.posts,
        });
        
    } catch (error) {
        dispatch({
            type: "myPostFailure",
            payload: error.response.data.message,
        })
        
    }
}

export const logoutUser = () =>async  (dispatch) => {

    try {

        dispatch({
            type: "logoutUserRequest"
        })

        await axios.get("/api/logout")


        dispatch({
            type: "logoutUserSuccess"
        })
        
    } catch (error) {
        
        dispatch({
            type: "logoutUserFailure",
            payload: error.response.data.message,
        })
    }

}

export const registerUser = (email, password, name) =>async  (dispatch) => {

    try {

        dispatch({
            type: "registerRequest"
        })

        const {data} = await axios.post("/api/register",{email, password, name}, {
            headers:{
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "registerSuccess",
            payload: data.message,
        })
        
    } catch (error) {
        
        dispatch({
            type: "registerFailure",
            payload: error.response.data.message,
        })
    }

}


export const getUserPost = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "userPostRequest",
        });

        const {data} = await axios.get(`/api/userpost/${id}`);

        dispatch({
            type: "userPostSuccess",
            payload: data.posts,
        });
        
    } catch (error) {
        dispatch({
            type: "userPostFailure",
            payload: error.response.data.message,
        })
        
    }
}

export const getUserProfile = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "userProfileRequest",
        });

        const {data} = await axios.get(`/api/user/${id}`);

        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        });
        
    } catch (error) {
        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,
        })
        
    }
}

export const followUnfollow = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "followUserRequest",
        });

        const {data} = await axios.get(`/api/follow/${id}`);

        dispatch({
            type: "followUserSuccess",
            payload: data.message,
        });
        
    } catch (error) {
        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message,
        })
        
    }
}