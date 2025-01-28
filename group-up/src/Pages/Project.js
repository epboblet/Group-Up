import { useParams } from 'react-router';
import '../App.css';

const Project = () =>  {
    const { id } = useParams()
    return (
        <>
            <h1 className='body-content'>
                Project {id}
            </h1>
        </>
    );
}

export default Project