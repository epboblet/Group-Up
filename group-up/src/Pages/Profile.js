import axios from 'axios';
import '../App.css';
import { useDispatch } from 'react-redux';
import {logout} from '../state/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



const Profile = () =>  {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({displayName: "", username: "", major: "", year: "", about: "", projects: []}); 

    useEffect(() => {
        const abortController = new AbortController();

        const fetchInfo = async () => {
            try {
                axios.get('http://localhost:8080/test/', {
                    signal: abortController.signal,
                })
                .then((res) => {
                    if(res != null) {
                        setUser(res.data.users[0].user);
                    }
                })
                .catch((error) => {
                    if (error.name !== "CanceledError") {
                        console.log(error);
                    }
                });
            }
            catch (error) {
                if (error.name !== "CanceledError") {
                    console.log(error);
                }
            }
        }

        const fetchInfo2 = async () => {
            try {
                axios.get('http://localhost:8080/profile/a', {
                    signal: abortController.signal,
                })
                .then((res) => {
                    if(res != null) {
                        console.log(res);
                    }
                })
                .catch((error) => {
                    if (error.name !== "CanceledError") {
                        console.log(error);
                    }
                });
            }
            catch (error) {
                if (error.name !== "CanceledError") {
                    console.log(error);
                }
            }
        }

        fetchInfo();
        fetchInfo2();

        return () => abortController.abort();
    }, [])

    const logOutUser = () => {
        axios.post('http://localhost:8081/logout', {
        }, {withCredentials: true})
        .then((res) => {
          if(res.status == 200) {
            dispatch(logout());
            navigate('/')
            console.log(res.data?.message);
          }
        })
        .catch((err) => {
            console.log(err);
        })
      }

    return (
        <>
            <div id='header'>
                <div id='user'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg" className='profile-picture'/>
                    <div id='user-info'>
                        <h1 className="info">{user.displayName}</h1>
                        <h2 className="info">@{user.username}</h2>
                        <h2 className="info">{user.major} - {user.year}</h2>
                    </div>
                </div>
            </div>
            <div id='body'>
                <div id='about-user'>
                    <h1 className='heading'>About</h1>
                    <p id='about-user-content'>
                        Woah I really love stuff, big fan of stuff. I also really enjoy long sentences that fill out the about section of the profile 
                        so that I can see how stuff looks on the page.
                    </p>
                </div>

                <div id="user-projects">
                    <h1 className='heading'></h1>

                </div>
            </div>
        </>
    );
}

export default Profile