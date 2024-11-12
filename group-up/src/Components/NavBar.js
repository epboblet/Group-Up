import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const NavBar = () => {
    const [isNavShown, setIsNavShown] = useState(false);
    const [isLightMode, setIsLightMode] = useState(document.documentElement.className == "light");
    const navigate = useNavigate();

    const changeTheme = () => {
        let theme = document.documentElement.className;
        theme ??= "dark";
        document.documentElement.className = theme == "light" ? "dark" : "light";
        setIsLightMode(document.documentElement.className == "light");
    }

  return (
    <>
    {
        <nav id="nav" className={isNavShown ? "nav-out" : "nav-in"}>
            <span className="material-symbols-outlined nav-icon" onClick={() => {setIsNavShown(!isNavShown)}}>
                menu
            </span>
            <div className='nav-item' onClick={() => {navigate('/')}}>
                <span className="material-symbols-outlined nav-icon">
                    home
                </span>
                <p className={!isNavShown ? "hidden" : ""}>
                    <Link to="/" className='nav-link'>Home</Link>
                </p>
            </div>
            <div className='nav-item' onClick={() => {navigate('/profile')}}>
                <span className="material-symbols-outlined nav-icon">
                    account_circle
                </span>
                <p className={!isNavShown ? "hidden" : ""}>
                    <Link to="/profile" className='nav-link'>Home</Link>
                </p>
            </div>
            <div className='nav-item' onClick={() => {navigate('/explore')}}>
                <span className="material-symbols-outlined nav-icon">
                    search
                </span>
                <p className={!isNavShown ? "hidden" : ""}>
                    <Link to="/explore" className='nav-link'>Explore</Link>
                </p>
            </div>
            <div className='nav-item' onClick={() => {navigate('/messages')}}>
                <span className="material-symbols-outlined nav-icon">
                    mail
                </span>
                <p className={!isNavShown ? "hidden" : ""}>
                    <Link to="/messages" className='nav-link'>Messages</Link>
                </p>
            </div>
            <div className='nav-spacer'></div>
            <div className='nav-item' onClick={() => {changeTheme()}}>
                <span className="material-symbols-outlined nav-icon light-dark">
                {isLightMode ? "dark_mode" : "light_mode"}
                </span>
                <p className={!isNavShown ? "hidden" : ""}>
                    <a className='nav-link'>{isLightMode ? "Dark Mode" : "Light Mode"}</a>
                </p>
            </div>
        </nav>
    }
    </>
  )
}

export default NavBar;
