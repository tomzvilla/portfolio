import React from 'react'
import Reveal from './Reveal'

const ContactForm = () => {
  return (
    <Reveal>
        <section className="mt-[10rem] relative z-10" id='contact'>
            <div className="py-8 lg:py-16 px-4 mx-auto  max-w-screen-md z-10">
                <h2 className="mb-20 text-2xl sm:text-4xl tracking-tight font-bold text-center text-white z-10">Get in touch with me!</h2>
                {/* <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Feel free to contact me at any time.</p> */}
                <form action="#" className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-300">Your email</label>
                        <input type="email" id="email" className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-[#4CCD99]" placeholder="name@yourcompany.com" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm text-gray-900 dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" className="block p-3 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-[#4CCD99]" placeholder="Let me know how can I help you" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea id="message" rows="6" className="block p-2.5 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-[#4CCD99]" placeholder="Leave a message..."></textarea>
                    </div>
                    <div className='flex items-center justify-center pt-5'>
                        <button type="submit" className="relative px-10 py-4 font-bold text-[#222831] group self-center">
                            <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-3 -translate-y-3 bg-[#4CCD99] ease group-hover:translate-x-0 group-hover:translate-y-0 z-10"></span>
                            <span className="absolute inset-0 w-full h-full ease border-2 border-[#FFF] group-hover:translate-x-0 group-hover:translate-y-0 z-0"></span>
                            <span className="relative z-10 -inset-3 transition-all duration-300 ease group-hover:inset-0">Send message</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </Reveal>
  )
}

export default ContactForm