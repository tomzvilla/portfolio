import React from 'react'

const ReadMore = () => {
  return (
    <>
        {/* <div className='absolute mt-[7rem] z-0 w-full h-full' style={{clipPath: 'polygon(100% 40%, 100% 100%, 0 60%, 0 0)', backgroundColor: '#2C323C', padding: '40rem'}}></div> */}
        <div className='absolute mt-[5rem] z-0 w-full h-full overflow-hidden'>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="100 0, 100 60, 0 100, 0 40" fill="#2C323C"/>
          </svg>
        </div>
        <div className='text-white text-2xl flex flex-col items-center mt-[5rem] font-bold z-10'>
          <h3><a className='text-[#4CCD99] hover:border-b hover:border-[#4CCD99]' href="http://" target="_blank">Have a look at my CV</a></h3>
          <h4 className='mt-5'>Read more about me <a href="" className='text-[#4CCD99] hover:border-b hover:border-[#4CCD99]'>here!</a></h4>
        </div>
    </>
  )
}

export default ReadMore