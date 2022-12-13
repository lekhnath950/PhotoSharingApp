import {configureStore} from '@reduxjs/toolkit'
import { allPostsReducer, likeReducer, myPostReducer, userPostReducer } from './Reducers/Post';
import { allusersReducer, loaduserReducer, postOfFollowingReducer, userProfileReducer, userReducer } from './Reducers/User';

const store = configureStore( {
    reducer: {
        user: userReducer,
        loaduser: loaduserReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allusersReducer,
        like: likeReducer,
        myPost: myPostReducer,
        userProfile: userProfileReducer,
        userPost: userPostReducer,
        allPost: allPostsReducer,
    }
});

export default store;