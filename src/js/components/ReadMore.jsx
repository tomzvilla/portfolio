import Reveal from "./Reveal"
import { HashLink as Link } from "react-router-hash-link"
const ReadMore = () => {
  return (
    <>
        <div className='absolute mt-[3rem] z-0 w-full h-full overflow-hidden '>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full z-0">
            <polygon points="100 40, 100 100, 0 60, 0 0" fill="#1d1d1d"/>
          </svg>
        </div>
        <Reveal>
          <div className='text-white text-lg sm:text-2xl flex flex-col items-center mt-[5rem] font-bold relative z-10'>
            <h3><a className='text-primary hover:border-b hover:border-primary z-10' href="https://www.dropbox.com/scl/fi/p5uoj7ulkeqyk68dn1x34/Villarreal-Tomas-CV-English.pdf?rlkey=i6ed6gewcam55c9okhrft7b43&dl=0" target="_blank">Have a look at my resume</a></h3>
            <h4 className='mt-5'>Read more about me <Link to={'/about#about'} className='text-primary hover:border-b hover:border-primary'>here!</Link></h4>
          </div>
        </Reveal>
    </>
  )
}

export default ReadMore