import '../App.css';
import ProjectCard from '../Components/ProjectCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchInfo = async () => {
            try {
                axios.get('http://localhost:8081/test', {
                    signal: abortController.signal,
                })
                .then((res) => {
                    if(res != null) {
                        console.log(res.data.projects);
                        setProjects(prevProjects => [...prevProjects, ...res.data.projects]);
                        console.log(projects);
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

        //testing for get routes
        const test = async () => {
            //replace the value of this variable with the testing route
            let route = 'test'
            try {
                axios.get('http://localhost:8080/'+route, {
                    signal: abortController.signal,
                })
                .then((res) => {
                    if(res != null) {
                        console.log('this is the testing route');
                        console.log(res.data);
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

        test();

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