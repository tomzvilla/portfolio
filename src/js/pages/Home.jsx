import React from 'react'
import Presentation from '../components/Presentation'
import Skills from '../components/Skills'
import ReadMore from '../components/ReadMore'
import ProjectList from '../components/ProjectList'
import ContactForm from '../components/ContactForm'

const Home = () => {
  return (
    <>
        <Presentation />
        <Skills/>
        <ReadMore />
        <ProjectList />
        <ContactForm />
    </>
  )
}

export default Home