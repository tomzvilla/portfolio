import './App.css'
import { Route, BrowserRouter, Routes} from 'react-router-dom'
// components
import Navbar from './js/components/Navbar'
import SocialLinkBar from './js/components/SocialLinkBar'
import Home from './js/pages/Home'
import Footer from './js/components/Footer'
function App() {
  // style={{background: 'linear-gradient(160deg, #222831, #222831 50%, #2C323C 50%, #2C323C)'}}
  // TODO:
  // - fix background
  // - refactor my skills component
  // - make Home responsive
  // - add video playback to projects
  // - add projects
  // - add project page
  // - add about project
  // - add more animations
  // - make form work
  // - fix typewriter animation || maybe changing the word onAnimationEnd
  return (
    <>
      <div className='font-hack-nerd w-100 h-100 bg-[#222831]'>
        <BrowserRouter>
          <Navbar />
          <SocialLinkBar />
          <Routes>
            <Route path='/' element={<Home />}/>
            {/* <Route path='/about' element={<About />}/> */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
