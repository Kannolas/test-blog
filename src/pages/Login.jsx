import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import Header from "../components/Header";
import axios from "axios";
import { authSuccess } from "../authReducer";
import { Navigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import AlertCustom from "../components/Alert";
function Login(){
    const auth = useSelector((state)=>state.auth)
    const [error, setError] = useState('')
    const [shouldRedirect, setShouldRedirect] = useState(auth.isAuth)
    const [showPass, setShowPass] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showAlert, setShowAlert]=useState(false)

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
        if(username.length==='' || password === ''){
            setError('Введите данные')
            setShowAlert(true)
            setTimeout(()=>{setShowAlert()}, 5000)
        }
        else{
        axios.get("https://647ded02af984710854a9d6d.mockapi.io/users").then( response =>{
                response.data.forEach(user=>{
                    const payload = {
                        nickname: user.username,
                        id: user.id
                    }
                    if((user.login===username)&&(user.password===password)&&(!auth.isAuth)){
                        dispatch(authSuccess(payload))
                        setShouldRedirect(true)
                    }
                    else{
                        setError('Неверный логин или пароль!')
                        setShowAlert(true)
                        setTimeout(()=>{setShowAlert()}, 5000)    
                    }
                })
            })
        }
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
                {/* <Alert severity="error" className={showAlert?"show-alert":"hide-alert"} style={{backgroundColor: "#490303", color:"#ff9e9e", right:"20px", bottom:"30px", width:"500px", position:"fixed", borderRadius:"5px", transition:"0.5s all"}}>
                    <AlertTitle>Ошибка</AlertTitle>
                    This is an error alert — <strong>{error}</strong>
                </Alert> */}
                <AlertCustom text = {error} showAlert = {showAlert}/>
        </div>
    )
}

export default Login;