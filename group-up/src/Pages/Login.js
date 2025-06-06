import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {login} from '../state/slice/userSlice';
import Bubbles from '../Components/Bubbles';
import PasswordField from '../Components/PasswordField';
import clownfish from '../images/clownfish.png'


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

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <Bubbles height='100vh'></Bubbles>
      <div className='login-container'>
        <div className='login'>
          <h1 className='login-text'>Welcome back!</h1>
          <h3 className='login-text'>Sign in to post projects</h3>
          <div className='login-info-area'>
            <label className='login-label'>Username</label>
            <input className='login-text-field' type='text' name='username' placeholder='username' id='username'/>
            <label className='login-label'>Password</label>
            <PasswordField name='password' />
            {
              isRegister && (
                <>
                  <label className='login-label'>Confirm Password</label>
                  <PasswordField name='confirmPassword' />
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

          <input className='login-submit' type ="submit" value={isRegister ? "SIGN UP" : "SIGN IN"} onClick={() => {
          setErrorMessage("");
          isRegister ? registerUser() : loginUser()
          }}/>

        </div>
      </div>
      <div id='fish-footer'>
          <img src={clownfish} className='fish' id='fish-1' />
          <img src={clownfish} className='fish' id='fish-2' />
          <img src={clownfish} className='fish' id='fish-3' />
          <img src={clownfish} className='fish' id='fish-4' />
      </div>
    </>
  )
}

export default Login;
