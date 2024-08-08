import React from 'react'
import Presentation from '../components/Presentation'
import Skills from '../components/Skills'
import ReadMore from '../components/ReadMore'
import ProjectList from '../components/ProjectList'
import ContactForm from '../components/ContactForm'

const Home = (props) => {
  return (
    <>
        <Presentation firstLoad={props.firstLoad} setFirstLoad={props.setFirstLoad} />
        <Skills/>
        <ReadMore />
        <ProjectList />
        <ContactForm />
    </>
  )
}

export default Home