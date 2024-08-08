import './App.css'
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import { useEffect, useState, useRef } from "react"
// components
import Navbar from './js/components/Navbar'
import SocialLinkBar from './js/components/SocialLinkBar'
import Home from './js/pages/Home'
import Project from './js/pages/Project'
import About from './js/pages/About'
import Footer from './js/components/Footer'
import Preloader from './js/components/Preloader'
import ScrollToTop from './js/components/ScrollToTop'

const App = () => {
  // TODO:
  // - fix cursor when hovering links and buttons
  // - add support to spanish lang

  const cursorRef = useRef()

  const [mobile, setMobile] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  const handleMouseMove = (e) => {
    const cursor = cursorRef.current;
    // console.log(e.target)
    cursor.style.transform = `translate(${e.clientX - (32/ 2)}px, ${e.clientY - (32/ 2)}px)`;
    // if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
    //   // Si está sobre un enlace o un botón, agrega una clase al cursor
    //   cursor.style.width = `4rem`;
    //   cursor.style.height = `4rem`;
    // } else {
    //     // Si no está sobre un enlace o un botón, elimina la clase del cursor
    //     cursor.style.width = `2rem`;
    //     cursor.style.height = `2rem`;
    // }

  }

  useEffect(()=> {
      checkMobile()
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('resize', checkMobile);

      return () => {
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('resize', checkMobile);
      }
  }, [])
  
  const isMobile = () => {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  const checkMobile = () => {
    if(isMobile()) {
      setMobile(true);
    } else {
      setMobile(window.innerWidth < 768);
    }
  };

  return (
    <>
      <div className='font-hack-nerd w-100 h-100 bg-darker'>
        <BrowserRouter>
          {/* Cursor */}
          <ScrollToTop />
          <Preloader />
          <div
              ref={cursorRef}
              id='cursor-custom' 
              className={`cursor-custom ${mobile ? 'hidden' : 'block'}`}
          />

          <Navbar />
          <SocialLinkBar />
          <Routes>
            <Route path='/' element={<Home firstLoad={firstLoad} setFirstLoad={setFirstLoad}/>}/>
            <Route path='/project/:shortname' element={<Project />}/>
            <Route path='/about' element={<About />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
