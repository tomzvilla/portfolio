import React, { useEffect } from 'react'
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

const underlineVariant = {
    visible: { width: '100%', transition: { duration: 0.5 } },
    hidden: { width: '0%' }
};

const Skills = () => {

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
    // <div className='grid grid-cols-1 items-center text-white mt-[20rem] ml-[2rem] m-auto lg:mr-auto xl:mr-[10rem]'>
    //     <h2 className='text-4xl flex flex-wrap items-center self-center justify-center col-span-full tracking-tight font-bold z-10' >My skills </h2>
    //     <div className='grid grid-cols-2 mt-[8rem]'>
    //         <div className='text-2xl col-span-1 max-w-[400px] mt-3 flex items-start justify-self-end mr-[5rem] flex-wrap z-10'>
    //             <p className='text-left font'>
    //                 Hello, I'm Tomas, FullStack Developer and Software Engineer based in Argentina. 
    //                 I started this coding journey back in 2019 when I joined my university, UTN - FRC.
    //             </p>
    //         </div>
    //         <div className='col-span-1 z-10'>
    //             <h3 className='text-2xl mt-2 mb-5'>Technologies</h3>
    //             <div className='flex flex-wrap justify-center'>
    //                 <ul className='flex justify-start flex-wrap whitespace-nowrap gap-5'>
    //                     {technologies.map( (t, index) => <Tech tech={t} key={index} />)}
    //                 </ul>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <section className='relative z-10 text-white flex flex-col items-center justify-center mx-auto max-w-[800px] lg:max-w-[1000px] mt-[20rem]'>
        <div ref={ref} className='mb-20 group'>
            <h2 className='text-4xl font-bold'>My skills</h2>
            <motion.div variants={underlineVariant} initial={'hidden'} animate={control} className='abslute bg-[#4CCD99] py-3 z-0 -mt-5 ml-1 group-hover:animate-underlined'></motion.div>
        </div>
        {/* bio content */}
        <div className='flex flex-col max-w-[360px] md:max-w-[1500px] items-center md:flex-row md:items-start justify-center m-auto'>
            <div className='max-w-[360px] text-lg sm:text-xl ml-0 lg:max-w-[400px] md:mr-10 md:ml-10'>
                <p>
                    Hello, I'm Tomas, FullStack Developer and Software Engineer based in Argentina. 
                    I started this coding journey back in 2019 when I joined my university, UTN - FRC.
                </p>
            </div>
            <div className='flex flex-col mt-20 md:mt-0'>
                {/* <h3 className='text-xl mb-1'>Technologies</h3> */}
                <div className=''>
                    <ul className='flex flex-row flex-wrap gap-5'>
                         {technologies.map( (t, index) => <Tech tech={t} key={index} />)}
                    </ul>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Skills