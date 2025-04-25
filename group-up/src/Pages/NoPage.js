import '../App.css';

const NoPage = () =>  {
    return (
        <>
            <h1 className='body-content switch-text-color'>
                No Page Found
            </h1>
            <p className='body-content switch-text-color'>
                The requested page either doesn't exist or there was a problem reaching the server.
            </p>
        </>
    );
}

export default NoPage