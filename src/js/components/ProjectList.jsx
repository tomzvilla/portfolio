import React from 'react'
import ProjectCard from './ProjectCard'
const projects = [{
    title: 'CienciaConecta',
    technologies: [{name: 'React'}, {name: 'Redux'}, {name: 'NodeJS'}],
    description: 'An application for managing the Science and Technology Fair of the Province of Cordoba. Developed and desgined the project frontend, including role-based authentication and authorization, session and user management.',
    media: 'CienciaConecta.png'
}]

const ProjectList = () => {
  return (
    <div className='mt-[10rem]'>
        <h2 className='text-4xl relative flex flex-wrap items-center justify-center text-white mb-24 tracking-tight font-bold z-20' > Projects </h2>
        {projects.map((project, index) => <ProjectCard project={project} key={index} />)}
    </div>
  )
}

export default ProjectList