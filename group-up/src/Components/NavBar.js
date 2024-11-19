import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spacer } from './Spacer';

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
                    <Link to="/profile" className='nav-link'>Profile</Link>
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
            <Spacer height={100} unit={"em"}/>
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
        <div className='top hidden' onClick={() => {window.scrollTo(0,0)}} id='scroll-to-top'>
            <span className="material-symbols-outlined nav-icon">
                arrow_upward
            </span>
        </div>
    </>
  )
}

export default NavBar;
