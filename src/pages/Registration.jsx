import React from "react";
import { useState } from "react";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
function Registration(){
    const [nickname, setNickname]=useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const handleNicknameChange = (e)=>{
        setNickname(e.target.value)
    }
    const handleLoginChange = (e)=>{
        setLogin(e.target.value)
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }
    const HandleSubmit = ()=>{
        if(nickname==='' || password ==='' || login===''){
            setError("Введите данные")
            setShowError(true)
        }
        else{
        let f = false
        axios.get("https://647ded02af984710854a9d6d.mockapi.io/users").then(response =>{
            response.data.forEach(user=>{
                if(user.username === nickname){
                    f = true;
                }
            })
            if(f){
                setError("Пользователь уже существует")
                setShowError(true)
            }
            else{
                setShowError(false)
                axios.post("https://647ded02af984710854a9d6d.mockapi.io/users", {id:1, username: nickname, login: login, password: password})
                setShouldRedirect(true)
            }
        })
    }
    }
    return(
    shouldRedirect?<Navigate to={"/"}/>:<div className="Registration">
        <Header/>
        <div className="LoginForm">
            <div className="inputForm">
                <div className="login-text">Регистрация</div>
                {showError?<div className="login-text" style={{color:"red", marginTop:"10px"}}>{error}</div>:<></>}
                <div className="inputCont">
                    <input type="text" onChange={handleNicknameChange} id="nickname" className="custom-input" name="nickname" required />
                    <label htmlFor="nickname" className={"custom-placeholder"}>Никнейм</label>
                </div>
                <div className="inputCont">
                    <input type="text" onChange={handleLoginChange} id="login" className="custom-input" name="login" required />
                    <label htmlFor="login" className="custom-placeholder">Логин</label>
                </div>
                <div className="inputCont">
                    <input type="text" onChange={handlePasswordChange} id="password" className="custom-input" name="password" required/>
                    <label htmlFor="password" className="custom-placeholder">Пароль</label>
                </div>
                <div className="bottom-form-cont">
                    <div onClick={HandleSubmit} className="submit-login">Submit</div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Registration;