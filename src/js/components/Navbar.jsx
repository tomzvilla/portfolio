import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <header className='flex flex-col justify-center items-center md:space-x-20 md:place-content-around pt-[3rem] md:pt-[5rem] text-white md:flex-row'>
        <NavLink to={'/'}>
            <p className={'lg:text-2xl hover:text-[#4CCD99]'}>Tomas Villarreal</p>
        </NavLink>
        <nav className='flex lg:text-2xl gap-20'>
            <NavLink to={'/about'} className={'hover:text-[#4CCD99]'}>
                <p>about</p>
            </NavLink>
            <NavLink to={'#/projects'} className={'hover:text-[#4CCD99]'}>
                <p>projects</p>
            </NavLink>
            <NavLink to={'#/contact'} className={'hover:text-[#4CCD99]'}>
                <p>contact</p>
            </NavLink>
        </nav>
    </header>
  )
}

export default Navbar