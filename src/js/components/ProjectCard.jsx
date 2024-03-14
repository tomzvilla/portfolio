import React from 'react'
import Tech from './Tech'
import { getImageUrl } from '../../utils/image-util'
import { Link } from 'react-router-dom'
const ProjectCard = ({project}) => {
  return (
    <div className='flex flex-col'>
        <div className='flex flex-col m-auto items-center justify-center z-10 mt-24 lg:flex-row xl:gap-28'>
            {/* card content */}
            <div className='flex flex-col items-center md:items-start max-w-[700px] lg:max-w-[600px] justify-center text-white space-y-7 z-10'>
                <h3 className='text-3xl '>{project.title}</h3>
                <ul className='flex space-x-4'>
                    {project.technologies.map((t, index) => <Tech tech={t} key={index}/>)}
                </ul>
                <p className='text-lg pb-5 text-center md:text-left'>{project.description}</p>
            </div>
            {/* card image */}
            <div className='z-10'>
                <img className='w-[350px] rounded-xl aspect-[16/9] lg:ml-10' src={getImageUrl(project.media)} alt="" />
            </div>
        </div>
        <Link to={`/project/${project.title}`} class="relative px-10 py-4 font-bold text-[#222831] group self-center mt-10">
            <span class="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-3 -translate-y-3 bg-[#4CCD99] ease group-hover:translate-x-0 group-hover:translate-y-0 z-10"></span>
            <span class="absolute inset-0 w-full h-full ease border-2 border-[#FFF] group-hover:translate-x-0 group-hover:translate-y-0 z-0"></span>
            <span class="relative z-10 -inset-3 transition-all duration-300 ease group-hover:inset-0">View project</span>
        </Link>
    </div>
  )
}

export default ProjectCard