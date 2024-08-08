import React, { useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from '../../utils/projects';

const underlineVariant = {
  visible: { width: '100%', transition: { duration: 0.5 } },
  hidden: { width: '0%' }
};

const ProjectList = () => {
  const control = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
      if (inView) {
          control.start("visible");
      } else {
          control.start("hidden");
      }
  }, [control, inView]);

  return (
    <section className='mt-[14rem] flex flex-col items-center' id='projects'>
        <div ref={ref} className='relative mb-20 group'>
          <h2 className='relative text-4xl text-white tracking-tight font-bold z-20' > Projects </h2>
          <motion.div variants={underlineVariant} initial={'hidden'} animate={control} className='abslute bg-primary py-3 -mt-5 ml-1 group-hover:animate-underlined z-20'></motion.div>
        </div>
        {projects.map((project, index) => <ProjectCard project={project} key={index} />)}
        <div className='text-white text-lg sm:text-2xl flex flex-col items-center mt-[5rem] font-bold relative z-10'>
          <h4 className='mt-5'>You can find more of my projects <a href='https://github.com/tomzvilla' target='_blank' className='text-primary hover:border-b hover:border-primary'>here!</a></h4>
        </div>
    </section>
  )
}

export default ProjectList