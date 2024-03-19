import React from 'react'

const Tech = (props) => {
  return (
    <li className='text-secondary text-center font-bold bg-primary px-3 py-[0.3rem]'>
        {props.tech.name}
    </li>
  )
}

export default Tech