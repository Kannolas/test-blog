import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import Header from "../components/Header";
import axios from "axios";
import { authSuccess } from "../authReducer";
import { Navigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
function Login(){
    const auth = useSelector((state)=>state.auth)
    const [shouldRedirect, setShouldRedirect] = useState(auth.isAuth)
    const [showPass, setShowPass] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const iconStyles={
        content:{fontSize: "2.5rem", position:"absolute", right: "5%", bottom: "10px", cursor:"pointer", opacity:"0.85"}
    }
    // const [isLoginSuccess, setLoginSuccess] = useState(false)
    const dispatch = useDispatch();
    const HandleUsernameChange = (e)=>{
        setUsername(e.target.value);
    }
    const HandlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const handleShowPass=()=>{
        setShowPass(!showPass)
    }
    const HandleSubmit = ()=>{
        axios.get("https://647ded02af984710854a9d6d.mockapi.io/users").then( response =>{
                response.data.forEach(user=>{
                    const payload = {
                        nickname: user.username,
                        id: user.id
                    }
                    console.log(user)
                    if((user.login===username)&&(user.password===password)&&(!auth.isAuth)){
                        dispatch(authSuccess(payload))
                        setShouldRedirect(true)
                    }
                })
            })
    }  
    return(
        shouldRedirect?<Navigate to='/'/>:<div className="Login">
            <Header/>
            <div className="LoginForm">  
                <div className="inputForm">
                    <div className="login-text">Вход</div>
                    <div className="inputCont">
                        <input onChange={HandleUsernameChange} type="text" id="login" className="custom-input" name="login" required/>
                        <label htmlFor="login" className="custom-placeholder">Логин</label>
                    </div>
                    <div className="inputCont">
                        <input onChange={HandlePasswordChange} type={!showPass?"password":"text"} id="password" className="custom-input" name="password" required/>
                        <label className="custom-placeholder" htmlFor="password">Пароль</label>
                        {showPass?<div onClick={handleShowPass}><VisibilityOffIcon  style={iconStyles.content}/></div>:<VisibilityIcon onClick={handleShowPass} style={iconStyles.content}/>}
                    </div>
                    <div className="bottom-form-cont">
                    <Link to={"/registration"}><div className="donthaveacc">Нет аккаунта?</div></Link>
                        <div className="submit-login" onClick={HandleSubmit}>Submit</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;