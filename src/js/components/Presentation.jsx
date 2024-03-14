import React from 'react'
import { useEffect, useState } from 'react'

const words = ['Software Engineer', 'FullStack Developer', 'Web Developer']

const Presentation = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
            i++;
            if(i > words.length) {
                return
            }
        }, 4420); 
          return () => {
            clearInterval(interval);
            i = 0;
            };
    }, [words])

  return (
    <>
        {/* <div className='absolute mt-[5rem] z-0 w-full h-full overflow-clip' style={{clipPath: 'polygon(100% 0, 100% 60%, 0 100%, 0 40%)', backgroundColor: '#2C323C'}}></div> */}
        <div className='absolute mt-[5rem] z-0 w-full h-full overflow-hidden'>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="100 0, 100 60, 0 100, 0 40" fill="#2C323C"/>
          </svg>
        </div>
        <div className='flex flex-col items-center justify-center mt-[13rem] ml-[-10rem] w-full '>
          <div className='space-y-8 z-10'>
              <h1 className='text-white text-5xl'>Hi, I'm Tomas</h1>
              <h2 className='text-[#4CCD99] text-5xl h-[55px] w-[] animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white'>A {words[currentIndex]}</h2>
              <p className='text-white max-w-[650px]'>
                  I'm an adventurer, with passion for web development and I'm in a constant search of new challenges.
                  I love learning new stuff everyday.
                  Also, a coffe enjoyer ☕
              </p>
          </div>
          <button className='text-[#222831] font-bold px-10 py-4 bg-[#4CCD99] mt-10 hover:bg-[#6bdfb0] z-10'>Get in touch!</button>
        </div>
    </>
  )
}

export default Presentation