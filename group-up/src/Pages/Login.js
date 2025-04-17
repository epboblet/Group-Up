import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {login} from '../state/slice/userSlice';
import Bubbles from '../Components/Bubbles';
import PasswordField from '../Components/PasswordField';


export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = () => {
    axios.post('http://localhost:8080/register', {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      confirmPass: document.getElementById("confirmPassword").value,
    }, {withCredentials: true})
    .then((res) => {
      if(res.status == 200) {
        dispatch(login());
        navigate("/");
      }
    })
    .catch((err) => {
      let message = err?.response?.data?.message;
      message ??= "An error occured while attempting to register";

      setErrorMessage(message);
    })
  }

  const loginUser = () => {
    axios.post('http://localhost:8080/login', {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }, {withCredentials: true})
    .then((res) => {
      if(res.status == 200) {
        dispatch(login());
        navigate("/");
      }
    })
    .catch((err) => {
      let message = err?.response?.data?.message;
      message ??= "An error occured while attempting to log in";
      console.log(message);

      setErrorMessage(message);
    })
  }

  return (
    <>
      <Bubbles height='100vh'></Bubbles>
      <div className='login-container'>
        <div className='login'>
          <h1 className='login-text'>Welcome back!</h1>
          <h3 className='login-text'>Sign in to post projects.</h3>
          <div className='login-info-area'>
            <label className='login-label'>Username</label>
            <br/>
            <input className='login-text-field' type='text' name='username' placeholder='user name' id='username'/>
            <br/>
            <br/>
            <br/>
            <label className='login-label'>Password</label>
            <br/>
            <PasswordField name='password' />
            <br/>
            {
              isRegister && (
                <>
                  <br/>
                  <br/>
                  <label>Confirm Password</label>
                  <br/>
                  <PasswordField name='confirmPassword' />
                  <br/>
                </>
              )
            }
            {errorMessage != "" && <p className='error'>{errorMessage}</p>}
          </div>

          <button className='register-login' onClick={() => {
            setErrorMessage("");
            setIsRegister(!isRegister)
            }}>
              {isRegister ? "LOGIN" : "NEW USER"}
          </button>

          <input className='login-submit' type ="submit" value={"SIGN IN"} onClick={() => {
          setErrorMessage("");
          isRegister ? registerUser() : loginUser()
          }}/>

        </div>
      </div>
    </>
  )
}

export default Login;
