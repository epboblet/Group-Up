import '../App.css';
import ProjectCard from '../Components/ProjectCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../state/slice/postsSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [projects, setProjects] = useState([{
        id: 5,
        user: {
            id: 1,
            displayName: "Nimrod",
            username: "nimrod",
            profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
        },
        name: "Tower of Babel",
        type: "",
        description: `So were going to build this city right? 
        στο κέντρο της πόλης θα είναι αυτός ο γιγάντιος πύργος. 
        уый тыххæй хъæудзæн бирæ кусæг. 
        つまり、本物のチームプレーヤーが何人か必要になるということです。
        אם אינך יכול לעבוד כחלק מצוות אל תטרח אפילו להגיש מועמדות.
        Ta wieża prawdopodobnie sięgnie nieba.`,
        image: '',
    }]);
    const posts = useSelector(state => state.posts.value);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchInfo = async () => {
            try {
                axios.get('http://localhost:8080/test', {
                    signal: abortController.signal,
                    withCredentials: true,
                })
                .then((res) => {
                    if(res != null) {
                        dispatch(setPosts(res.data.projects));
                        setProjects(prevProjects => [...prevProjects, ...res.data.projects]);
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

        const fetchPosts = async () => {
            try {
                axios.get('http://localhost:8080/posts', {
                    signal: abortController.signal,
                    withCredentials: true,
                })
                .then((res) => {
                    if(res != null) {
                        console.log(res.data);
                        dispatch(setPosts(res.data));
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

        fetchInfo();
        fetchPosts();

        return () => abortController.abort();
    }, [])
    return (
        <>
            <span className='accent-blue'></span>
            <div id='about-container'>
                <span className='accent-pink'></span>
                <div id='about'>
                    <div className='about-content'>
                        <h1 id='about-heading'>
                            CULTIVATING COMMUNITY
                        </h1>
                        <p id='about-body'>
                            Group Up is a platform made by creatives, for creatives. 
                            It brings unique ideas to fruition by allowing people to discover projects in their community, 
                            as well as providing them with a space to organize and collaborate with others.
                        </p>
                        <div>
                            <button className='button-secondary' onClick={() => {navigate('/explore')}}>EXPLORE PROJECTS</button>
                            <button className='button-main' onClick={() => {navigate('/login')}}>SIGN IN</button>
                        </div>
                    </div>
                    <div className='about-graphic'>
                        <div className='graphic blue'></div>
                        <div className='graphic yellow'></div>
                        <div className='graphic pink'></div>
                    </div>
                </div>
            </div>
            <div id='project-container'>
                <button onClick={() => {navigate('/create-post')}}>Create Post</button>
                <div id='project-list'>
                    <h1 className='body-header'>
                        CHECK  THESE  OUT!
                    </h1>
                    {
                        projects.map((e) => {
                            return(
                                <ProjectCard project={e}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Home;