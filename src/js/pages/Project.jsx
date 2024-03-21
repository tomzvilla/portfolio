import { useParams } from 'react-router-dom'
import { projects } from '../../utils/projects';
import { getImageUrl } from '../../utils/image-util';
import Tech from '../components/Tech';
const Project = () => {

    const { shortname } = useParams();

    const currentProject = projects.find(p => p.shortname === shortname);
    return (
        <section className='h-full w-full mx-auto mb-[5rem]'>
            <div className='flex flex-col items-center justify-center text-white space-y-10'>
                <img className='max-h-[500px] object-contain mt-20 rounded-lg z-10' src={getImageUrl(currentProject.thumbnail)} alt="" />
                <div style={{marginTop: '-30rem'}} className='absolute z-0 w-full h-full overflow-hidden'>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <polygon points="100 30, 100 100, 0 70, 0 0" fill="#1d1d1d"/>
                    </svg>
                </div>
                <h1 className='text-4xl font-bold z-10 text-center'> {currentProject.title} </h1>
                <div>
                    <ul className='flex space-x-4 flex-wrap [&>div]:mb-5 items-center justify-center z-10 relative'>
                        {currentProject.technologies.map((t, index) => 
                        <div key={index}>
                            <Tech tech={t}/>
                        </div>
                        )}
                    </ul>
                </div>
                <div className='max-w-[70%] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] z-10'>
                    <h2 className='text-2xl font-bold text-center mb-10'>About this project</h2>
                    <p className='text-md sm:text-lg'>
                        {currentProject.longDescription}
                    </p>
                </div>
                {
                    currentProject.media.map( img =>
                        <img key={img} className='z-10 max-h-[350px] md:max-h-[500px] object-contain mt-20 rounded-lg' src={getImageUrl(img)} alt={`${currentProject.title} image`} />
                    )
                }
                
            </div>
        </section>
  )
}

export default Project