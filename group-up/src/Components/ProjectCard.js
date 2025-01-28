import React, { useState } from 'react';

export const ProjectCard = ({project}) => {
    const [fullScreen, setFullscreen] = useState(false);
  return (
    <div className={`project-card ${fullScreen ? 'fullscreen' : ''}`}>
        <div className='card-head'>
            <div className='user'>
                <img src={project.user.profileIcon} className='profile-icon'/>
                <div className='names'>
                    <p className='display-name'>{project.user.displayName}</p>
                    <p className='username'>@{project.user.username}</p>
                </div>
            </div>
            <span className="material-symbols-outlined open-project">
                open_in_full
            </span>
        </div>
        <div className='card-content'>
            <div className='card-text'>
                <h2 className='project-title'>{project.name}</h2>
                <h3 className='project-type'>{project.type}</h3>
                <p className='project-description'>
                    {project.description}
                </p>
            </div>
            <img src={project.image} className='project-image'/>
        </div>
    </div>
  )
}

export default ProjectCard;