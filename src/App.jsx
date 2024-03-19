import './App.css'
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import { useEffect, useRef } from "react"
// components
import Navbar from './js/components/Navbar'
import SocialLinkBar from './js/components/SocialLinkBar'
import Home from './js/pages/Home'
import Project from './js/pages/Project'
import Footer from './js/components/Footer'
import Backdrop from './js/components/Backdrop'

const App = () => {
  // TODO:
  // - add video playback to projects 
  // - add about me section
  // - make form work
  // - fix cursor when hovering links and buttons
  // - make cool project thumbnails

  const cursorRef = useRef()

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
      window.addEventListener('mousemove', handleMouseMove)

      return () => {
          window.removeEventListener('mousemove', handleMouseMove)
      }
  }, [])
  
  const isMobile = () => {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  return (
    <>
      <div className='font-hack-nerd w-100 h-100 bg-darker'>
        <BrowserRouter>
          {/* <Backdrop /> */}
          {/* Cursor */}
          <div
              ref={cursorRef}
              id='cursor-custom' 
              className={`cursor-custom ${isMobile() ? 'hidden' : 'block'}`}
          />

          <Navbar />
          <SocialLinkBar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/project/:shortname' element={<Project />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
