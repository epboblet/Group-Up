import React from 'react';

export const ProjectCard = ({project}) => {
  return (
    <div className='project-card'>
        <div className='card-head'>
            <div className='user'>
                <img src={project.user.profileIcon} className='profile-icon'/>
                <p className='username'>{project.user.username}</p>
            </div>
            <span className="material-symbols-outlined open-project">
                open_in_full
            </span>
        </div>
        <div className='card-content'>
            <h2>{project.name}</h2>
            <h3>{project.type}</h3>
            <p className='project-description'>
                {project.description}
            </p>
            <img src={project.image} className='project-image'/>
        </div>
    </div>
  )
}

export default ProjectCard;