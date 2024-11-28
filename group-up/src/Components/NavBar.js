import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spacer } from './Spacer';
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
                <img src={isLightMode ? logo : logoLight} className='App-icon' onClick={() => {navigate('/Group-Up')}}></img>
            {/* </div> */}
    {
        <nav id="nav" className={`nav${isNavShown ? " open" : ""}`} classList={["nav"]}>
            <span className="material-symbols-outlined nav-icon" onClick={() => {setIsNavShown(!isNavShown)}}>
                menu
            </span>
            <div className='nav-item' onClick={() => {navigate('/Group-Up')}}>
                <span className="material-symbols-outlined nav-icon">
                    home
                </span>
                <p>
                    <Link to="/Group-Up" className='nav-link'>Home</Link>
                </p>
            </div>
            <div className='nav-item' onClick={() => {navigate('/profile')}}>
                <span className="material-symbols-outlined nav-icon">
                    account_circle
                </span>
                <p>
                    <Link to="/profile" className='nav-link'>Profile</Link>
                </p>
            </div>
            <div className='nav-item' onClick={() => {navigate('/explore')}}>
                <span className="material-symbols-outlined nav-icon">
                    search
                </span>
                <p>
                    <Link to="/explore" className='nav-link'>Explore</Link>
                </p>
            </div>
            <div className='nav-item' onClick={() => {navigate('/messages')}}>
                <span className="material-symbols-outlined nav-icon">
                    mail
                </span>
                <p>
                    <Link to="/messages" className='nav-link'>Messages</Link>
                </p>
            </div>
            <Spacer height={100} unit={"em"}/>
            <div className='nav-item' onClick={() => {changeTheme()}}>
                <span className="material-symbols-outlined nav-icon light-dark">
                {isLightMode ? "dark_mode" : "light_mode"}
                </span>
                <p>
                    <a className='nav-link'>{isLightMode ? "Dark Mode" : "Light Mode"}</a>
                </p>
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
