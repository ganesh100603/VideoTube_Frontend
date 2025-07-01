import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {TweetAndComment,TweetList} from "../../components"
import { getUserTweets } from "../../store/Slices/tweetSlice";

function ChannelTweets(){
    const dispatch = useDispatch()
        const authId = useSelector((state)=>state.auth?.userData?._id)
        const userId = useSelector((state)=>state.user?.profileData?._id)
        const tweets = useSelector((state)=>state.tweet?.tweets) 
        useEffect(()=>{
            dispatch(getUserTweets(userId))
        },[dispatch,userId])

        return(
            <>
                {authId===userId&&<TweetAndComment tweet={true}/>}
                {tweets.map((tweet)=>(
                    <TweetList
                    key={tweet._id}
                    avatar={tweet?.owner?.avatar}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweetId={tweet?._id}
                    username={tweet?.owner?.username}
                    isLiked={tweet?.isLiked}
                    />
                ))}
            </>
        )
}

export default ChannelTweets