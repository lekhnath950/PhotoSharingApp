import {configureStore} from '@reduxjs/toolkit'
import { allPostsReducer, likeReducer, myPostReducer, userPostReducer } from './Reducers/Post';
import { allusersReducer, postOfFollowingReducer, searchUserReducer, userProfileReducer, userReducer } from './Reducers/User';

const store = configureStore( {
    reducer: {
        user: userReducer,
        // loaduser: loaduserReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allusersReducer,
        like: likeReducer,
        myPost: myPostReducer,
        userProfile: userProfileReducer,
        userPost: userPostReducer,
        allPost: allPostsReducer,
        search: searchUserReducer
    }
});

export default store;