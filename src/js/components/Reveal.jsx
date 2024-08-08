import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const textVariant = {
    hidden: {opacity: 0, y: 75},
    visible: {opacity: 1, y: 0},
}

const Reveal = ({ children, transitionDuration, delay = 0, identifier }) => {

    const [ref, inView] = useInView({ threshold: 0.4 });
    // const [animationRan, setAnimationRan] = useState(() => {
    //     const storedAnimationRan = localStorage.getItem(`animationRan-${identifier}`);
    //     return storedAnimationRan === 'true';
    // });
    const [animationRan, setAnimationRan] = useState(false);

    const mainControls = useAnimation()

    useEffect(() => {
        if(inView && !animationRan) {
            mainControls.start('visible');
            setAnimationRan(true);
        }

    }, [inView, mainControls, animationRan, identifier]);

    return (
        <div>
            <motion.div
                variants={textVariant}
                ref={ref}
                animate={mainControls}
                initial={'hidden'}
                transition={{ duration: transitionDuration, delay: delay}}
                viewport={{ once: true }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Reveal