import Reveal from './Reveal'
import { useRef, useEffect } from 'react'
import FormElement from './FormElement'
import { useForm, Controller } from "react-hook-form"
import emailjs from '@emailjs/browser';

const ContactForm = () => {

    const form = useRef()

    const { control, handleSubmit, reset, formState: { isSubmitSuccessful }, formState: { errors }} = useForm({
        defaultValues: {
            email: '',
            subject: '',
            message: '',
        }
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset()
        }
      }, [isSubmitSuccessful, reset])

    const onSubmit = async (_, e) => {
        e.preventDefault();
        try {
            // await emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_PUBLIC_KEY);
            console.log('SUCCESS')
        } catch (err) {
            console.log(err)
            console.log('ERROR')
        }
        
        
    };

    return (
        <Reveal>
            <section className="mt-[10rem] relative z-10" id='contact'>
                <div className="py-8 lg:py-16 px-4 mx-auto  max-w-screen-md z-10">
                    <h2 className="mb-20 text-2xl sm:text-4xl tracking-tight font-bold text-center text-white z-10">Get in touch with me!</h2>
                    {/* <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Feel free to contact me at any time.</p> */}
                    <form ref={form} className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <Controller 
                            name="email" 
                            control={control} 
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                  }
                            }}
                            render={({ field }) => (
                                <FormElement
                                    name={'email'}
                                    type={'email'}
                                    label={'Email'}
                                    placeholder={'name@yourcompany.com'}
                                    fieldRef={field}
                                    hasError={errors.email}
                                />
                            )}
                        />
                        <Controller 
                            name="subject" 
                            control={control} 
                            rules={{required: true}}
                            render={({ field }) => (
                                <FormElement
                                    name={'subject'}
                                    type={'text'}
                                    label={'Subject'}
                                    placeholder={'Let me know how can I help you'}
                                    fieldRef={field}
                                    hasError={errors.subject}
                                />
                            )}
                        />
                        <Controller 
                            name="message" 
                            control={control} 
                            rules={{required: true}}
                            render={({ field }) => (
                                <FormElement
                                    name={'message'}
                                    type={'textarea'}
                                    label={'Message'}
                                    placeholder={'Leave a message...'}
                                    fieldRef={field}
                                    hasError={errors.message}
                                />
                            )}
                        />
                        <div className='flex items-center justify-center pt-5'>
                            <button type="submit" className="relative px-10 py-4 font-bold text-[#222831] group self-center">
                                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-3 -translate-y-3 bg-primary ease group-hover:translate-x-0 group-hover:translate-y-0 z-10"></span>
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