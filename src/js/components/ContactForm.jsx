import Reveal from './Reveal'
import { useRef, useEffect, useState } from 'react'
import FormElement from './FormElement'
import Spinner from './Spinner'
import { useForm, Controller } from "react-hook-form"
import emailjs from '@emailjs/browser';

const ContactForm = () => {

    const form = useRef();
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        show: false,
        error: false,
        message: ''
    })

    const { control, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            email: '',
            subject: '',
            message: '',
        }
    })

    useEffect(() => {
        if(alert.show) {
            setTimeout(() => {
                setAlert({
                    show: false,
                    error: false,
                    message: ''
                });
            }, 5000)
        }
    }, [alert])

    const onSubmit = async (_, e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_PUBLIC_KEY);
            reset();
            setAlert({
                show: true,
                error: false,
                message: 'Message sent!'
            })

        } catch (err) {
            setAlert({
                show: true,
                error: true,
                message: 'An error ocurred while sending your message, please try again'
            })
        } finally {
            setLoading(false)
        }
 
    };

    return (
        <Reveal identifier={'contact'}>
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
                        <div className='flex flex-col items-center justify-center pt-5'>
                            {loading ?  
                            <Spinner />
                            :
                            <button type="submit" className="relative px-10 py-4 font-bold text-darker group self-center">
                                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-3 -translate-y-3 bg-primary ease group-hover:translate-x-0 group-hover:translate-y-0 z-10"></span>
                                <span className="absolute inset-0 w-full h-full ease border-2 border-white group-hover:translate-x-0 group-hover:translate-y-0 z-0"></span>
                                <span className="relative z-10 -inset-3 transition-all duration-300 ease group-hover:inset-0">Send message</span>
                            </button>
                            }
                            {alert.show && 
                                <div id='alert' className={`mt-10 py-7 px-5 text-lg rounded-md border-2 border-secondary ${alert.error ? 'bg-red-500 text-white' : 'bg-primary text-darker'}`}>
                                    {alert.message}
                                </div>
                            }
                        </div> 
                    </form>
                </div>
            </section>
        </Reveal>
    )
}

export default ContactForm