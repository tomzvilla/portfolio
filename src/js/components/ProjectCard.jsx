import React from 'react'
import Tech from './Tech'
import { getImageUrl } from '../../utils/image-util'
import { Link } from 'react-router-dom'
const ProjectCard = ({project}) => {
  return (
    <div className='flex flex-row m-auto items-center justify-center gap-28 z-10'>
        {/* card content */}
        <div className='flex flex-col items-start max-w-[500px] justify-center text-white space-y-7 z-10'>
            <h3 className='text-3xl '>{project.title}</h3>
            <ul className='flex space-x-4'>
                {project.technologies.map((t, index) => <Tech tech={t} key={index}/>)}
            </ul>
            <p className='text-lg pb-5'>{project.description}</p>
            <Link to={`/project/${project.title}`} class="relative px-10 py-4 font-bold text-[#222831] group self-center">
                <span class="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-3 -translate-y-3 bg-[#4CCD99] ease group-hover:translate-x-0 group-hover:translate-y-0 z-10"></span>
                <span class="absolute inset-0 w-full h-full ease border-2 border-[#FFF] group-hover:translate-x-0 group-hover:translate-y-0 z-0"></span>
                <span class="relative z-10 -inset-3 transition-all duration-300 ease group-hover:inset-0">View project</span>
            </Link>
        </div>
        {/* card image */}
        <div className='z-10'>
            <img className='w-[450px] rounded-xl ml-10' src={getImageUrl(project.media)} alt="" />
        </div>
    </div>
  )
}

export default ProjectCard