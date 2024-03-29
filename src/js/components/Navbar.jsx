import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink} from 'react-router-hash-link';
const Navbar = () => {
  return (
    <header id='start' className='flex flex-col justify-center items-center md:space-x-18 lg:space-x-20 md:place-content-around pt-[3rem] md:pt-[5rem] text-white md:flex-row'>
        <NavLink to={'/'}>
            <p className={'lg:text-2xl hover:text-primary'}>Tomas Villarreal</p>
        </NavLink>
        <nav className='flex lg:text-2xl gap-20'>
            <NavLink to={'/about'} className={'hover:text-primary'}>
                <p>about</p>
            </NavLink>
            <HashLink to={'/#projects'} className={'hover:text-primary'}>
                <p>projects</p>
            </HashLink>
            <HashLink to={'/#contact'} className={'hover:text-primary'}>
                <p>contact</p>
            </HashLink>
        </nav>
    </header>
  )
}

export default Navbar