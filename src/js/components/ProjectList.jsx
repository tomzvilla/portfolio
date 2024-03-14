import React, { useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    shortname: 'cienciaconecta',
    title: 'CienciaConecta',
    technologies: [{name: 'React'}, {name: 'Redux'}, {name: 'SASS'}, {name: 'NodeJS'}],
    description: 'An application for managing the Science and Technology Fair of the Province of Cordoba. Developed and desgined the project frontend, including role-based authentication and authorization, session and user management.',
    media: 'CienciaConecta.png'
  },
  {
    shortname: 'wordle',
    title: 'Wordle Clone',
    technologies: [{name: 'React'}, {name: 'Redux'}, {name: 'TypeScript'}, {name: 'Tailwind'}],
    description: 'A website that allows you to play the famous game "Wordle" infinetly. Made to learn TypeScript and Tailwind. Full responsive layout with dark/light mode.',
    media: 'Wordle.png'
  }
];

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
        <div ref={ref} class='relative mb-20 group'>
          <h2 className='relative text-4xl text-white tracking-tight font-bold z-20' > Projects </h2>
          <motion.div variants={underlineVariant} initial={'hidden'} animate={control} className='abslute bg-[#4CCD99] py-3 -mt-5 ml-1 group-hover:animate-underlined z-20'></motion.div>
        </div>
        {projects.map((project, index) => <ProjectCard project={project} key={index} />)}
    </section>
  )
}

export default ProjectList