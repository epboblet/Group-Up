import { useParams, useNavigate } from 'react-router';
import '../App.css';
import { useEffect, useState } from 'react';
import ProjectCard from '../Components/ProjectCard';
import axios from 'axios';

const Project = () =>  {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({
        id: "",
        user: {
            id: "",
            displayName: "",
            username: "",
            profileIcon: ""
        },
        name: "",
        type: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        const abortController = new AbortController();

        const getPost = async () => {
            try {
                axios.get('http://localhost:8080/posts/' + id, {
                    signal: abortController.signal,
                    withCredentials: true,
                })
                .then((res) => {
                    if(res != null) {
                        setProject(res.data);
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

        getPost();

        return () => abortController.abort();
    }, [])

    return (
        <>
            <div className='project-body'>
                <div>
                    <p id='back-button' onClick={() => {navigate(-1)}}>{'< back'}</p>
                    <h1 id='project-title'>{project.name}</h1>
                </div>
                {project.primarytag && <><br/><h3 className='project-type'>{project?.primarytag}</h3><br/></>}
                {project.secondarytag && project.secondarytag.split(',').map((e) => {
                    return (
                        <>
                            <h3 className='secondary-project-type'>{e}</h3>
                        </>
                    )
                })}
                {project?.image && <><br/><img src={project.image} className='project-image-full'/></>}
                <p id='project-content'>{project.description}</p>
            </div>
        </>
    );
}

export default Project