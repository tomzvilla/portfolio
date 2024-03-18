import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const topVariant = {
    visible: {
        y: 0,
        opacity: 1
    },
    hidden: {
        y: '-100%',
        display: 'none',
        opacity: 0
    }
}

const bottomVariant = {
    visible: {
        y: 0,
        opacity: 1
    },
    hidden: {
        y: '100%',
        display: 'none',
        opacity: 0
    }
}

const Backdrop = () => {

    
    const [ref, inView] = useInView();
    const [animationRan, setAnimationRan] = useState(false)

    const mainControls = useAnimation()

    return (
        <>
            {/* <motion.div ref={ref} variants={topVariant} initial={'visible'} animate={'hidden'} transition={{delay: 0.5}} className='h-full w-full absolute z-40 bg-[#2C323C] transition-all ease duration-200'></motion.div> */}
            <motion.div ref={ref} variants={topVariant} initial={'visible'} animate={'hidden'} transition={{delay: 30.5}} className='absolute -mt-[5rem] z-40 w-full h-screen '>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full">
                    <polygon points="100 1, 100 30, 0 60, 0 0" fill="#2C323C"/>
                </svg>
            </motion.div>
            <motion.div ref={ref} variants={topVariant} initial={'visible'} animate={'hidden'} transition={{delay: 30.5}} className='absolute mt-[11.5rem] -ml-2 z-50 w-full h-full overflow-clip'>
                <svg style={{transform: 'rotate(5deg)'}} viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full">
                    <polygon points="99 1, 100 0, -10 49, 0 45" fill="rgb(76 205 153)"/>
                </svg>
            </motion.div>
            <motion.div ref={ref} variants={bottomVariant} initial={'visible'} animate={'hidden'} transition={{delay: 30.5}} className='absolute mt-[12rem] z-40 w-full h-full overflow-hidden'>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full'">
                    <polygon points="100 6, 100 60, 0 100, 0 40" fill="#222831"/>
                </svg>
            </motion.div>
        </>
    )
}

export default Backdrop