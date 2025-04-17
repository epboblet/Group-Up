import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProjectCard = ({project, loggedIn, fetchPosts}) => {
    const [editing, setEditing] = useState(false);
    const [displayProject, setDisplayProject] = useState(project);
    const [updatedProject, setUpdatedProject] = useState({title: project.name, content: project.description, photo: project.image});
    const navigate = useNavigate();

    const updateName = (e) => {
        setDisplayProject({
            ...displayProject,
            name: e.target.value
        });
        setUpdatedProject({
            ...updatedProject,
            title: e.target.value
        });
    }

    const truncate = (string) => {
        if(string.length > 500 && !(string.length < 550)) {
            return string.substring(0, 500).trimEnd() + "...";
        }
        return string;
    }

    const updateDescription = (e) => {
        setDisplayProject({
            ...displayProject,
            description: e.target.value
        });
        setUpdatedProject({
            ...updatedProject,
            content: e.target.value
        });
    }

    const updateProject = () => {
        axios.post(`http://localhost:8080/edit-post/${displayProject.id}`,
        {
            title: updatedProject.title,
            content: updatedProject.content,
            photo: updatedProject.photo,
        }, 
        {withCredentials: true})
        .then(() => {
            fetchPosts();
        })
        .catch((err) => {
            console.log(err);
        })
    }

  return (
    <div className={'project-card'}>
        <div className='card-head'>
            <div className='user' onClick={() => navigate('/profile/'+displayProject.user.username)}>
                <img src={displayProject.user.profileIcon} className='profile-icon'/>
                <div className='names'>
                    <p className='display-name'>{displayProject.user?.displayName}</p>
                    <p className='username'>@{displayProject.user?.username}</p>
                </div>
            </div>
            <span 
                className={`material-symbols-outlined ${loggedIn ? '' : 'open-project'}`} 
                onClick={() => {
                    if (loggedIn) {
                        if(editing) {
                            updateProject();
                        }
                        setEditing(!editing);
                    } else {
                        navigate(`/project/${displayProject.id}`);
                    }
                }}
            >
                {loggedIn ? (editing ? 'save_as' : 'edit_square') : 'open_in_full'}
            </span>
        </div>
        <div className='card-content'>
            <div className='card-text'>
                {
                    editing ?
                    <input type='text' defaultValue={displayProject.name} onChange={updateName}></input> :
                    <h2 className='project-title' onClick={() => navigate('/project/'+displayProject.id)}>{displayProject.name}</h2>
                }
                {displayProject?.image && <img src={displayProject.image} className='project-image'/>}
                {displayProject.primarytag && <h3 className='project-type'>{displayProject?.primarytag}</h3>}
                {
                    editing ?
                    <textarea defaultValue={displayProject.description} onChange={updateDescription}></textarea> :
                    <pre className='project-description'>{truncate(displayProject.description)}</pre>
                }
            </div>
        </div>
    </div>
  )
}

export default ProjectCard;