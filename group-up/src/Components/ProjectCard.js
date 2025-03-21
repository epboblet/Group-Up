import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProjectCard = ({project}) => {
    const [fullScreen, setFullscreen] = useState(false);
    const navigate = useNavigate();
  return (
    <div className={`project-card ${fullScreen ? 'fullscreen' : ''}`}>
        <div className='card-head'>
            <div className='user' onClick={() => navigate('/profile/'+project.user.username)}>
                <img src={project.user.profileIcon} className='profile-icon'/>
                <div className='names'>
                    <p className='display-name'>{project.user?.displayName}</p>
                    <p className='username'>@{project.user?.username}</p>
                </div>
            </div>
            <span className="material-symbols-outlined open-project" onClick={() => navigate('/project/'+project.id)}>
                open_in_full
            </span>
        </div>
        <div className='card-content'>
            <div className='card-text'>
                <h2 className='project-title' onClick={() => navigate('/project/'+project.id)}>{project.name}</h2>
                {project.type && <h3 className='project-type'>{project?.type}</h3>}
                <p className='project-description'>
                    {project.description}
                </p>
            </div>
            {project?.image && <img src={project.image} className='project-image'/>}
        </div>
    </div>
  )
}

export default ProjectCard;