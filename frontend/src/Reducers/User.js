import {createReducer} from '@reduxjs/toolkit'
const initialState = {}

export const userReducer = createReducer(initialState, {
    loginRequest: (state) => {
        state.loading = true;
    }, 
    loginSuccess: (state, action ) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    registerRequest: (state) => {
        state.loading = true;
    },
    reqisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    registerFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    logoutUserRequest: (state) => {
        state.loading = true;
    },
    logoutUserSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    logoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})


export const postOfFollowingReducer = createReducer(initialState,{
    postOfFollowingRequest: (state) => {
        state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})


export const allusersReducer = createReducer(initialState,{
    allusersReducerRequest: (state) => {
        state.loading = true;
    },
    allusersReducerSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    allusersReducerFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})

export const userProfileReducer = createReducer(initialState,{
    userProfileRequest: (state) => {
        state.loading = true;
    },
    userProfileSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    userProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
})