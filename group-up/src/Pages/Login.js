import React from 'react'

export const Login = () => {
  return (
    <>
      <h1 className='body-content'>
        Login
      </h1>
      <div className='body-content'>
        <form action='/login' method='post'>
        <label>username: </label>
        <input type = "text" name="username" placeholder = "user name"/><br></br>
        <label>password: </label>
        <input type = "password" name="password" placeholder = "password"/><br></br>
        <input type ="submit"/>
        </form>
      </div>
    </>
  )
}

export default Login;
