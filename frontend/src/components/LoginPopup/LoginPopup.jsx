import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const {url, token, setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email:"",
        password:""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
        event.preventDefault()
        let newUrl = url;
        if (currState==="Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if (response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(res.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} onClick={() => { setShowLogin(false) }} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ?
                        <></>
                        :
                        <input name="name" value = {data.name} onChange={onChangeHandler} type="text" placeholder='Username' required />
                    }
                    <input name="email" value = {data.email} onChange={onChangeHandler} type="email" placeholder='Email' required />
                    <input name="password" value = {data.password} onChange={onChangeHandler} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === 'SignUp' ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>By continuing I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                ?
                <p>Create a new account? <span onClick={()=>setCurrState("SignUp")}>Click here</span></p>
                :
                <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>

            }
               
                
            </form>
        </div>
    )
}

export default LoginPopup