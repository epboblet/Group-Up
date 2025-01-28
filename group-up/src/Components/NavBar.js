import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../Group-Up Logo.svg';
import logoLight from '../Group-Up Logo Light.svg';

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

    useEffect(() => {
        const onScroll = () => {
            let scrollToTop = document.querySelector("#scroll-to-top")
            if(window.scrollY==0 && !scrollToTop.classList.contains("hidden")){
                scrollToTop.classList.add("hidden");
            }
            else if(scrollToTop.classList.contains("hidden")) {
                scrollToTop.classList.remove("hidden");
            }
        };
          
        window.addEventListener('scroll', onScroll);
        
        return () => {
          window.removeEventListener('scroll', onScroll);
        }
      }, []);

  return (
    <>
            {/* <div className='heading'> */}
                <img src={isLightMode ? logo : logoLight} className='App-icon' onClick={() => {navigate('/')}}></img>
            {/* </div> */}
    {
        <nav id="nav" className={`nav${isNavShown ? " open" : ""}`} classList={["nav"]}>
            <span className="material-symbols-outlined nav-icon" onClick={() => {setIsNavShown(!isNavShown)}}>
                menu
            </span>
            <div className='nav-item' title='Home' onClick={() => {navigate('/')}}>
                <span className="material-symbols-outlined nav-icon">
                    home
                </span>
                <Link to="/Group-Up" className={`nav-link ${isNavShown ? "" : "hidden"}`}>Home</Link>
            </div>
            <div className='nav-item' title='Profile' onClick={() => {navigate('/profile')}}>
                <span className="material-symbols-outlined nav-icon">
                    account_circle
                </span>
                <Link to="/profile" className={`nav-link ${isNavShown ? "" : "hidden"}`}>Profile</Link>
            </div>
            <div className='nav-item' title='Explore' onClick={() => {navigate('/explore')}}>
                <span className="material-symbols-outlined nav-icon">
                    search
                </span>
                <Link to="/explore" className={`nav-link ${isNavShown ? "" : "hidden"}`}>Explore</Link>
            </div>
            <div className='nav-item' title='Messages' onClick={() => {navigate('/messages')}}>
                <span className="material-symbols-outlined nav-icon">
                    mail
                </span>
                <Link to="/messages" className={`nav-link ${isNavShown ? "" : "hidden"}`}>Messages</Link>
            </div>
            <div className='nav-item' title='Theme' onClick={() => {changeTheme()}}>
                <span className="material-symbols-outlined nav-icon light-dark">
                {isLightMode ? "dark_mode" : "light_mode"}
                </span>
                <a className={`nav-link ${isNavShown ? "" : "hidden"}`}>{isLightMode ? "Dark Mode" : "Light Mode"}</a>
            </div>
        </nav>
    }
        <div className='top hidden' onClick={() => {window.scrollTo(0,0)}} id='scroll-to-top'>
            <span className="material-symbols-outlined nav-icon">
                arrow_upward
            </span>
        </div>
    </>
  )
}

export default NavBar;
