import React, { useEffect, useState} from "react";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Post(props){
    return(
        <div className="Post" key={props.id}>
            <div className="user-cont">
                <AccountCircleIcon style={{fontSize: "3rem"}}/>
                <div className="post-username">{props.username}</div>
            </div>
            <div className="post-header">{props.header}</div>
            <div className="post-text">{props.main}</div>
        </div>
    )
}

export default Post;