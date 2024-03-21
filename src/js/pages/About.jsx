import programmer from '../../assets/img/programmer.svg'
import gamer from '../../assets/img/gamer.svg'
const About = () => {
  return (
    <div id='about' className='flex flex-col items-center lg:flex-row lg:items-start justify-center my-[5rem] lg:my-[10rem] pt-32 lg:pt-56 bg-secondary -skew-y-12'>
        <div  className='max-w-[70%] sm:max-w-[50%] lg:max-w-[40%] z-10 skew-y-12 lg:mt-20 xl:-mt-10 flex'>
            <img className='w-full h-full self-center' src={programmer} alt="programmer"/>
        </div>
        <div className='max-w-[80%] md:max-w-[50%] text-md text-white z-10 skew-y-12 mb-40 space-y-10 leading-relaxed'>
            <h1 className='text-4xl'>About me</h1>
            <p>
                My name is Tomas Villarreal, from Cordoba, Argentina. Since I was a child I was always interested in technology and computers.
                The first approach I had to them was as a gamer, dedicating countless hours to video games of all genres, from MMOs to shooters, RPGS, Platformers, MOBAs and many others.
            </p>
            <p>
                At the age of 17 I became interested in another part of technology, starting in the great adventure of programming, learning web development and video games.
                A great interest in this world led me to study software engineering in 2019, entering the National Technological University Regional Córdoba, 
                there I was formed professionally and met countless friends, whom I found as teammates and today are my colleagues engineers.
            </p>
            <p>
                In the last year of my career I had a significant advancement both personally and professionally, starting to work as a DevOps and part-time full stack programmer. At the same time, I was in the last year of my professional career and I was developing my final degree project. During that year I acquired countless knowledge, which trained and educated me in the best practices of software development, and instilled in me the idea of making secure, scalable and maintainable software. 
                I am a very proactive person, with a great passion for learning and challenges, constantly seeking to improve as a professional and as a person.
            </p>
        </div>
    </div>
  )
}

export default About