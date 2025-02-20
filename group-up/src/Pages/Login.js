import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {login} from '../state/slice/userSlice';


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
      <h1 className='body-content'>
        {isRegister ? "Register" : "Login"}
      </h1>
      <div className='body-content'>
        <label>Username: </label>
        <input type = 'text' name='username' placeholder='user name' id='username'/><br></br>
        <label>Password: </label>
        <input type = 'password' name='password' placeholder='password' id='password'/><br></br>
        {
          isRegister && (
            <>
              <label>Confirm Password: </label>
              <input type = 'password' name='confirmPassword' placeholder='password' id='confirmPassword'/><br></br>
            </>
          )
        }

        {
          errorMessage && <p className='error'>{errorMessage}</p>
        }

        <input type ="submit" onClick={() => {
          setErrorMessage("");
          isRegister ? registerUser() : loginUser()
          }}/>

        <button className='button-main' onClick={() => {
          setErrorMessage("");
          setIsRegister(!isRegister)
          }}>
            {isRegister ? "Login" : "Register"}
        </button>

      </div>
    </>
  )
}

export default Login;
