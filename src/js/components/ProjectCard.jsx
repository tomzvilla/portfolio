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
                    <div className='flex flex-row justify-center lg:ml-10 mt-3 gap-5'>
                        <a href={project.projectGithub} target='_blank' className='hover:-rotate-12'>
                            <svg className='fill-current w-[26px] h-[26px] text-white  hover:text-primary' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                            </svg>
                        </a>
                        <a href={project.projectShowcase} target='_blank' className='hover:-rotate-12'>
                            <svg className='fill-current w-[26px] h-[26px] text-white  hover:text-primary' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048">
                                <path fill="currentColor" d="M901 1472q0 65 37 113t97 70q-3 18-5 36t-2 37q0 14 1 29t4 29q-57-11-104-39t-82-70t-54-94t-19-111q0-66 25-124t67-101t101-69t124-26h254q65 0 123 25t101 70t68 102t25 123q0 56-19 108t-52 94t-81 71t-102 40v-133q57-22 92-69t35-111q0-39-15-74t-40-61t-60-42t-75-15h-254q-40 0-75 15t-60 41t-40 61t-15 75m1147 253q0 66-25 125t-68 103t-102 69t-125 26h-256q-67 0-125-25t-101-70t-69-103t-25-125q0-56 19-108t53-95t81-73t103-40v133q-29 10-52 28t-40 43t-26 53t-10 59q0 40 15 75t41 62t61 42t75 16h256q40 0 75-15t61-43t41-62t15-75q0-31-10-60t-27-54t-43-43t-55-28q3-18 5-36t2-37q0-15-2-29t-4-29q57 11 105 40t83 71t54 94t20 111M128 128v1792h896v128H0V0h1115l549 549v475h-128V640h-512V128zm1024 91v293h293z"/>
                            </svg>
                        </a>
                    </div>
                </motion.div>
                :
                <div className='relative z-10'>
                    <video class="relative w-[300px] sm:w-[350px] rounded-xl aspect-[16/9] lg:ml-10 z-20">
                        <source src={getVideoUrl(project.video)}  type="video/webm" />
                    </video>
                </div>
            }
        </div>
        <Link to={`/project/${project.shortname}`} className="relative px-10 py-4 font-bold text-secondary group self-center mt-10">
            <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-3 -translate-y-3 bg-primary ease group-hover:translate-x-0 group-hover:translate-y-0 z-10"></span>
            <span className="absolute inset-0 w-full h-full ease border-2 border-[#FFF] group-hover:translate-x-0 group-hover:translate-y-0 z-0"></span>
            <span className="relative z-10 -inset-3 transition-all duration-300 ease group-hover:inset-0">View project</span>
        </Link>
    </div>
  )
}

export default ProjectCard