import TypingText from './TypingText';
import Reveal from './Reveal';

const Presentation = () => {

  return (
    <section id='home'>
        <div className='absolute mt-[5rem] z-0 w-full h-full overflow-hidden'>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="100 0, 100 60, 0 100, 0 40" fill="#2C323C"/>
          </svg>
        </div>
        <Reveal transitionDuration={0.5}>
          <div className='flex flex-col items-center justify-center mx-auto md:-ml-[2rem] mt-[13rem] lg:-ml-[10rem] w-full'>
            <div className='space-y-8 z-10 text-center md:text-left'>
                <h1 className='text-white text-3xl md:text-5xl'>Hi, I'm Tomas</h1>
                <TypingText />
                <p className='text-white max-w-[450px] md:max-w-[650px] text-lg'>
                    I'm an adventurer, with passion for web development and I'm in a constant search of new challenges.
                    I love learning new stuff everyday.
                    Also, a coffe enjoyer ☕
                </p>
            </div>
            <a href="/#contact" className='z-10 cursor-none'>
              <button className='text-[#222831] font-bold px-10 py-4 bg-[#4CCD99] mt-10 hover:bg-[#6bdfb0] z-10 cursor-none'>Get in touch!</button>
            </a>
          </div>
        </Reveal>
    </section>
  )
}

export default Presentation