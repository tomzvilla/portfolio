import React, { useEffect, useState } from 'react'
import Tech from './Tech'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const technologies = [
    {name: 'JavasScript', type: 'Programming Language'},
    {name: 'Python', type: 'Programming Language'},
    {name: 'C#', type: 'Programming Language'},
    {name: 'Java', type: 'Programming Language'},
    {name: 'TypeScript', type: 'Programming Language'},
    {name: 'React', type: 'Frontend'},
    {name: 'Redux', type: 'Frontend'},
    {name: 'Vue', type: 'Frontend'},
    {name: 'Git', type: 'Version Control'},
    {name: 'Docker', type: 'DevOps'},
    {name: 'NodeJS', type: 'Backend'},
    {name: 'MongoDB', type: 'Database'},
    {name: 'SQL', type: 'Database'},
    {name: 'Tailwind', type: 'Frontend'},
    {name: 'Bootstrap', type: 'Frontend'},
    {name: 'CSS', type: 'Frontend'},
    {name: 'HTML', type: 'Frontend'},

]

const textVariant = {
    hidden: {x: -50, opacity: 0},
    visible: {x: [0, 20, -20, 0], opacity: 1},
}

const badgeVariant = {
    hidden: {y: 40},
    visible: {y: [-20, 10, -5, 0]},
}

const underlineVariant = {
    visible: { width: '100%', transition: { duration: 0.5 } },
    hidden: { width: '0%' }
};

const Skills = () => {

    const control = useAnimation();
    const mainControls = useAnimation();
    const [ref, inView] = useInView()
    const [refText, inViewText] = useInView({ threshold: 0.6 })
    // const [animationRan, setAnimationRan] = useState(() => {
    //     const storedAnimationRan = localStorage.getItem(`animationRan-skills`);
    //     return storedAnimationRan === 'true';
    // });
    const [animationRan, setAnimationRan] = useState(false);

    useEffect(() => {
        if (inView) {
            control.start("visible");
        } else if(!inView) {
            control.start("hidden");
        }
        if(inViewText && !animationRan) {
            mainControls.start('visible');
            setAnimationRan(true);
        }
    }, [control, inView, mainControls, inViewText, animationRan]);


  return (
    <section id='about' className='relative z-10 text-white flex flex-col items-center justify-center mx-auto max-w-[800px] lg:max-w-[1000px] mt-[20rem]'>
        <div ref={ref} className='mb-20 group'>
            <h2 className='text-4xl font-bold tracking-tight'>My skills</h2>
            <motion.div variants={underlineVariant} initial={'hidden'} animate={control} className='abslute bg-primary py-3 z-0 -mt-5 ml-1 group-hover:animate-underlined'></motion.div>
        </div>
        {/* bio content */}
        <div ref={refText} className='flex flex-col max-w-[360px] md:max-w-[1500px] items-center md:flex-row md:items-start justify-center m-auto'>
            <motion.div 
                className='max-w-[360px] text-lg text-center sm:text-left sm:text-xl ml-0 lg:max-w-[400px] md:mr-10 md:ml-10'
                variants={textVariant} 
                initial='hidden'
                animate={mainControls}
                transition={{ duration: 0.7 }}
            >
                <p>
                    Hello, I'm Tomas, FullStack Developer and Software Engineer based in Argentina. 
                    I started this coding journey back in 2019 when I joined my university, UTN - FRC.
                </p>
            </motion.div>
            <motion.div 
                className='flex flex-col mt-20 md:mt-0'
                variants={badgeVariant} 
                initial='hidden'
                animate={mainControls}
                transition={{ duration: 0.7 }}
            >
                <div className=''>
                    <ul className='flex flex-row flex-wrap gap-5 items-center justify-center sm:items-start sm:justify-start'>
                         {technologies.map( (t, index) => <Tech tech={t} key={index} />)}
                    </ul>
                </div>
            </motion.div>
        </div>
    </section>
  )
}

export default Skills