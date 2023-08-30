import React, { useState } from "react";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
import {useSelector } from "react-redux/es/hooks/useSelector";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from "react-redux";
import { logOut } from "../authReducer";
import Post from "../components/Post";
import { Button } from "@mui/material";

function Profile(){
    const auth = useSelector((state)=>state.auth)
    const postsStore = useSelector(state => state.posts.postList)
    const dispatch = useDispatch()
    const [shouldRedirect, setShouldRedirect]=useState(false);
    const [isLoading, setIsLoading]=useState(false)
    const handleQuit = ()=>{
        dispatch(logOut())
        setShouldRedirect(true)
    }
    return(
        shouldRedirect?<Navigate to={'/'}/>:(auth.isAuth?
        <div className="Profile">
            <Header/>
            <div className="profile-cont">
                <div className="profile-header">
                    <AccountCircleIcon style={{fontSize: '3.5rem'}}/>
                    <div className="profile-username">{auth.nickname}</div>
                    <Button variant="contained" onClick={handleQuit} style={{width:"100px", height:"70%"}}>Выход</Button>
                </div>
                <div className="divider"></div>
                <div className="myposts">Мои посты:</div>
                    <div className="blogs-container">
                        {isLoading?(<h1>Loading...</h1>):(postsStore.map((post)=>{
                            return(<Post id={post.id} header={post.header} main={post.main} username ={auth.nickname}/>)
                        }))}
                    </div>
            </div>
        </div>
        :<Navigate to={'/'}/>
    ))
}
export default Profile;