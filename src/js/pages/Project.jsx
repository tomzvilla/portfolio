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
                <img className='max-h-[500px] object-contain mt-20 rounded-lg' src={getImageUrl(currentProject.media)} alt="" />
                <h1 className='text-4xl font-bold'> {currentProject.title} </h1>
                <div>
                    <ul className='flex space-x-4 flex-wrap [&>div]:mb-5 items-center justify-center'>
                        {currentProject.technologies.map((t, index) => 
                        <div key={index}>
                            <Tech tech={t}/>
                        </div>
                        )}
                    </ul>
                </div>
                <div className='max-w-[1000px]'>
                    <h2 className='text-2xl font-bold text-center mb-10'>About this project</h2>
                    <p className='text-lg'>
                        {currentProject.longDescription}
                    </p>
                </div>
                <img className='max-h-[500px] object-contain mt-20 rounded-lg' src={getImageUrl(currentProject.media)} alt="" />
                <img className='max-h-[500px] object-contain mt-20 rounded-lg' src={getImageUrl(currentProject.media)} alt="" />
            </div>
        </section>
  )
}

export default Project