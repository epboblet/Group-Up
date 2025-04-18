import axios from 'axios';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../state/slice/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NoPage from './NoPage';
import { setPosts } from '../state/slice/postsSlice';
import ProjectCard from '../Components/ProjectCard';


const Profile = () =>  {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({user_id: 0, displayname: "", username: "", major: "", year: "", bio: "", skills: "", photo: ""});
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const posts = useSelector(state => state.posts.value);

    const abortController = new AbortController();

    const fetchPosts = async () => {
        try {
            axios.get('http://localhost:8080/posts', {
                signal: abortController.signal,
                withCredentials: true,
            })
            .then((res) => {
                if(res != null) {
                    dispatch(setPosts([...res.data.reverse()]));
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        catch (error) {
            if (error.name !== "CanceledError") {
                console.log(error);
            }
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
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
        getUser();

        return () => abortController.abort();

    }, []);

    const clearPhoto = () => {
        setSelectedPhoto(null);
    }

    const updateName = (e) => {
        setUser({
            ...user,
            displayname: e.target.value
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
            let allCookies = document.cookie.split(';');

            for (let i = 0; i < allCookies.length; i++){
                document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
            }

            dispatch(logout());
            navigate('/');
            console.log(res.data?.message);
          }
        })
        .catch((err) => {
            console.log(err);
        })
      }

      const editUser = () => {
        const formData = new FormData();

        formData.append('user', JSON.stringify({
            ...user,
        }));
    
        // Append photo if there's one selected
        if (selectedPhoto != null) {
            formData.append('photo', selectedPhoto);
        }

        axios.post('http://localhost:8080/profile', formData, 
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then((res) => {
            setUser(res.data.profile);
            fetchPosts();
            clearPhoto();
        })
        .catch((err) => {
            console.log(err);
        })
      }


      if(user.username == "" && !loading) {
        return <NoPage />
      }

    return (
        <>
            <div id='header'>
                <div id='user'>
                    {
                        editing ? 
                        <input type="file" name="photo" id='photo' accept="image/*" onChange={(e) => setSelectedPhoto(e.target.files[0])} ></input> :
                        <img src={user.photo} className='profile-picture'/>
                    }
                    <div id='user-info'>
                        {
                            editing ?
                            <input type='text' defaultValue={user.displayname} onChange={updateName}></input> :
                            <h1 className="info">{user.displayname}</h1>
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
                    <h1 className='heading'>{user.displayname ?? user.username}'s Projects</h1>
                    {
                        posts.map((e) => {
                            return(
                               (user.user_id == e.user.user_id) && <ProjectCard key={e.id} project={e} loggedIn={!id} fetchPosts={fetchPosts}/>
                            )
                        })
                    }

                </div>
            </div>
        </>
    );
}

export default Profile