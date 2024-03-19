import React from 'react'

const FormElement = ({ type, label, placeholder, fieldRef, hasError, name}) => {
  return (
    <div>
        <label htmlFor={name} className="block mb-2 text-sm text-gray-300">{label}</label>
        {
            type === 'textarea' ?
            (<textarea
                rows="6" 
                type={type} 
                id={name} 
                placeholder={placeholder}
                {...fieldRef}
                className="block p-2.5 w-full text-sm rounded-lg bg-secondary border-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-primary"
            />)
            :
            (<input 
                type={type} 
                id={name} 
                placeholder={placeholder}
                {...fieldRef}
                className="text-sm rounded-lg block w-full p-2.5 bg-secondary border-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-primary"
            />)
        }
        {hasError && <small className='text-red-500 text-sm'>{`${hasError?.message}`}</small>}
    </div>
  )
}

export default FormElement