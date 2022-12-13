import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const likeReducer = createReducer(initialState, {
    likeRequest: (state) => {
        state.loading = true
    },
    likeSuccess: (state,action) => {
        state.loading = false;
        state.message = action.payload
    },
    likeFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload
    },



    addCommentRequest: (state) => {
        state.loading = true
    },
    addCommentSuccess: (state,action) => {
        state.loading = false;
        state.message = action.payload
    },
    addCommentFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload
    },

    clearErrors: (state) => {
        state.error = null 
    },
    clearMessage: (state) => {
        state.message = null
    },

    newPostRequest: (state) => {
        state.loading = true;
    },

    newPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    newPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    followUserRequest: (state) => {
        state.loading = true;
    },

    followUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    followUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deletePostRequest: (state) => {
        state.loading = true;
      },
      deletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      deletePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
})

export const myPostReducer = createReducer(initialState,{
    myPostRequest: (state) => {
        state.loading = true;
    },
    myPostSuccess: (state,action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    myPostFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    }
})
export const userPostReducer = createReducer(initialState,{
    userPostRequest: (state) => {
        state.loading = true;
    },
    userPostSuccess: (state,action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    userPostFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    }
})


export const allPostsReducer = createReducer(initialState, {
    allPostsRequest: (state) => {
        state.loading = true;
    },
    allPostsSuccess: (state,action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    allPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})


