import React from 'react'

const ContactForm = () => {
  return (
    <section class="mt-[10rem] relative z-10" id='contact'>
        <div class="py-8 lg:py-16 px-4 mx-auto  max-w-screen-md z-10">
            <h2 class="mb-20 text-2xl sm:text-4xl tracking-tight font-bold text-center text-white z-10">Get in touch with me!</h2>
            {/* <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Feel free to contact me at any time.</p> */}
            <form action="#" class="space-y-8">
                <div>
                    <label for="email" class="block mb-2 text-sm text-gray-300">Your email</label>
                    <input type="email" id="email" class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-[#4CCD99]" placeholder="name@yourcompany.com" required />
                </div>
                <div>
                    <label for="subject" class="block mb-2 text-sm text-gray-900 dark:text-gray-300">Subject</label>
                    <input type="text" id="subject" class="block p-3 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-[#4CCD99]" placeholder="Let me know how can I help you" required />
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block mb-2 text-sm text-gray-900 dark:text-gray-400">Your message</label>
                    <textarea id="message" rows="6" class="block p-2.5 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-[#4CCD99]" placeholder="Leave a message..."></textarea>
                </div>
                <div className='flex items-center justify-center pt-5'>
                    <button type="submit" class="relative px-10 py-4 font-bold text-[#222831] group self-center">
                        <span class="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-3 -translate-y-3 bg-[#4CCD99] ease group-hover:translate-x-0 group-hover:translate-y-0 z-10"></span>
                        <span class="absolute inset-0 w-full h-full ease border-2 border-[#FFF] group-hover:translate-x-0 group-hover:translate-y-0 z-0"></span>
                        <span class="relative z-10 -inset-3 transition-all duration-300 ease group-hover:inset-0">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default ContactForm