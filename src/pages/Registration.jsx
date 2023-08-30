import React from "react";
import { useState, useEffect } from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
import AlertCustom from "../components/Alert";
import { fetchData } from "../fetchData";
import { useDispatch } from "react-redux";
import { addUsers, addUser } from "../usersReducer";
function Registration(){
    const usersStore = useSelector(state=>state.users.users)
    const dispatch = useDispatch()
    const [showAlert, setShowAlert] = useState(false)
    const [nickname, setNickname]=useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [shouldRedirect, setShouldRedirect] = useState(false)

    useEffect(() => {
        const getData = async () => {
          try {
            const { users } = await fetchData();
            dispatch(addUsers(users));
          } catch (error) {
            console.error("error fetching data:", error);
          }

        };
    
        if (usersStore.length === 0) {
          getData();}
      }, []);


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
            setShowAlert(true)
            setTimeout(()=>{setShowAlert(false)}, 5000)
        }
        else{
        let f = false
        usersStore.forEach(user=>{
            if(user.username === nickname){
                f = true;
            }
        })
        if(f){
            setError("Пользователь уже существует")
            setShowAlert(true)
            setTimeout(()=>{setShowAlert(false)}, 5000)
        }
        else{
                const payload = {id:1, username: nickname, login: login, password: password}
                axios.post("https://647ded02af984710854a9d6d.mockapi.io/users", payload)
                dispatch(addUser(payload))
                setShouldRedirect(true)
            }
        }
    }
    return(
    shouldRedirect?<Navigate to={"/"}/>:<div className="Registration">
        <Header/>
        <div className="LoginForm">
            <div className="inputForm">
                <div className="login-text">Регистрация</div>
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
        <AlertCustom text={error} showAlert={showAlert}/>
    </div>
    )
}

export default Registration;