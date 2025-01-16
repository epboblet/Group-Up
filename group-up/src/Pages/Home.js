import '../App.css';
import ProjectCard from '../Components/ProjectCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([{
        id: 1,
        user: {
            id: 1,
            displayName: "Nimrod",
            username: "nimrod",
            profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
        },
        name: "Tower of Babel",
        type: "Building",
        description: `So were going to build this city right? 
        στο κέντρο της πόλης θα είναι αυτός ο γιγάντιος πύργος. 
        уый тыххæй хъæудзæн бирæ кусæг. 
        つまり、本物のチームプレーヤーが何人か必要になるということです。
        אם אינך יכול לעבוד כחלק מצוות אל תטרח אפילו להגיש מועמדות.
        Ta wieża prawdopodobnie sięgnie nieba.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg/500px-Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg',
    },
    {
        id: 2,
        user: {
            id: 2,
            displayName: "Tree Lover",
            username: "arbor",
            profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
        },
        name: "Planting a Bunch of Trees",
        type: "Tree",
        description: `TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
        TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
        TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
        TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES! `,
        image: 'https://www.snexplores.org/wp-content/uploads/2020/04/1030_LL_trees.png',
    },
    ]);

    useEffect(() => {
        axios.get('http://localhost:8081/test')
        .then((res) => {
            //this console.log will be in our frontend console
            if(res != null) {
                setProjects(prevProjects => [...prevProjects, res.data]);
                console.log(projects);
            }
        })
        .catch((error) => {
            console.log(error);
          });
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
                            <button className='button-main' onClick={() => {navigate('/profile')}}>SIGN IN</button>
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