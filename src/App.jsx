import React,{useEffect} from "react";
import { Route,Routes } from "react-router-dom";
import { AuthLayout,Login,SignUp } from "./components";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import {
    Channel,
    ChannelPlaylist,
    ChannelSubscribers,
    ChannelTweets,
    ChannelVideos,
    AdminDashboard,
    EditChannel,
    History,
    HomePage,
    LikedVideos,
    MySubscriptions,
    SearchVideos,
    TermsAndConditions,
    VideoDetail
} from "./pages"
import {EditPersonalInfo,ChangePassword} from "./components"
import Layout from "./Layout";

function App(){
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(getCurrentUser())
  // },[dispatch])

  useEffect(() => {
  const hasAccessToken = document.cookie.includes("accessToken");
  if (hasAccessToken) {
    dispatch(getCurrentUser());
  }
}, [dispatch]);


  return(
    <>
      <Routes>
          <Route
          path="/"
          element={<Layout/>}
          >
            <Route 
            path=""
            element={
            <AuthLayout authentication={false}>
              <HomePage/>
            </AuthLayout>}
            />
            
            <Route 
            path="search/:query"
            element={
            <AuthLayout authentication={false}>
              <SearchVideos/>
            </AuthLayout>}
            />
            
            <Route 
            path="/channel/:username"
            element={
            <AuthLayout authentication={true}>
              <Channel/>
            </AuthLayout>}
            >
            
            <Route 
            path="videos"
            element={
            <AuthLayout authentication={true}>
              <ChannelVideos/>
            </AuthLayout>}
            />
            
            <Route 
            path="playlists"
            element={
            <AuthLayout authentication={true}>
              <ChannelPlaylist/>
            </AuthLayout>}
            />
            
            <Route 
            path="tweets"
            element={
            <AuthLayout authentication={true}>
              <ChannelTweets/>
            </AuthLayout>}
            />
            
            <Route 
            path="subscribed"
            element={
            <AuthLayout authentication={false}>
              <ChannelSubscribers/>
            </AuthLayout>}
            />
        </Route>
        
            <Route 
            path="/history"
            element={
            <AuthLayout authentication={true}>
              <History/>
            </AuthLayout>}
            />
            
            <Route 
            path="/liked-videos"
            element={
            <AuthLayout authentication={true}>
              <LikedVideos/>
            </AuthLayout>}
            />
            
            <Route 
            path="/subscriptions"
            element={
            <AuthLayout authentication={true}>
              <MySubscriptions/>
            </AuthLayout>}
            />
            
            <Route 
            path="/edit"
            element={
            <AuthLayout authentication={true}>
              <EditChannel/>
            </AuthLayout>}
            >
            
            <Route 
            path="personalInfo"
            element={
            <AuthLayout authentication={true}>
              <EditPersonalInfo/>
            </AuthLayout>}
            />
            <Route 
            path="password"
            element={
            <AuthLayout authentication={true}>
              <ChangePassword/>
            </AuthLayout>}
            />
          </Route>
        </Route>

        <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        }
        />
        
        <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <SignUp/>
          </AuthLayout>
        }
        />
        
        <Route
        path="/watch/:videoId"
        element={
          <AuthLayout authentication={true}>
            <VideoDetail/>
          </AuthLayout>
        }
        />
        
        <Route
        path="/collections"
        element={
          <AuthLayout authentication={true}>
            <AdminDashboard/>
          </AuthLayout>
        }
        />
        <Route
        path="/terms-conditions"
        element={
          <AuthLayout authentication={true}>
            <TermsAndConditions/>
          </AuthLayout>
        }
        />
      </Routes>

      <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{
        error:{
          style:{borderRadius:"0",color:"red"}
        },
        success:{
          style:{borderRadius:"0",color:"green"}
        },
        duration:2000
      }}
      />
    </>
  )
}

export default App