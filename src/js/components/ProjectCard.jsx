import React, { useEffect, useState } from 'react'
import Tech from './Tech'
import Reveal from './Reveal'
import { getImageUrl, getVideoUrl } from '../../utils/image-util'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from "react-intersection-observer"

const imageVariant = {
    hidden: {opacity: 0, y: 150},
    visible: {opacity: 1, y: 0},
}
const textVariant = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
}

const badgeVariant = {
    hidden: {y: 40},
    visible: {y: [-20, 10, -5, 0]},
}

const ProjectCard = ({project}) => {

    const [ref, inView] = useInView({ threshold: 0.6 });
    const [animationRan, setAnimationRan] = useState(false)

    const mainControls = useAnimation()

    useEffect(() => {
        if(inView && !animationRan) {
            mainControls.start('visible');
            setAnimationRan(true);
        }

    }, [inView, mainControls, animationRan]);

  return (
    <div className='flex flex-col'>
        <div ref={ref} className='flex flex-col m-auto items-center justify-center z-10 mt-24 lg:flex-row xl:gap-28'>
            {/* card content */}
            <Reveal transitionDuration={0.7}>
                <div className='flex flex-col items-center md:items-start max-w-[700px] lg:max-w-[600px] justify-center text-white space-y-7 z-10'>
                    <h3 className='text-3xl text-center'>{project.title}</h3>
                    <ul className='flex space-x-4 flex-wrap [&>div]:mb-5 items-center justify-center'>
                        {project.technologies.map((t, index) => 
                        <motion.div
                            variants={badgeVariant} 
                            initial='hidden'
                            animate={mainControls}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            key={index}
                        >
                            <Tech tech={t}/>
                        </motion.div>
                        )}
                    </ul>
                    <p className='text-md md:text-lg pb-5 text-center md:text-left'>{project.description}</p>
                </div>
            </Reveal>
            {/* card image */}
            { !project.video ?
                <motion.div 
                    variants={imageVariant} 
                    initial='hidden'
                    animate={mainControls}
                    className='z-10'
                    transition={{ duration: 0.5 }}
                >
                    <img className='w-[300px] sm:w-[350px] rounded-xl aspect-[16/9] lg:ml-10 ease-linear transition-all hover:scale-110' src={getImageUrl(project.media)} alt="" />
                </motion.div>
                :
                <div className='relative z-10'>
                    <video class="relative w-[300px] sm:w-[350px] rounded-xl aspect-[16/9] lg:ml-10 z-20">
                        <source src={getVideoUrl(project.video)}  type="video/webm" />
                    </video>
                </div>
            }
        </div>
        <Link to={`/project/${project.shortname}`} className="relative px-10 py-4 font-bold text-[#222831] group self-center mt-10">
            <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-3 -translate-y-3 bg-[#4CCD99] ease group-hover:translate-x-0 group-hover:translate-y-0 z-10"></span>
            <span className="absolute inset-0 w-full h-full ease border-2 border-[#FFF] group-hover:translate-x-0 group-hover:translate-y-0 z-0"></span>
            <span className="relative z-10 -inset-3 transition-all duration-300 ease group-hover:inset-0">View project</span>
        </Link>
    </div>
  )
}

export default ProjectCard