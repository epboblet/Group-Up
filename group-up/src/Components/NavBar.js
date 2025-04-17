import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../Group-Up Logo.svg';
import logoLight from '../Group-Up Logo Light.svg';
import coral_icon from '../images/coral_icon.png';

export const NavBar = () => {
    const [isNavShown, setIsNavShown] = useState(false);
    let theme = localStorage.getItem("lightTheme");
    theme ??= "light";
    const [isLightMode, setIsLightMode] = useState((theme == "light") ? true : false);
    const navigate = useNavigate();

    const changeTheme = () => {
        let theme = document.documentElement.className;
        theme ??= "dark";
        localStorage.setItem("lightTheme", (theme == "light") ? "dark" : "light");
        document.documentElement.className = (theme == "light") ? "dark" : "light";
        setIsLightMode(document.documentElement.className == "light");
    }

    useEffect(() => {
        let theme = localStorage.getItem("lightTheme");
        theme ??= "light";
        document.documentElement.className = theme;

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
                <img src={coral_icon} className='App-icon' onClick={() => {navigate('/')}}></img>
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
            <div className='nav-item' title='Explore' onClick={() => {navigate('/create-post')}}>
                <span className="material-symbols-outlined nav-icon">
                    add_circle
                </span>
                <Link to="/explore" className={`nav-link ${isNavShown ? "" : "hidden"}`}>New Post</Link>
            </div>
            {/* <div className='nav-item' title='Messages' onClick={() => {navigate('/messages')}}>
                <span className="material-symbols-outlined nav-icon">
                    mail
                </span>
                <Link to="/messages" className={`nav-link ${isNavShown ? "" : "hidden"}`}>Messages</Link>
            </div> */}
            <div className='nav-item' title='Theme' onClick={() => {changeTheme()}}>
                <span className="material-symbols-outlined nav-icon light-dark">
                {isLightMode ? "dark_mode" : "light_mode"}
                </span>
                <a className={`nav-link ${isNavShown ? "" : "hidden"}`}>{isLightMode ? "Dark Mode" : "Light Mode"}</a>
            </div>
        </nav>
    }
        <div className='top hidden' onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} id='scroll-to-top'>
            <span className="material-symbols-outlined nav-icon">
                arrow_upward
            </span>
        </div>
    </>
  )
}

export default NavBar;
