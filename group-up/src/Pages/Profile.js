import axios from 'axios';
import '../App.css';
import { useDispatch } from 'react-redux';
import {logout} from '../state/slice/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NoPage from './NoPage';



const Profile = () =>  {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({name: "", username: "", major: "", year: "", bio: "", skills: "", photo: ""});
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        console.log(id);

        const fetchInfo = async () => {
            try {
                axios.get('http://localhost:8080/test', {
                    signal: abortController.signal,
                    withCredentials: true,
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
            finally {
                setLoading(false);
            }
        }

        const getUser = async () => {
            const url = id ? 'http://localhost:8080/profile/' + id : 'http://localhost:8080/profile/';
            try {
                axios.get(url, {
                    signal: abortController.signal,
                    withCredentials: true,
                })
                .then((res) => {
                    if(res != null) {
                        if(!res.data.bio) {
                            res.data.bio = "This user has not added a bio.";
                        }
                        setUser(res.data);
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
            console.log(user);
        }

        // fetchInfo();
        getUser();

        return () => abortController.abort();
    }, [])

    const updateName = (e) => {
        setUser({
            ...user,
            name: e.target.value
        });
    }

    const updateBio = (e) => {
        setUser({
            ...user,
            bio: e.target.value
        });
    }

    const logOutUser = () => {
        axios.get('http://localhost:8080/logout', {
        }, {withCredentials: true})
        .then((res) => {
          if(res.status == 200) {
            dispatch(logout());
            console.log(res.data?.message);
          }
        })
        .catch((err) => {
            console.log(err);
        })
      }

      const editUser = () => {
        axios.post('http://localhost:8080/profile', user, 
        {withCredentials: true})
        .catch((err) => {
            console.log(err);
        })
      }

      if(!user.username && !loading) {
        return <NoPage />
      }

    return (
        <>
            <div id='header'>
                <div id='user'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg" className='profile-picture'/>
                    <div id='user-info'>
                        {
                            editing ?
                            <input type='text' defaultValue={user.name} onChange={updateName}></input> :
                            <h1 className="info">{user.name}</h1>
                        }
                        <h2 className="info">@{user.username}</h2>
                        {/* this line shows the major if there is one and then shows the "- year" if they also added a year */}
                        {user.major && <h2 className="info">{user.major}{(user.major && user.year) && " - " + user.year}</h2>}
                    </div>
                    {
                        !id && (
                            editing ?
                            <span class="material-symbols-outlined save-profile" onClick={() => {
                                editUser()
                                setEditing(!editing)
                            }}>save_as</span> :
                            <>
                                <span class="material-symbols-outlined edit-profile" onClick={() => setEditing(!editing)}>edit_square</span>
                                <div className='button-logout' onClick={() => logOutUser()}>
                                    Logout
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div id='body'>
                <div id='about-user'>
                    <h1 className='heading'>About</h1>
                    {
                        editing ?
                        <textarea id='about-user-edit' defaultValue={user.bio} onChange={updateBio}></textarea> :
                        <p id='about-user-content'>{user.bio}</p>
                    }
                </div>

                <div id="user-projects">
                    <h1 className='heading'></h1>

                </div>
            </div>
        </>
    );
}

export default Profile