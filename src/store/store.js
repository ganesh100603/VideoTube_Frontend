import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.js"
import commentSliceReducer from "./Slices/commentSlice.js"
import dashboardSliceReducer from "./Slices/dashboardSlice.js"
import likeSliceReducer from "./Slices/likeSlice.js"
import playlistSliceReducer from "./Slices/playlistSlice.js"
import subscriptionSliceReducer from "./Slices/subscriptionSlice.js"
import tweetSliceReducer from "./Slices/tweetSlice.js"
import userSliceReducer from "./Slices/userSlice.js"
import videoSliceReducer from "./Slices/videoSlice.js"

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        user:userSliceReducer,
        video:videoSliceReducer,
        subscription:subscriptionSliceReducer,
        like:likeSliceReducer,
        tweet:tweetSliceReducer,
        comment:commentSliceReducer,
        dashboard:dashboardSliceReducer,
        playlist:playlistSliceReducer
    }
})

export default store