import {configureStore} from '@reduxjs/toolkit'
import { allPostsReducer, likeReducer, myPostReducer, userPostReducer } from './Reducers/Post';
import { allusersReducer, postOfFollowingReducer, searchUsercReducer, searchUserReducer, userProfileReducer, userReducer } from './Reducers/User';

const store = configureStore( {
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allusersReducer,
        like: likeReducer,
        myPost: myPostReducer,
        userProfile: userProfileReducer,
        userPost: userPostReducer,
        allPost: allPostsReducer,
        search: searchUserReducer,
        searchc: searchUsercReducer,
    }
});

export default store;