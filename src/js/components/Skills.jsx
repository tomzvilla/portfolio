import React from 'react'
import Tech from './Tech'
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

const Skills = () => {


  return (
    <div className='grid grid-cols-1 items-center text-white mt-[20rem] ml-[2rem] m-auto lg:mr-auto xl:mr-[10rem]'>
        <h2 className='text-4xl flex flex-wrap items-center self-center justify-center col-span-full tracking-tight font-bold z-10' >My skills </h2>
        <div className='grid grid-cols-2 mt-[8rem]'>
            <div className='text-2xl col-span-1 max-w-[400px] mt-3 flex items-start justify-self-end mr-[5rem] flex-wrap z-10'>
                <p className='text-left font'>
                    Hello, I'm Tomas, FullStack Developer and Software Engineer based in Argentina. 
                    I started this coding journey back in 2019 when I joined my university, UTN - FRC.
                </p>
            </div>
            <div className='col-span-1 z-10'>
                <h3 className='text-2xl mt-2 mb-5'>Technologies</h3>
                <div className='flex flex-wrap justify-center'>
                    <ul className='flex justify-start flex-wrap whitespace-nowrap gap-5'>
                        {technologies.map( (t, index) => <Tech tech={t} key={index} />)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Skills