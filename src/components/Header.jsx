import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
function Header(){
    const auth = useSelector((state)=>state.auth)
    console.log(auth.nickname)
    const [searchValue, setSearchValue]=useState("")
    const [isSearchActive, setSearchActive] = useState(false)
    const handleSearchClick = (e)=>{
        e.preventDefault()
        if(isSearchActive){}
        else{
            setSearchActive(true)
        }
    }
    const handleInputChange =(e)=>{
        setSearchValue(e.target.value)
    }
    const handleSearchBlur =(e)=>{
        if(searchValue===""){
            setSearchActive(false)
        }
    }
    const handleKeyDown = (e)=>{
        if(e.key==="Escape"){
            setSearchActive(false)
        }
    }
    return(
        <div className="Header" onKeyDown={handleKeyDown}>
            <Link to={"/"}><div className="logo">BLOG</div></Link>
            <div className="hello">Добро пожаловать, {auth.isAuth?auth.nickname:'незнакомец'}</div>
            <div className="header-icons">
                <div class="search-container">
                    <input type="text" onBlur={handleSearchBlur} onChange={handleInputChange} placeholder="Поиск..." className={isSearchActive?"search-input search-input-active":"search-input"}/>
                    <div className="search" onClick={handleSearchClick}><SearchIcon style={{fontSize: "2.5rem", color:"white"}} className="search-ico"/></div>
                </div>
                
                <Link to={"/login"}><div className="account"><AccountBoxIcon style={{fontSize: "3.2rem", color: "white"}}/></div></Link>
            </div>
        </div>
    )
}


export default Header;