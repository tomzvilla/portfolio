import React from 'react'

const Tech = (props) => {
  return (
    <li className='text-[#222831] text-center font-bold bg-[#4CCD99] px-3 py-[0.3rem]'>
        {props.tech.name}
    </li>
  )
}

export default Tech