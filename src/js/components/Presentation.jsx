import TypingText from './TypingText';
import Reveal from './Reveal';
import { useEffect, useState } from 'react';
const Presentation = (props) => {

  const [duration, setDuration] = useState(7);

  useEffect(() => {
    if (props.firstLoad) {
      setDuration(7);
      setTimeout(() => props.setFirstLoad(false), 5000);
    } else {
      setDuration(1);
    }
  }, []);

  return (
    <section id='home'>
        <div className='absolute mt-[5rem] z-0 w-full h-full overflow-hidden'>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="100 0, 100 60, 0 100, 0 40" fill="#1d1d1d"/>
          </svg>
        </div>
        <Reveal transitionDuration={0.5} delay={duration} identifier={'presentation'}>
          <div className='flex flex-col items-center justify-center mx-auto md:-ml-[2rem] mt-[13rem] lg:-ml-[10rem] w-full'>
            <div className='space-y-8 z-10 text-center md:text-left'>
                <h1 className='text-white text-3xl md:text-5xl font-bold'>Hi, I'm Tomas</h1>
                <TypingText />
                <p className='text-white max-w-[450px] md:max-w-[650px] text-lg'>
                    I'm an adventurer, with passion for web development and I'm in a constant search of new challenges.
                    I love learning new stuff everyday.
                    Also, a coffee enjoyer ☕
                </p>
            </div>
            <a href="/#contact" className='z-10 cursor-none'>
              <button className='text-darker font-bold px-10 py-4 bg-primary mt-10 hover:bg-[#53ffba] z-10 cursor-none'>Get in touch!</button>
            </a>
          </div>
        </Reveal>
    </section>
  )
}

export default Presentation