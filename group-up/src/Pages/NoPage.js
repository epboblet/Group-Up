import '../App.css';

const NoPage = () =>  {
    return (
        <>
            <h1 className='body-content'>
                No Page Found
            </h1>
            <p>
                The requested page either doesn't exist or there was a problem reaching the server.
            </p>
        </>
    );
}

export default NoPage